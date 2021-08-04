import axios from 'axios';
import {getSession} from 'next-auth/client';

const customAxios = axios.create({
  baseURL: 'http://18.118.210.155',
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
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  });

export default customAxios;

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log(config);
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });

// export default axios;