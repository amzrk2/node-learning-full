const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String },
  // 类型为ID，关联Category模型
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('Article', schema);
