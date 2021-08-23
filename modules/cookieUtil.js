import Cookies from 'js-cookie';

function getCookie(name) {
  return Cookies.get(name);
}

function setCookie(name, value) {
  return Cookies.set(name, value);
}

export const cookieUtil = {
  getCookie,
  setCookie,
};