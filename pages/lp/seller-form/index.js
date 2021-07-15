/* eslint-disable no-process-env,no-undef */

import axios from 'axios';

import SellerForm from './seller-form';

const API_ENDPOINT = process.env.API_ENDPOINT;

export const registerSeller = async (sellerData) => {
  return axios.post(
    `${API_ENDPOINT}/send_mail_shop_owner`,
    {...sellerData},
  );
};

export default SellerForm;
