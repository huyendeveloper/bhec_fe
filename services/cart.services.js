import { api } from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class CartService {

  async getCarts() {
    const [data, errors] = await api.get('/carts');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async addCart(payload) {
    const [data, errors] = await api.post('/carts', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
