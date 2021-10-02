import {api} from '~/lib/api';
import {axios} from '~/modules/axios';
import {clean} from '~/lib/object';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};
export default class ContactService {
  async getContactCategories() {
    const [data, errors] = await api.get('/contact_categories');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async createContact(payload) {
    const {data, errors} = await axios.post('/contacts', payload);
    if (errors && errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async createContactProduct(payload) {
    const {data, errors} = await axios.post('/contact_products', payload);
    if (errors && errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getContacts(payload) {
    const DEFAULT_PER_PAGE = 10;
    const cleanPayload = clean(payload);
    const activeParam = {
      per_page: DEFAULT_PER_PAGE,
      page: payload.page || 1,
    };
    if (payload?.page) {
      activeParam.page = parseInt(payload.page, 10);
    }
    const [data, errors] = await api.get('/contacts', {...cleanPayload, ...activeParam});
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }

  async getContactDetail(id) {
    const [data, errors] = await api.get(`/contacts/${id}`);
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}

