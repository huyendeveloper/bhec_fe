import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class PaymentService {
  async getCards() {
    const [data, errors] = await api.get('/cards');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async createCard(payload) {
    const [data, errors] = await api.post('/cards', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getDetailCard(id) {
    const [data, errors] = await api.get(`/cards/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async deleteCard(id) {
    const [data, errors] = await api.delete(`/cards/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async authorize(payload) {
    const [data, errors] = await api.post('/cards/authorize_card_info', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}

