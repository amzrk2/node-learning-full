import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api', // API 地址
});

export default http;
