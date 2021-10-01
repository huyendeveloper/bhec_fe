import {axios} from '~/modules/axios';

const CouponService = {
  getCouponDetails,
};

async function getCouponDetails(payload) {
  const {data} = await axios.post('/coupons/check_valid', payload);
  return data;
}

export default CouponService;
