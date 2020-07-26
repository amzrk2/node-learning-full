const express = require('express');
const router = express.Router();

// 另一种导入模型的方法
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Category = mongoose.model('Category');

module.exports = (app) => {
  // 新闻获取接口
  router.get('/news/list', async (req, res) => {
    // 1 获取父级分类
    const parentCategory = await Category.findOne({
      name: '主-新闻资讯',
    });
    // 结果：{"_id":"5f094f5f43aa005c92b949bb", "name":"新闻资讯", "__v":0}

    // 2 聚合查询四个子分类
    // 聚合查询接受聚合管道参数，每个对象都是一步操作
    const categories = await Category.aggregate([
      // 2.1 查找 parent 等于新闻资讯 (parentCategory._id) 的
      { $match: { parent: parentCategory._id } },
      // 结果：
      // [{"_id":"5f0e6c0290344331a8d9a83d", "name":"新闻", "parent":"5f094f5f43aa005c92b949bb", "__v":0},
      //  {"_id":"5f0e6d4c80a77b3b78860451", "name":"公告", "parent":"5f094f5f43aa005c92b949bb", "__v":0},
      //  {"_id":"5f1bbf353c43582e38603520", "name":"活动", "parent":"5f094f5f43aa005c92b949bb", "__v":0},
      //  {"_id":"5f1bbf3b3c43582e38603521", "name":"赛事", "parent":"5f094f5f43aa005c92b949bb", "__v":0}]

      // 2.2 在上一步基础上查找，查找条件为
      // 查找的地点：从 articles 集合内找 (找文章)
      // 匹配的字段：这边的 _id 对应那边 articles 集合内文章的 category (即在所有文章里找 ID 匹配 83d,451,520,521 的)
      // 存放的数组：放在 newsList 数组内
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'category',
          as: 'newsList',
        },
      },
      // 结果：这一步查询完成之后，在上一步的结果基础上每一项增加了一个 newsList 数组，存放着对应子分类的文章

      // 2.3 在上一步基础上添加字段
      // 这里其实是从上一步已经有的 newsList 数组内取出四个，在添加回去覆盖为新的 newsList 数组
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 4] },
        },
      },
      // 结果：这一步查询完成之后，在上一步的结果基础上每一项的 newsList 数组只有四个数据了
    ]);

    // 3 添加热门子分类
    // 获取那四个子分类，直接从上一步的结果处理获取即可，对每一项只保留 _id
    const subCats = categories.map((v) => {
      return v._id;
    });
    // 在所有文章中查找 category 属于这四个子分类的文章，任意四篇
    categories.unshift({
      name: '热门',
      newsList: await Article.find()
        .where({
          category: { $in: subCats },
        })
        .populate('category') // 关联查询 category 方便下文第四步
        .limit(50) // 先找出最多50篇
        .lean(), // 这里如果不加 lean() 后文的 forEach() 将无法应用在热门分类的 newsList 数组
    });
    // 随机任取四篇
    categories[0].newsList.sort((a, b) => {
      return Math.random() - 0.5;
    });
    categories[0].newsList.length = 4;

    // // 4 明文标明每篇文章的所属分类，而不是 _id
    // categories.forEach((category) => {
    //   category.newsList.forEach((article) => {
    //     article.tag = 'a';
    //   });
    // });
    // 这里直接偷懒让前端获取上一步关联查询出的 category 了 (对于热门分类)
    // 普通分类这里一对一，全部显示一个分类就行
    res.send(categories);
  });

  app.use('/web/api', router);
};
