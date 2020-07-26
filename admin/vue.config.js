const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public/admin'),
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
};
