import {axios} from '~/modules/axios';
import {api} from '~/lib/api';
import {httpStatus} from '~/constants';

const CouponService = {
  getCoupons,
  addCoupons,
  getCouponDetails,
  getCouponsActive,
};

async function getCouponDetails(payload) {
  const {data} = await axios.post('/coupons/check_valid', payload);
  return data;
}

async function getCoupons(payload) {
  try {
    const [data, response] = await api.get('/user_coupons', payload, {progress: true});
    const {page, pages, user_coupons} = data;
    const {error_code, message} = response.data;

    if (error_code) {
      return {page: 0, pages: 0, userCoupons: [], error: {errorCode: error_code, message}};
    }

    return {page, pages, userCoupons: user_coupons, error: null};
  } catch (error) {
    return {page: 0, pages: 0, userCoupons: [], error};
  }
}

async function getCouponsActive() {
  try {
    const {data} = await axios.get('/user_coupons/all?active=1');
    const {success, message, status, error_code} = data;

    if (status === httpStatus.UN_AUTHORIZED) {
      return {userCoupons: [], error: httpStatus.UN_AUTHORIZED};
    }

    if (!success) {
      return {userCoupons: [], error: {errorCode: error_code, message}};
    }

    return {userCoupons: data.data.user_coupons, error: null};
  } catch (error) {
    return {userCoupons: [], error};
  }
}

async function addCoupons(payload) {
  try {
    const {data} = await axios.post('/user_coupons', payload, {progress: true});
    const {success, message, error_code} = data;

    if (!success) {
      return {userCoupon: [], error: {errorCode: error_code, message}};
    }

    return {userCoupon: data.data.user_coupon, error: null};
  } catch (error) {
    return {userCoupon: [], error};
  }
}

export default CouponService;
