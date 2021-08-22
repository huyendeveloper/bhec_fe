import {axios} from '~/modules/axios';
import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class AuthService {
  async loginByEmail(payload) {
    const [data, errors] = await api.post('/users/sign_in', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getProductByID({id}) {
    const [data, errors] = await api.get(`/products/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async loginByLine(payload) {
    const [data, errors] = await api.post('/users/line', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async loginBySNS({type, ...payload}) {
    const snsURL = {
      line: '/users/line',
      gg: '/users/google_oauth2',
    };

    const [data, errors] = await api.post(snsURL[type], payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async registerEmail(payload) {
    const [data, errors] = await api.post('/users', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async confirmAccount(payload, headers) {
    const result = await axios.post('/users/confirmation', payload, headers).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async changePassword(payload) {
    const [data, errors] = await api.post('/users/change_password', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async resetPassword(payload) {
    const [data, errors] = await api.post('/users/reset_password', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async forgotPassword(payload) {
    const [data, errors] = await api.post('/users/forgot_password', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
