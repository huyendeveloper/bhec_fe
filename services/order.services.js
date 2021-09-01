import {api} from '~/lib/api';

const OrderService = {
  createOrder,
};

// eslint-disable-next-line no-warning-comments
// TODO: DRY me
const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function createOrder(body) {
  const [data, errors] = await api.post('/orders', body);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default OrderService;
