/* eslint-disable no-console */
import {api} from '~/lib/api';

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

export default class CommonServices {
  async getCities() {
    const [data, errors] = await api.get('/provinces');
    if (errors.length) {
      return parserError(errors);
    }
    return data;
  }
}
