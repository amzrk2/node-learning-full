const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams 使路由内可访问自身 req.params.resource
const path = require('path');
const assert = require('http-assert');

// 获取类名转换中间件
const modelNameMiddleware = require('./classify');

// 文件上传中间件
const multer = require('multer');
const uploadMiddleware = multer({ dest: path.resolve(__dirname, '../../uploads') });

// 密
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../../keys');

// 校验中间件
const validatorMiddleware = require('./validator')({ modelName: 'UserAdmin' });

module.exports = (app) => {
  /* 通用 CRUD 路由接口部分 */
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.get('/', async (req, res) => {
    let queryOptions = {};
    // 当查询 Category 时的特殊处理
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'; // populate 根据 parent 内存的 ID 同时查询出 parent 作为对象返回
    }
    // 查询文章时的特殊处理
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'category'; // populate 根据 category 内存的 ID 同时查询出 category 作为对象返回
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(items);
  });
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send(model);
  });
  app.use('/admin/api/rest/:resource', validatorMiddleware, modelNameMiddleware, router);

  /* 文件上传接口 */
  // single('file') 接受单个文件 字段名为 file (element 上传模块定义)
  app.post('/admin/api/upload', validatorMiddleware, uploadMiddleware.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  /* 登录接口 */
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 通过用户名搜索用户
    const UserAdmin = require('../../model/UserAdmin');
    // password 字段设置了默认不获取，需要明确要求获取 password 字段
    const user = await UserAdmin.findOne({ username }).select('+password');
    // if (!user) {
    // 用户不存在 此处由前后端统一规定返回错误格式 一旦发生错误，在 message 字段中返回给前端错误的详情用于显示在提示框内
    //   res.status(418); res.send({ message: '茶壶不存在' }); return;
    // }
    assert(user, 418, '茶壶 (用户) 不存在'); /* I'm a teapot */
    // 用户存在则校验密码
    const userValid = bcrypt.compareSync(password, user.password);
    assert(userValid, 403, '密码错误'); /* Forbidden */
    // 验证成功返回用户 token
    const token = jwt.sign(
      {
        _id: user._id, // 用户 ID (MongoDB 提供)
        username: user.username, // 用户的 username
      },
      privateKey,
      { algorithm: 'RS256' }
    );
    res.send({ token });
  });

  /* 接受 token 的信息回显接口 */
  app.post('/admin/api/user', validatorMiddleware, async (req, res) => {
    res.send(req.user);
  });

  // 错误处理
  // 此处由前后端统一规定返回错误格式
  // 一旦发生错误，在 message 字段中返回给前端错误的详情用于显示在提示框内
  app.use(async (err, req, res, next) => {
    if (err.status && err.message) {
      res.status(err.status);
      res.send({
        message: err.message,
      });
    } else {
      console.log(err);
      res.status(500);
      res.send({
        message: 'Internal Server Error',
      });
    }
  });
};
