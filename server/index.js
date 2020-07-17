const express = require('express');
const path = require('path');

const app = express();
app.use(require('cors')());
app.use(express.json());

// 静态可访问文件
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
require('./plugin/db')(app);
require('./router/admin/index')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
