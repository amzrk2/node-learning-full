// 登录校验中间件
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const assert = require('http-assert');

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../test_key.key.pub'), { encoding: 'utf-8' });
const UserAdmin = require('../../model/UserAdmin');

module.exports = async function validatorMiddleware(req, res, next) {
  assert(req.cookies.token, 401, '未登陆账户'); /* Unauthorized */
  let tokenData; // 解密 token
  try {
    tokenData = jwt.verify(req.cookies.token, publicKey, { algorithms: ['RS256'] });
  } catch (e) {
    tokenData = null;
  }
  assert(tokenData && tokenData._id, 400, '服务器无法解析登录信息'); /* Bad Request */
  const id = tokenData._id; // 解密得到用户 ID
  const user = await UserAdmin.findById(id); // 验证用户是否存在
  assert(user, 403, '登录的用户不存在'); /* Forbidden */
  req.user = user; // 把找到的 user 信息挂载到 req 上给以后的中间件使用
  await next();
};
