import axios from 'axios';
import axiosRetry from 'axios-retry';
// import axios, { type AxiosResponse } from 'axios';
// import getToken from '../lib/token/getToken';
// import { useIPStore } from '@/CORE/stores/IP';
// const IPStore = useIPStore();
// import errorAlerter from './errorAlerter';
// export const BASE_URL = import.meta.env.VITE_APP_URL;

const isDEV = import.meta.env.DEV;

/**
 * axios 實例，將所有請求都放在這個 axios 實例上面，便於管理
 * getIp 僅會在實例初次引用且store內沒有IP時嘗試取得
 */
axios.defaults.withCredentials = true;

const Axios = axios.create({
  timeout: 100000,
  baseURL: isDEV ? '/base_url' : '/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${Authorization}`
  }
});

axiosRetry(Axios, {
  retries: 3,
  // retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000)
  retryDelay: axiosRetry.exponentialDelay
});

// Axios.interceptors.request.use((config) => {
//   const Authorization = localStorage.getItem('Authorization');
//   if (Authorization) config.headers['Authorization'] = `Bearer ${Authorization}`;
//   return config;
// });

// Axios.interceptors.response.use(
//   (response: AxiosResponse<backendResponse<any>>) => response,
//   (error) => {
//     /** 伺服器的錯誤 CORS 404 403 等 */
//     errorAlerter(error);
//     return Promise.reject(error);
//   }
// );

export default Axios;
