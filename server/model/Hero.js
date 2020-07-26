const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  // 类型为ID，关联Category模型，使用数组可以关联多个分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 数据评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    },
  ],
  // 两组装备,类型为ID，关联Item模型，使用数组可以关联多个装备
  itemsAdv: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  itemsDis: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model('Hero', schema);
