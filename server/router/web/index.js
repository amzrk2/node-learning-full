const express = require('express');
const router = express.Router();

const newsListApi = require('./news-list-api.js');
const heroesListApi = require('./heroes-list-api.js');
const articleApi = require('./article-api.js');

module.exports = (app) => {
  // 新闻获取接口
  router.get('/news/list', newsListApi);
  // 英雄列表获取接口
  router.get('/heroes/list', heroesListApi);
  // 文章详情接口
  router.get('/article/:id', articleApi);

  app.use('/web/api', router);
};
