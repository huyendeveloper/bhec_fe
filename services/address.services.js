import {api} from '~/lib/api';

const AddressService = {
  getAll,
  createAddress,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getAll() {
  const [data, errors] = await api.get('/addresses');
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function createAddress(body) {
  const result = await api.post('/addresses', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

export default AddressService;
