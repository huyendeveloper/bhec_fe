import * as defaultAxios from 'axios';
import {getSession} from 'next-auth/client';

const axios = defaultAxios.create({
  baseURL: process.env.API_DEFAULT_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
  },
});

axios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  });

export default axios;
