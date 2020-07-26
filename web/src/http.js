import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api', // API 地址
  // baseURL: 'http://localhost:3000/web/api', // API 地址
});

export default http;
