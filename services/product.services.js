/* eslint-disable no-console */
import {api} from '~/lib/api';
import {clean} from '~/lib/object';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class ProductService {
  async getProducts(payload) {
    const DEFAULT_PER_PAGE = 12;
    const cleanPayload = clean(payload);
    const activeParam = {
      per_page: DEFAULT_PER_PAGE,
      page: 1,
    };
    let {category, tag} = cleanPayload;
    if (category && category.length) {
      if (category === 'string') {
        category = category.split(',');
      }
      activeParam.category = category;
    }
    if (tag && tag.length) {
      if (tag === 'string') {
        tag = tag.split(',');
      }
      activeParam.tag = tag;
    }

    if (payload?.page) {
      activeParam.page = parseInt(payload.page, 10);
    }

    if (payload?.keyword && payload?.keyword.length) {
      activeParam.keyword = payload.keyword;
    }
    const [data, errors] = await api.get('/products', {...cleanPayload, ...activeParam});
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

  async getTags() {
    const [data, errors] = await api.get('/tags');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getCategories() {
    const [data, errors] = await api.get('/categories');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
