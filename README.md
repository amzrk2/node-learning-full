# node-learning-full

Node + Vue + MongoDB 实验项目还原游戏内容发布站，用于完整学习详情请见 README。

重点内容的学习笔记等：

- <https://blog.amzrk2.cc/post/universal-crud-router/>
- <https://blog.amzrk2.cc/post/login-api-jwt/>
- 所有注释

依据个人情况修改与学习自：<https://github.com/wxs77577/node-vue-moba>。

自行修改的内容：

- 大量移动端页面的 CSS 实现方法
- Spirit 图片的部分应用
- 通用卡片组件的实现
- 通过 Cookie 实现的权限验证
- jwt RSA256 基于公钥+密钥的 token 验证
- 中间件代码分离与整理
- 部分页面的样式与逻辑设计
- 部分数据的逻辑设计
- 登录用户信息回显
- 注销账户功能

## server

服务端接口实现：

| 技术 / 库     | 用途                         | 项目地址                                         |
| ------------- | ---------------------------- | ------------------------------------------------ |
| Node.js       | 基础                         | <https://github.com/nodejs/node>                 |
| Express       | 服务端路由 / 静态文件        | <https://github.com/expressjs/express>           |
| mongoose      | 数据库模型 / 数据库使用      | <https://github.com/Automattic/mongoose>         |
| cors          | 跨域                         | <https://github.com/expressjs/cors>              |
| inflection    | 通用 CRUD 接口类名转换中间件 | <https://github.com/dreamerslab/node.inflection> |
| multer        | 图片上传                     | <https://github.com/expressjs/multer>            |
| bcrypt        | 密码加密                     | <https://github.com/kelektiv/node.bcrypt.js>     |
| jsonwebtoken  | 用户登陆验证 token           | <https://www.npmjs.com/package/jsonwebtoken>     |
| cookie-parser | 解析 Cookie                  | <https://npmjs.org/package/cookie-parser>        |

## admin

管理后台实现：

| 技术 / 库     | 用途             | 项目地址                                    |
| ------------- | ---------------- | ------------------------------------------- |
| Vue.js        | 基础             | <https://github.com/vuejs/vue>              |
| Vue Router    | 路由             | <https://github.com/vuejs/vue-router>       |
| Element UI    | 方便快速搭建界面 | <https://github.com/ElemeFE/element>        |
| axios         | ajax             | <https://github.com/axios/axios>            |
| normalize.css | CSS Reset        | <https://github.com/necolas/normalize.css>  |
| vue2-editor   | 文章富文本编辑   | <https://github.com/davidroyer/vue2-editor> |
| js-cookie     | 方便写入 Cookies | <https://github.com/js-cookie/js-cookie>    |

## web

移动端展示页面实现：

| 技术 / 库          | 用途      | 项目地址                                             |
| ------------------ | --------- | ---------------------------------------------------- |
| Vue.js             | 基础      | <https://github.com/vuejs/vue>                       |
| Vue Router         | 路由      | <https://github.com/vuejs/vue-router>                |
| axios              | ajax      | <https://github.com/axios/axios>                     |
| normalize.css      | CSS Reset | <https://github.com/necolas/normalize.css>           |
| vue-awesome-swiper | 幻灯片    | <https://github.com/surmon-china/vue-awesome-swiper> |
