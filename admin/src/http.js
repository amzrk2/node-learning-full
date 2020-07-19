import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api', // API 地址
  withCredentials: true,
});

// 拦截器
http.interceptors.response.use(
  (res) => {
    return res; // 响应正常返回
  },
  (err) => {
    if (err.response.data.message) {
      // 此处由前后端统一规定返回错误格式
      // 一旦发生错误，在 message 字段中返回给前端错误的详情用于显示在提示框内
      // 这里的 $message 是由 element 绑定在 Vue.prototype 上的用于显示消息的 popup
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message,
      });
    }
    // 未登录自动跳转
    if (err.response.status && err.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(err); // 返回一个被 reject 的 Promise
  }
);

export default http;
