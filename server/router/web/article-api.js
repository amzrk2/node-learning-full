// 另一种导入模型的方法
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = async function articleApi(req, res) {
  const article = await Article.findById(req.params.id);
  res.send(article);
};
