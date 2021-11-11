import {Grid, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import router from 'next/router';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {AlertMessageForSection, StyledForm} from '..';
import Button from '../Button';

import FormCoupon from './FormCoupon';
import FormCreditCard from './FormCreditCard';
import FormInvoice from './FormInvoice';
import FormNote from './FormNote';
import FormPaymentMethods from './FormPaymentMethods';
import FormShipping from './FormShipping';
import FormSignup from './FormSignup';
import OrderReview from './OrderReview';

import FormKombini from '~/components/Checkout/FormKombini';
import {OrderService} from '~/services';
import {billState, cartState, disableOrderState} from '~/store/cartState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';
import {loadingState} from '~/store/loadingState';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0 1rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '100%',
      },
    },
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const {handleSubmit, watch, ...methods} = useForm({criteriaMode: 'all'});
  const user = useRecoilValue(userState);
  const [order, setOrder] = useRecoilState(orderState);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const cart = useRecoilValue(cartState);
  const [bill, setBill] = useRecoilState(billState);
  const setLoading = useSetRecoilState(loadingState);
  const disableOrder = useRecoilValue(disableOrderState);

  // eslint-disable-next-line no-warning-comments
  // TODO: confirm user before leaving checkout
  // useEffect(() => {
  //   fetchData();

  //   const handleRouteChange = () => {
  //     try {
  //       if (isDirty && !isReadonly) {
  //         // eslint-disable-next-line no-alert
  //         const sure = window.confirm('Are you sure about that?');
  //         if (!sure) {
  //           router.events.emit('routeChangeError');
  //           router.replace(router, router.asPath, {shallow: true});
  //         }
  //       }
  //     } catch (e) {
  //       // eslint-disable-next-line no-throw-literal
  //       throw 'Cancel redirect to new page';
  //     }
  //   };

  //   router.events.on('beforeHistoryChange', handleRouteChange);
  //   return () => {
  //     router.events.off('beforeHistoryChange', handleRouteChange);
  //   };
  // }, [isReadonly]);

  const validate = () => {
    const getValues = methods?.getValues;
    const data = getValues();
    if (!data?.addressShipping) {
      router.push('#addressShipping');
      return;
    }
    if (!data?.creditCard) {
      router.push('#creditCard');
    }
  };

  const handleConfirmClick = (data) => {
    setOrder({...data, coupon_code: order?.coupon_code || '', discount: order?.discount || 0});
    router.push('/order-form/confirm');
  };

  const getTotalCost = async () => {
    setLoading(true);
    const products = cart?.items?.reduce((newRes, item) => {
      return [...newRes, {
        product_id: item?.productDetail?.id,
        quantity: item?.quantity,
      }];
    }, []);
    let payload = {
      products,
    };
    if (isAuthenticated) {
      payload = {
        ...payload,
        address_id: order?.addressShipping,
      };
    }
    if (!isAuthenticated) {
      payload = {
        ...payload,
        address: order?.address,
      };
    }
    const res = await OrderService.getTotalCost(payload);
    if (res?.success) {
      setBill(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if ((order?.addressShipping || order?.address) && cart?.items) {
      getTotalCost();
    }
    if (!(order?.addressShipping || order?.address) || !cart?.items) {
      const total_shipping_fee = 0;
      const net_amount = ((cart?.items?.reduce((total, item) => total + (parseInt(item.productDetail.price, 10) * item.quantity), 0)) + total_shipping_fee) - (order?.discount ?? 0);
      setBill({...bill, net_amount, total_shipping_fee});
    }
  }, [order?.addressShipping, order?.address, cart]);

  React.useEffect(() => {
    if ((order?.addressShipping || order?.address) && cart?.items) {
      getTotalCost();
    }
    if (!(order?.addressShipping || order?.address) || !cart?.items) {
      const total_shipping_fee = 0;
      const net_amount = ((cart?.items?.reduce((total, item) => total + (parseInt(item.productDetail.price, 10) * item.quantity), 0)) + total_shipping_fee) - (order?.discount ?? 0);
      setBill({...bill, net_amount, total_shipping_fee});
    }
    if (user?.isAuthenticated) {
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(handleConfirmClick)}>
        <>
          {!isAuthenticated && (
            <FormSignup/>
          )}

          <FormShipping/>

          <FormPaymentMethods/>

          {/* creditcard payment */}
          {parseInt(watch('payment_method'), 10) === 1 && (
            <FormCreditCard/>
          )}

          {/* kombini (cvs) payment */}
          {parseInt(watch('payment_method'), 10) === 3 && (
            <FormKombini/>
          )}

          {isAuthenticated && <FormCoupon/>}

          <FormNote/>

          <FormInvoice/>

          <OrderReview/>

          <div
            className={classes.row}
            style={{justifyContent: 'center'}}
          >
            <Grid
              container={true}
              spacing={3}
              className={classes.buttons}
            >
              <Grid
                item={true}
                sm={6}
                xs={12}
                style={{justifyContent: 'flex-end', display: 'flex'}}
              >
                <Button
                  variant='pill'
                  customColor='white'
                  customBorder='bdBlack'
                  customSize='extraLarge'
                  onClick={() => {
                    router.push('/cart');
                  }}
                  style={isMobile ? {width: '14rem', padding: '0'} : {}}
                >
                  {'カートに戻る'}
                </Button>
              </Grid>

              <Grid
                item={true}
                sm={6}
                xs={12}
              >
                <Button
                  variant='pill'
                  customColor='red'
                  customSize='extraLarge'
                  type='submit'
                  onClick={validate}
                  style={isMobile ? {width: '14rem', padding: '0'} : {}}
                  disabled={disableOrder}
                >
                  {'確認画面へ'}
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      </StyledForm>

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </FormProvider>
  );
};

export default Checkout;
