import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class AuthService {
  async loginByEmail(payload) {
    const [data, errors] = await api.post('/users/sign_in', payload, {progress: true});
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
    const [data, errors] = await api.post('/users', payload, {progress: true});
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async confirmAccount(payload) {
    const [data, errors] = await api.post('/users/confirmation', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async changePassword(payload) {
    const [data, errors] = await api.post('/users/change_password', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async resetPassword(payload) {
    const [data, errors] = await api.post('/users/reset_password', payload, {progress: true});
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async forgotPassword(payload) {
    const [data, errors] = await api.post('/users/forgot_password', payload, {progress: true});
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getInfoUser() {
    const [data, errors] = await api.get('/users/me');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async updateInfoUser(payload) {
    const [data, errors] = await api.patch('/users/update_me', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
