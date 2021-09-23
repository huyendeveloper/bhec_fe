/* eslint-disable no-console */
import {api} from '~/lib/api';

const CommonService = {
  getPrefectures,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  registerSeller,
  getAddress,
  getPrefectureByZipcode,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getPrefectures() {
  const [data, errors] = await api.get('/provinces');
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function getAddresses() {
  const [data, errors] = await api.get('/addresses');
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function addAddress(payload) {
  const [data, errors] = await api.post('/addresses', payload);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function updateAddress(payload, id) {
  const [data, errors] = await api.patch(`/addresses/${id}`, payload);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function deleteAddress(id) {
  const [data, errors] = await api.delete(`/addresses/${id}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function registerSeller(payload) {
  const [data, errors] = await api.post('/seller_register', payload);
  const isSend = data?.status === 'Email sent';
  if (errors.length) {
    return parserError(errors);
  }
  return {data: isSend, errors};
}

async function getAddress(id) {
  const [data, errors] = await api.get(`/addresses/${id}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function getPrefectureByZipcode(zipcode) {
  const [data, errors] = await api.get(`http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${zipcode}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default CommonService;
