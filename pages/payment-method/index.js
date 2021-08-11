import axios from 'axios';

import PaymentMethod from './payment-method';

export const registerPayment = async (data) => {
  return axios.post(
    `${process.env.VERITRANS_TOKEN_SERVER_ENDPOINT}`,
    {...data},
  ).then((response) => {
    return response;
  }).catch((error) => {
    return error.response;
  });
};

export default PaymentMethod;
