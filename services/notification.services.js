/* eslint-disable no-console */
import {api} from '~/lib/api';

const NotificationService = {
  getNotification,
  markReaded,
};

const parserError = (errors) => {
  return errors[0].message.
    split('\n').
    map((error, i) => <div key={`err-${String(i)}`}>{error}</div>);
};

async function getNotification(payload) {
  const [data, errors] = await api.get('/users/list_notification', payload);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

async function markReaded(payload) {
  const [data, errors] = await api.post('/users/read_notification', payload);
  if (errors.length) {
    return parserError(errors);
  }
  return data;
}

export default NotificationService;
