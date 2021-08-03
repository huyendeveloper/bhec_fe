import axios from 'axios';
import {useSession} from 'next-auth/client';

const customAxios = axios.create({
  baseURL: 'http://18.118.210.155',
  headers: {
    Accept: 'application/json',
  },
});
customAxios.interceptors.request.use(
  async (config) => {
    const [session] = useSession();
    config.headers = {
      Authorization: `Bearer ${session?.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  });

export default customAxios;