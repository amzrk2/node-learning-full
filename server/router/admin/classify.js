// 小写复数形式转为单数大写类名形式
const parseModelName = require('inflection').classify;

// 获取类名转换中间件
module.exports = async function modelNameMiddleware(req, res, next) {
  const modelName = parseModelName(req.params.resource);
  // 挂载 require 的 model 使其能在下一步中以 req.Model 直接使用
  req.Model = require(`../../model/${modelName}`);
  await next();
};
