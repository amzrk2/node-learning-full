// 另一种导入模型的方法
const mongoose = require('mongoose');
const Hero = mongoose.model('Hero');

module.exports = async function articleApi(req, res) {
  const hero = await Hero.findById(req.params.id)
    .populate('categories')
    .populate('itemsAdv')
    .populate('itemsDis')
    .lean();
  // 后处理英雄分类
  if (hero.categories.length > 1) {
    let temp = [];
    hero.categories.forEach((cat) => {
      temp.push(cat.name);
    });
    hero.categories = temp.join('/');
  } else {
    hero.categories = hero.categories[0].name;
  }
  res.send(hero);
};
