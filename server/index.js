const express = require('express');
const path = require('path');

const app = express();
app.use(
  require('cors')({
    // cors 包支持正则匹配 此时用例如 http://localhost:8080/heroes/list 进行访问时
    // Access-Control-Allow-Origin 会被设置为 http://localhost:8080
    // 即可支持接受 Cookie
    origin: [/localhost/],
    credentials: true,
  })
);
app.use(require('cookie-parser')());
app.use(express.json());

// 静态可访问文件
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
require('./plugin/db')(app);
require('./router/admin/index')(app);
require('./router/web/index')(app);

// 编译的前端静态文件
// //domain.com/admin => ./public/admin
app.use('/admin', express.static(path.resolve(__dirname, 'public/admin')));
// //domain.com => ./public/web
app.use('/', express.static(path.resolve(__dirname, 'public/web')));

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
