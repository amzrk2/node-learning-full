// 登录校验中间件
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../test_key.key.pub'), { encoding: 'utf-8' });
const UserAdmin = require('../../model/UserAdmin');

module.exports = async function validatorMiddleware(req, res, next) {
  if (req.cookies.token) {
    let tokenData;
    try {
      tokenData = jwt.verify(req.cookies.token, publicKey, { algorithms: ['RS256'] });
    } catch (e) {
      res.status(403); // 无权限
      res.send({ message: '403 Forbidden Authentication Error' });
      return;
    }
    if (!tokenData._id) {
      res.status(403); // 无权限
      res.send({ message: '403 Forbidden Authentication Failed' });
      return;
    }
    const id = tokenData._id; // 解密得到用户 ID
    const user = await UserAdmin.findById(id); // 验证用户是否存在
    if (!user) {
      res.status(403); // 无权限
      res.send({ message: '403 Forbidden Authentication Failed' });
      return;
    }
    req.user = user; // 把找到的 user 信息挂载到 req 上给以后的中间件使用
    await next();
  } else {
    res.status(403); // 无权限
    res.send({ message: '403 Forbidden No Authentication Data' });
    return;
  }
};
