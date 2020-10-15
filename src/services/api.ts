import axios from 'axios';

const api = axios.create({
  baseURL: 'https://autoc.finance.yahoo.com',
});

export default api;
