import axios from '../modules/axios/customAxios';

export default class AuthService {
  async loginByEmail(payload) {
  // eslint-disable-next-line no-console
    console.log(payload);
    const result = await axios.post('/users/sign_in', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async loginByLine(payload) {
    const result = await axios.post('/users/line', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async loginByGmail(payload) {
    const result = await axios.post('/users/google_oauth2', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async registerEmail(payload) {
    const result = await axios.post('/users', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async confirmAccount(payload, configs) {
    const result = await axios.post('/users/confirmation', payload, configs).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async changePassword(payload) {
    const result = await axios.post('/users/change_password', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async resetPassword(payload) {
    const result = await axios.post('/users/reset_password', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }

  async forgotPassword(payload) {
    const result = await axios.post('/users/forgot_password', payload).then((res) => {
      return res;
    }).catch((error) => {
      return error.response;
    });
    return result;
  }
}
