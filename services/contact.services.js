import {api} from '~/lib/api';
import {axios} from '~/modules/axios';

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

  async createContact(payload, headers) {
    const {data, errors} = await axios.post('/contacts', payload, {headers});
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
}

