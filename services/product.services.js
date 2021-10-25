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
      per_page: payload.per_page || DEFAULT_PER_PAGE,
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

  async previewProduct(key) {
    const [data, errors] = await api.get(`/product_previews?preview_key=${key}`);
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

  async getSpecialTags() {
    const [data, errors] = await api.get('/tags/ten_outstanding_tag');
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

  async reviewProduct(payload) {
    const [data, errors] = await api.post('/reviews', payload);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async likeProduct(id) {
    const [data, errors] = await api.post(`/products/${id}/like`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async unlikeProduct(id) {
    const [data, errors] = await api.post(`/products/${id}/unlike`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getListFavoriteProduct(payload) {
    const DEFAULT_PER_PAGE = 10;
    const cleanPayload = clean(payload);
    const activeParam = {
      ...cleanPayload,
      per_page: payload.per_page || DEFAULT_PER_PAGE,
      page: payload.page || 1,
    };
    const [data, errors] = await api.get('/products/list_like', {...activeParam});
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}