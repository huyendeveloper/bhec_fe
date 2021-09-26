import {api} from '~/lib/api';
import {clean} from '~/lib/object';

const OrderService = {
  createOrder,
  getOrders,
  getOrderDetail,
  exportOrderPdf,
};

// eslint-disable-next-line no-warning-comments
// TODO: DRY me
const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function createOrder(payload) {
  const [data, errors] = await api.post('/orders', payload);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function getOrders(payload) {
  const DEFAULT_PER_PAGE = 10;
  const cleanPayload = clean(payload);
  const activeParam = {
    per_page: DEFAULT_PER_PAGE,
    page: 1,
  };
  if (payload?.page) {
    activeParam.page = parseInt(payload.page, 10);
  }
  const [data, errors] = await api.get('/orders', {...cleanPayload, ...activeParam});
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function getOrderDetail(id) {
  const [data, errors] = await api.get(`/orders/${id}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function exportOrderPdf(id) {
  const [data, errors] = await api.get(`/users/export_order_pdf?order_number=${id}`);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default OrderService;
