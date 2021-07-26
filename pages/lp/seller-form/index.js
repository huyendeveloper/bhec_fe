/* eslint-disable no-process-env,no-undef */

import axios from 'axios';

import SellerForm from './seller-form';

const API_ENDPOINT = process.env.API_ENDPOINT;

export const registerSeller = async (sellerData) => {
  return axios.post(
    `${API_ENDPOINT}/seller_register`,
    {...sellerData},
  );
};

export default SellerForm;
