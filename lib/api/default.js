/* eslint-disable no-param-reassign */
import NProgress from 'nprogress';

import utilize from './utilize';

import {axios} from '~/modules/axios';

/**
 *
 * @param {string} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<[any, Error|null, Response|null]>}
 */
const api = async (url, data, options = {}) => {
  let response = null;
  let error = null;
  let result = null;
  let error_code = null;
  const {progress, headers} = options;

  if (progress) {
    NProgress.start();
  }

  const payload = options.method === 'get' ? {
    url,
    method: 'get',
    params: data,
    headers,
  } : {
    url,
    method: options.method ?? 'post',
    ...(data instanceof FormData ? {data,
      headers: {
        'content-type': 'multipart/form-data',
        ...headers,
      },
    } : {
      data,
    }),
  };

  try {
    response = await axios(payload);
    result = response?.data ?? response;
    if (response?.data?.error) {
      error = {error: response.data.error};
    }
  } catch (e) {
    if (e.response) {
      // When response status code is out of 2xx range
      error = e.response.data;
      error_code = error?.error_code;
      // eslint-disable-next-line no-console
      console.log(e.response);
    } else if (e.request) {
      // When no response was received after request was made
      error = {
        error: 'Server not response. Try again after',
      };
    } else {
      // Error
      error = {
        error: e.message,
      };
    }
    // eslint-disable-next-line no-console
    console.log(e);
  } finally {
    if (progress) {
      NProgress.done();
    }
  }
  return [result, error, response, error_code];
};

export default utilize(api);
