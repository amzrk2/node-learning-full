const express = require('express');
const router = express.Router();
const Category = require('../../model/Category');

module.exports = (app) => {
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10);
    // populate 根据 parent 内存的 ID 同时查询出 parent 作为对象返回
    res.send(items);
  });
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  });
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id);
    res.send(model);
  });
  app.use('/admin/api', router);
};
