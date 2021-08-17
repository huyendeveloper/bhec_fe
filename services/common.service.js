import axios from 'axios';

export const commonService = {
  get,
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
