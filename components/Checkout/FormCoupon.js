import {FormControlLabel, InputBase, makeStyles, Paper, Radio, RadioGroup} from '@material-ui/core';
import produce from 'immer';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilState, useRecoilValue} from 'recoil';

import {AlertMessageForSection, BlockForm, Button, ConnectForm} from '~/components';
import {format} from '~/lib/date';
import {CouponService} from '~/services';
import {billState} from '~/store/cartState';
import {couponState} from '~/store/couponState';
import {orderState} from '~/store/orderState';

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
  const classes = useStyles();
  const [alerts, setAlerts] = useState(null);
  const [coupons, setCoupons] = useRecoilState(couponState);
  const [loaded, setLoaded] = React.useState(false);
  const [order, setOrder] = useRecoilState(orderState);
  const {subTotal, shippingFee} = useRecoilValue(billState);

  const handleChange = (e) => {
    const coupon = coupons.items.find((item) => item.code === e.target.value);
    const discount = coupon ? (coupon.coupon_type === 1 ? calDiscountByPercent(coupon.value) : coupon.value) : 0;
    setOrder({...order, coupon_code: e.target.value, discount});
  };

  const calDiscountByPercent = (value) => {
    const discount = (subTotal + shippingFee) * (value / 100);
    if (discount > (subTotal + shippingFee)) {
      return subTotal + shippingFee;
    }
    return discount;
  };

  const handleCheckCoupon = async (code) => {
    const isExistCoupon = coupons.items.find((item) => item.code === code);
    if (isExistCoupon) {
      setAlerts({
        type: 'error',
        message: 'すでに登録されているクーポンコードです。',
      });
      return;
    }

    const res = await CouponService.getCouponDetails({code});
    if (res?.success && res?.data) {
      setAlerts({
        type: 'success',
        message: 'クーポンが適用されました。',
      });
      const {coupon} = res.data;

      if (coupon) {
        const discountInfo = (coupon.value || '0') + (coupon.coupon_type === 1 ? '%' : '円');
        const expiration_date = format(coupon.expiration_date, 'jaDateMD');
        setCoupons(produce((draft) => {
          draft.items.push({...coupon, code, label: `クーポン名  ${discountInfo}  ${expiration_date}`});
        }));
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

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <ConnectForm>
      {/* eslint-disable-next-line no-unused-vars */}
      {({control, getValues}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'クーポン利用'}
            id={'coupon'}
          >
            {loaded && coupons && coupons?.items?.length > 0 &&
            <>
              <Controller
                name={'coupon_code'}
                control={control}
                defaultValue={order?.coupon_code || ''}
                render={({field: {onChange, value}}) => (
                  <RadioGroup
                    name={'coupon_code'}
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      handleChange(e);
                    }}
                    className={classes.radioGroup}
                  >
                    {coupons?.items.map((item) => (
                      <FormControlLabel
                        key={item.code}
                        value={item.code}
                        control={<Radio/>}
                        label={item.label}
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
                type='submit'
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
