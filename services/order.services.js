import {api} from '~/lib/api';

const OrderService = {
  createOrder,
};

async function createOrder(body) {
  const result = await api.post('/orders', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

export default OrderService;
