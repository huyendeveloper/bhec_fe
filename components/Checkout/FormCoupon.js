import {FormControlLabel, InputBase, makeStyles, Paper, Radio, RadioGroup} from '@material-ui/core';
import produce from 'immer';
import {signOut} from 'next-auth/client';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';

import {AlertMessageForSection, BlockForm, Button, ConnectForm} from '~/components';
import {httpStatus} from '~/constants';
import {AuthService, CouponService} from '~/services';
import {billState} from '~/store/cartState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';
import {getErrorMessage} from '~/lib/getErrorMessage';

const AuthServiceInstance = new AuthService();

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: '1.313rem',
    '& input': {
      backgroundColor: 'transparent !important',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      color: '#8A8A8A',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.688rem',
        lineHeight: '1.031rem',
      },
    },
  },
  btnApply: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.black.light,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: '6.063rem',
    height: '3rem',
    position: 'absolute',
    right: '-1px',
    fontWeight: '700',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '6.25rem',
      height: '2.5rem',
      fontSize: '0.813rem',
    },
  },
  inputBlock: {
    margin: '2.5rem 0 1rem',
    display: 'flex',
    alignItems: 'center',
    width: '22.75rem',
    height: '3rem',
    border: `1px solid ${theme.border.default}`,
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '21.75rem',
      height: '2.5rem',
    },
  },
  radioGroup: {
    '& .labelRadioBtn': {
      height: '1.5rem',
      marginBottom: '1.5rem',
    },
    '& .labelRadioBtn:last-child': {
      marginBottom: '0',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
  },
}));

// eslint-disable-next-line no-unused-vars
const FormCoupon = () => {
  const router = useRouter();
  const classes = useStyles();
  const [alerts, setAlerts] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState(false);
  const [order, setOrder] = useRecoilState(orderState);
  const {net_amount, total_shipping_fee} = useRecoilValue(billState);
  const setUser = useSetRecoilState(userState);
  const {
    getValues,
  } = useForm({criteriaMode: 'all'});
  const handleChange = (e) => {
    if (e) {
      const coupon = coupons?.find((item) => item.coupon.code === e.target.value);
      const discount = coupon ? (coupon.coupon.coupon_type === 1 ? calDiscountByPercent(coupon.coupon.value) : calDiscountNotByPercent(coupon.coupon.value)) : 0;
      setOrder({...order, coupon_code: e.target.value, discount});
    } else {
      setOrder({...order, coupon_code: '', discount: 0});
    }
  };

  const calDiscountByPercent = (value) => {
    const discount = (net_amount + total_shipping_fee) * (value / 100);
    if (discount > (net_amount + total_shipping_fee)) {
      return net_amount + total_shipping_fee;
    }
    return discount;
  };

  const calDiscountNotByPercent = (value) => {
    if (net_amount + total_shipping_fee < value) {
      return net_amount + total_shipping_fee;
    }
    return value;
  };

  const addCoupon = async (code) => {
    // add coupon
    const {userCoupon, error} = await CouponService.addCoupons({
      coupon_code: code,
    });

    if (error) {
      await fetchUserInfo();
      if (error === httpStatus.UN_AUTHORIZED) {
        requestLogin();
      }
      if (error.errorCode) {
        setAlerts({
          type: 'error',
          message: getErrorMessage(error.errorCode),
        });
      }
    } else {
      setCoupons([...coupons, userCoupon]);
      setAlerts({
        type: 'success',
        message: 'クーポンが適用されました。',
      });
    }
  };

  const handleCheckCoupon = async (code) => {
    // validate
    const isExistCoupon = coupons.find((item) => item.coupon.code === code);
    if (isExistCoupon) {
      setAlerts({
        type: 'error',
        message: 'すでに登録されているクーポンコードです。',
      });
      return;
    }
    const res = await CouponService.getCouponDetails({code});
    if (res?.success && res?.data) {
      const {coupon} = res.data;

      if (coupon) {
        await addCoupon(code);
      }

      if (!coupon) {
        setAlerts({
          type: 'error',
          message: 'クーポンコードは正しくありません。',
        });
      }
    }
    if (!res?.success || !res?.data) {
      setAlerts({
        type: 'error',
        message: 'クーポンコードは正しくありません。',
      });
    }
  };

  const fetchUserInfo = async () => {
    const response = await AuthServiceInstance.getInfoUser();
    if (!response?.user) {
      return requestLogin();
    }

    setUser(
      produce((draft) => {
        draft.profile = response?.user;
      }),
    );

    return response?.user;
  };

  const requestLogin = () => {
    setCoupons([]);
    setUser({});
    signOut({redirect: false});
    router.push({
      pathname: 'auth/login',
    });
  };

  const fetchCoupons = async () => {
    const {userCoupons, error} = await CouponService.getCouponsActive();
    if (error) {
      await fetchUserInfo();
      if (error === httpStatus.UN_AUTHORIZED) {
        requestLogin();
      }
    } else {
      setCoupons([...userCoupons]);
    }
  };
  useEffect(() => {
    const coupon = coupons?.find((item) => item.coupon.code === order?.coupon_code);
    setCouponCode(coupon?.coupon?.code);
    const discount = coupon ? (coupon.coupon.coupon_type === 1 ? calDiscountByPercent(coupon.coupon.value) : calDiscountNotByPercent(coupon.coupon.value)) : 0;
    setOrder({...order, discount});
  }, [coupons]);

  useEffect(() => {
    fetchCoupons().finally(() => {
      setLoaded(true);
    });
  }, []);

  const handleSelectedCoupon = (event) => {
    if (event.target.value === couponCode) {
      setCouponCode(null);
      handleChange(null);
    } else {
      setCouponCode(event.target.value);
      handleChange(event);
    }
  };

  return (
    <ConnectForm>
      {/* eslint-disable-next-line no-unused-vars */}
      {({control}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'クーポン利用'}
            id={'coupon'}
          >
            {loaded && coupons && coupons?.length > 0 &&
            <>
              <Controller
                name={'coupon_code'}
                control={control}
                defaultValue={order?.coupon_code || ''}
                render={() => (
                  <RadioGroup
                    name={'coupon_code'}
                    value={couponCode}
                    className={classes.radioGroup}
                  >
                    {coupons?.map((item) => (
                      <FormControlLabel
                        key={item?.coupon?.code}
                        value={item?.coupon?.code}
                        control={
                          <Radio
                            onClick={handleSelectedCoupon}
                            checked={couponCode === item?.coupon?.code}
                          />}
                        label={`${item?.coupon?.title} ${item?.coupon?.value}${item?.coupon?.coupon_type === 1 ? '%' : '円'}（${moment(item?.coupon?.expiration_time).format('YYYY年MM月DD日まで')}）`}
                        className={'labelRadioBtn'}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </>
            }

            <Paper
              elevation={0}
              component='div'
              className={classes.inputBlock}
            >
              <Controller
                name='couponCode'
                control={control}
                defaultValue={''}
                render={({field: {name, value, onChange}}) => (
                  <InputBase
                    className={classes.input}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder='クーポンコード入力'
                    inputProps={{'aria-label': 'search'}}
                  />
                )}
              />

              <Button
                variant='contained'
                type='button'
                size='large'
                className={classes.btnApply}
                onClick={() => handleCheckCoupon(getValues('couponCode'))}
              >
                {'適用'}
              </Button>
            </Paper>

            <AlertMessageForSection
              alert={alerts}
              handleCloseAlert={() => setAlerts(null)}
            />
          </BlockForm>
        );
      }}
    </ConnectForm>
  );
};

export default FormCoupon;
