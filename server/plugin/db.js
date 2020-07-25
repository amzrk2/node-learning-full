const mongoose = require('mongoose');
const path = require('path');
// 导入所有 model 规避递归查询时的无模型问题
require('require-all')(path.resolve(__dirname, '../model'));

module.exports = (app) => {
  mongoose.connect('mongodb://127.0.0.1:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
