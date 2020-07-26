// 另一种导入模型的方法
const mongoose = require('mongoose');
const Hero = mongoose.model('Hero');

module.exports = async function articleApi(req, res) {
  const hero = await Hero.findById(req.params.id);
  res.send(hero);
};
