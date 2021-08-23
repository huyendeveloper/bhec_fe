/* eslint-disable no-console */
import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class ProductService {
  async getProducts(payload) {
    const [data, errors] = await api.get('/products', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getProductDetail(id) {
    const [data, errors] = await api.get(`/products/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
