
/* eslint-disable no-param-reassign */

// GET POST PUT DELETE 用。
const addDataRequest = (methods, method, api) => {
  methods[method] = (url, data, options = {}) => {
    return api(url, data, {...options, method});
  };
};

const ensureErrorObject = (e) => {
  //TODO: Need to update after BE update errors response.
  if (typeof e === 'object') {
    let message = '';
    if (e?.errors && typeof e?.errors === 'object') {
      Object.entries(e.errors).forEach(([key, value]) => {
        message += `${key} ${value}\n`;
      });
    }

    if (e?.error) {
      if (typeof e.error === 'string') {
        message += `${e.error}\n`;
      }

      if (typeof e.error === 'object') {
        Object.entries(e.error).forEach(([key, value]) => {
          message += `${key} ${value}\n`;
        });
      }
    }
    return {message};
  }

  // eslint-disable-next-line no-console
  console.error(`Invalid error object in response: ${e}`);

  return {message: '予期しないエラーが発生しました'};
};

const wrap = (api) => {
  return async (...args) => {
    const [result, error, response, error_code] = await api(...args);
    const errors = [];

    if (error) {
      errors.push(ensureErrorObject(error));
    }

    return [result?.data ?? result, errors, response, error_code];
  };
};

const utilize = (api) => {
  const methods = {};
  const wrapped = wrap(api);
  ['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
    addDataRequest(methods, method, wrapped);
  });

  return methods;
};

export default utilize;
