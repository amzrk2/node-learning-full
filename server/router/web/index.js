const express = require('express');
const router = express.Router();

// 另一种导入模型的方法
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Category = mongoose.model('Category');

module.exports = (app) => {


  app.use('/web/api', router);
};
