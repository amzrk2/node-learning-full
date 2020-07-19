// 登录校验中间件
const jwt = require('jsonwebtoken');
const assert = require('http-assert');
const { publicKey } = require('../../keys');

/**
 * options:
 *   modelName: 验证用的模型
 */
module.exports = (options) => {
  if (options.modelName) {
    const Model = require(`../../model/${options.modelName}`);

    return async function validatorMiddleware(req, res, next) {
      assert(req.cookies.token, 401, '未登陆账户'); /* Unauthorized */
      let tokenData; // 解密 token
      try {
        tokenData = jwt.verify(req.cookies.token, publicKey, { algorithms: ['RS256'] });
      } catch (e) {
        tokenData = null;
      }
      assert(tokenData && tokenData._id, 401, '服务器无法解析登录信息'); /* Bad Request */
      const id = tokenData._id; // 解密得到用户 ID
      const user = await Model.findById(id); // 验证模型(用户)是否存在
      assert(user, 401, '登录的用户不存在'); /* Forbidden */
      req.user = user; // 把找到的 user 信息挂载到 req 上给以后的中间件使用
      await next();
    };
  } else {
    return async function validatorMiddleware(req, res, next) {
      await next(); // 未提供模型跳过这个中间件
    };
  }
};
