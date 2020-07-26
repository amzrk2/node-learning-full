// 另一种导入模型的方法
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Hero = mongoose.model('Hero');

module.exports = async function heroesListApi(req, res) {
  // 1 获取父级分类
  const parentCategory = await Category.findOne({
    name: '主-英雄',
  });
  // 结果：{"_id":"5f0e6d6b80a77b3b78860452", "name":"主-英雄", "__v":0}

  // 2 聚合查询六个子分类
  // 聚合查询接受聚合管道参数，每个对象都是一步操作
  const herosCats = await Category.aggregate([
    // 2.1 查找 parent 等于主-英雄 (parentCategory._id) 的
    { $match: { parent: parentCategory._id } },
    // 结果：
    // [{"_id":"5f0e6d7d80a77b3b78860453","parent":"5f0e6d6b80a77b3b78860452","name":"战士","__v":0},
    //  {"_id":"5f0e6e99524ae228f80b5b2d","parent":"5f0e6d6b80a77b3b78860452","name":"法师","__v":0},
    //  {"_id":"5f114b21596c287e592981f3","parent":"5f0e6d6b80a77b3b78860452","name":"射手","__v":0}...

    // 2.2 在上一步基础上查找，查找条件为
    // 查找的地点：从 heros 集合内找 (找英雄)
    // 匹配的字段：这边的 _id 包含在那边 heros 集合内英雄的 categories 数组内的
    // 存放的数组：放在 herosList 数组内
    {
      $lookup: {
        from: 'heros',
        localField: '_id',
        foreignField: 'categories',
        as: 'herosList',
      },
    },
    // 结果：这一步查询完成之后，在上一步的结果基础上每一项增加了一个 heroesList 数组，存放着对应子分类的所有英雄
  ]);

  // 3 添加热门英雄分类 (模拟)
  // 所有英雄
  const hotHeros = await Hero.find({});
  // 随机任取十个
  hotHeros.sort((a, b) => {
    return Math.random() - 0.5;
  });
  hotHeros.length = 10;
  // 添加到结果
  herosCats.unshift({
    name: '热门',
    herosList: hotHeros,
  });

  res.send(herosCats);
};
