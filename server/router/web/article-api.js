// 另一种导入模型的方法
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = async function articleApi(req, res) {
  const article = await Article.findById(req.params.id).lean();
  article.related = await Article.find()
    .where({
      category: { $in: article.category },
    })
    .limit(2)
    .lean();
  res.send(article);
};
