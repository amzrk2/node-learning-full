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
    console.log(req.Model);
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'; // populate 根据 parent 内存的 ID 同时查询出 parent 作为对象返回
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
  app.use('/admin/api/upload', uploadMiddleware.single('file'), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });
};
