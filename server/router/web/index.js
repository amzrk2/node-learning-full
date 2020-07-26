const express = require('express');
const router = express.Router();

const newsListApi = require('./news-list-api.js');

module.exports = (app) => {
  // 新闻获取接口
  router.get('/news/list', newsListApi);

  app.use('/web/api', router);
};
