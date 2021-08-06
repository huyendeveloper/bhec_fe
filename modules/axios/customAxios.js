import axios from 'axios';
import {getSession} from 'next-auth/client';

const customAxios = axios.create({
  baseURL: 'http://18.118.210.155/api/v1',
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