import * as defaultAxios from 'axios';
import {getSession, signOut} from 'next-auth/client';
import Router from 'next/router';
import {httpStatus} from '~/constants';

const axios = defaultAxios.create({
  baseURL: process.env.API_DEFAULT_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
    'Cache-Control': 'no-cache',
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
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      response: {status},
    } = error;
    if (status === httpStatus.UN_AUTHORIZED || status === httpStatus.FOR_BIDDEN) {
      signOut({redirect: false});
      Router.replace('/auth/login');
    }
    return Promise.reject(error);
  },
);

export default axios;
