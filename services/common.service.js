import axios from 'axios';

export const commonService = {
  get,
  post,
};

function get(url, params) {
  return axios.get(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        params,
      },
    },
  ).then((response) => response.data);
}

function post(url, body) {
  const result = axios.post(url, body);
  return result;
}
