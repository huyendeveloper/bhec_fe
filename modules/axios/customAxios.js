import axios from 'axios';
import {getSession} from 'next-auth/client';

const customAxios = axios.create({
  baseURL: process.env.API_DEFAULT_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
customAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers = {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  });

export default customAxios;