/* eslint-disable no-console */
import {api} from '~/lib/api';
import {errorMessage} from '~/constants';

const CommonService = {
  getPrefectures,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  registerSeller,
  getAddress,
  getPrefectureByZipcode,
  uploadFile,
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
  const [data, , , error_code] = await api.get('/addresses');
  if (error_code) {
    const message = errorMessage.find((item) => item.code === error_code)?.message;
    return message;
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
  const [data, errors] = await api.get(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${zipcode}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function uploadFile(payload) {
  const [data, errors] = await api.post('/image_storages', payload);
  if (errors && errors.length) {
    return parserError(errors);
  }
  return data;
}
export default CommonService;
