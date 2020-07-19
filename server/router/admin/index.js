const express = require('express');
const router = express.Router({ mergeParams: true });
// mergeParams 使路由内可访问自身 req.params.resource

// 小写复数形式转为单数大写类名形式
const parseModelName = require('inflection').classify;
// 获取类名转换中间件
async function modelNameMiddleware(req, res, next) {
  const modelName = parseModelName(req.params.resource);
  // 挂载 require 的 model 使其能在下一步中以 req.Model 直接使用
  req.Model = require(`../../model/${modelName}`);
  next();
}

// 文件上传中间件
const multer = require('multer');
const path = require('path');
const uploadMiddleware = multer({ dest: path.resolve(__dirname, '../../uploads') });

// 密
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../test_key.key'), { encoding: 'utf-8' });
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../test_key.key.pub'), { encoding: 'utf-8' });

module.exports = (app) => {
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
    // 查询文章时
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
  // 通用 CRUD 接口
  app.use('/admin/api/rest/:resource', modelNameMiddleware, router);

  // 文件上传接口
  // single('file') 接受单个文件 字段名为 file (element 上传模块定义)
  app.post('/admin/api/upload', uploadMiddleware.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 通过用户名搜索用户
    const UserAdmin = require('../../model/UserAdmin');
    // password 字段设置了默认不获取，需要明确要求获取 password 字段
    const user = await UserAdmin.findOne({ username }).select('+password');
    if (!user) {
      // 用户不存在
      // 此处由前后端统一规定返回错误格式
      // 一旦发生错误，在 message 字段中返回给前端错误的详情用于显示在提示框内
      res.status(418);
      res.send({ message: '茶壶不存在' });
      return;
    }
    // 用户存在则校验密码
    const userValid = bcrypt.compareSync(password, user.password);
    if (!userValid) {
      // 密码错误
      res.status(403);
      res.send({ message: '密码错误' });
      return;
    }
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
};
