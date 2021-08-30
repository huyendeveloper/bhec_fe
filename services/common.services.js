/* eslint-disable no-console */
import {api} from '~/lib/api';

const CommonService = {
  getPrefectures,
  getAddress,
  addAddress,
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

async function getAddress() {
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

export default CommonService;
