import axios from '../modules/axios/customAxios';

export const AuthService = {
  loginByEmail,
  loginByLine,
  loginByGmail,
  registerEmail,
  confirmAccount,
  changePassword,
  resetPassword,
  forgotPassword,
};

async function loginByEmail(body) {
  const result = await axios.post('/users/sign_in', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function loginByLine(body) {
  const result = await axios.post('/users/line', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function loginByGmail(body) {
  const result = await axios.post('/users/google_oauth2', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function registerEmail(body) {
  const result = await axios.post('/users', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function confirmAccount(body, configs) {
  const result = await axios.post('/users/confirmation', body, configs).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function changePassword(body) {
  const result = await axios.post('/users/change_password', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function resetPassword(body) {
  const result = await axios.post('/users/reset_password', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function forgotPassword(body) {
  const result = await axios.post('/users/forgot_password', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}