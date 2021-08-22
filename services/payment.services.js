import {axios} from '~/modules/axios';

const PaymentService = {
  getCards,
  createCard,
  getDetailCard,
  deleteCard,
};

async function getCards() {
  const result = await axios.get('/cards').then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function createCard(body) {
  const result = await axios.post('/cards', body).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function getDetailCard(id) {
  const result = await axios.get(`/cards/${id}`).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

async function deleteCard(id) {
  const result = await axios.delete(`/cards/${id}`).then((res) => {
    return res;
  }).catch((error) => {
    return error.response;
  });
  return result;
}

export default PaymentService;
