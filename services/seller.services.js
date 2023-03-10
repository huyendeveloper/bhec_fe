import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class SellerService {
  async getSellerDetail(id) {
    const [data, errors] = await api.get(`/sellers/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async followSeller(payload) {
    const [data, errors] = await api.post('/users/follow', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async unFollowSeller(payload) {
    const [data, errors] = await api.post('/users/unfollow', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getSellersFollowed(params) {
    const [data, errors] = await api.get('/users/list_followed_seller', params);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async previewSeller(key) {
    const [data, errors] = await api.get(`/admins/seller_previews/detail?preview_key=${key}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
