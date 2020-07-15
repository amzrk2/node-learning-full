const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 类型为ID，关联这个模型本身
});

module.exports = mongoose.model('Category', schema);
