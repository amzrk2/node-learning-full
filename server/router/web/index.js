const express = require('express');
const router = express.Router();

const newsListApi = require('./news-list-api.js');
const heroesListApi = require('./heroes-list-api.js');

module.exports = (app) => {
  // 新闻获取接口
  router.get('/news/list', newsListApi);
  // 英雄列表获取接口
  router.get('/heroes/list', heroesListApi);

  app.use('/web/api', router);
};
