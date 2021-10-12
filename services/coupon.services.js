import {httpStatus} from '~/constants';
import {axios} from '~/modules/axios';

const CouponService = {
  getCoupons,
  addCoupons,
  getCouponDetails,
};

async function getCouponDetails(payload) {
  const {data} = await axios.post('/coupons/check_valid', payload);
  return data;
}

async function getCoupons(payload) {
  try {
    const {data} = await axios.get(`/user_coupons?page=${payload.page}&per_page=${payload.per_page}`, {progress: true});
    const {success, message, status, error_code} = data;

    const haveNextPage = data.data.page < data.data.pages;

    if (status === httpStatus.UN_AUTHORIZED) {
      return {haveNextPage: false, userCoupons: [], error: httpStatus.UN_AUTHORIZED};
    }

    if (!success) {
      return {haveNextPage: false, userCoupons: [], error: {errorCode: error_code, message}};
    }

    return {haveNextPage, userCoupons: data.data.user_coupons, error: null};
  } catch (error) {
    return {haveNextPage: false, userCoupons: [], error};
  }
}

async function addCoupons(payload) {
  try {
    const {data} = await axios.post('/user_coupons', payload, {progress: true});
    const {success, message, status, error_code} = data;

    if (status === httpStatus.UN_AUTHORIZED) {
      return {userCoupon: [], error: httpStatus.UN_AUTHORIZED};
    }

    if (!success) {
      return {userCoupon: [], error: {errorCode: error_code, message}};
    }

    return {userCoupon: data.data.user_coupon, error: null};
  } catch (error) {
    return {userCoupon: [], error};
  }
}

export default CouponService;
