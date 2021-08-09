import axios from '../modules/axios/customAxios';

export const AuthService = {
  loginByEmail,
  loginByLine,
  loginByGmail,
  registerEmail,
};

async function loginByEmail(body) {
  const result = await axios.post('/users/sign_in', body);
  return result;
}

async function loginByLine(body) {
  const result = await axios.post('/users/line', body);
  return result;
}

async function loginByGmail(body) {
  const result = await axios.post('/users/google_oauth2', body);
  return result;
}

async function registerEmail(body) {
  const result = await axios.post('/users', body);
  return result;
}