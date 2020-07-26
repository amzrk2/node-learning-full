const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public/web'),
  publicPath: '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/scss/variables.scss";`,
      },
    },
  },
};
