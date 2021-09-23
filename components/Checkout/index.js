import {Grid, makeStyles} from '@material-ui/core';
import router from 'next/router';

import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {AlertMessageForSection, StyledForm} from '..';
import Button from '../Button';

import FormCreditCard from './FormCreditCard';
import FormInvoice from './FormInvoice';
import FormNote from './FormNote';
import FormPaymentMethods from './FormPaymentMethods';

import FormShipping from './FormShipping';
import FormSignup from './FormSignup';
import OrderReview from './OrderReview';

import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';
import {cartState} from '~/store/cartState';
import {OrderService} from '~/services';
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
  const {handleSubmit, ...methods} = useForm({criteriaMode: 'all'});
  const [isReadonly, setIsReadOnly] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const [order, setOrder] = useRecoilState(orderState);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const setLoading = useSetRecoilState(loadingState);

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

  const handleConfirmClick = (data) => {
    setOrder(data);
    setIsReadOnly(true);
  };

  const handleSendOrderClick = async () => {
    setLoading(true);
    const products = [];
    cart.items?.forEach((item) => {
      const product = {
        product_id: item.productDetail?.id,
        quantity: item.quantity,
        note: item.note || '',
      };
      products.push(product);
    });

    let orderDetails = {
      products,
      payment_method: order?.payment_method,
      invoice_flag: order?.invoice_flag ? 1 : 0,
      invoice_fullname: order?.invoice_fullname,
      invoice_note: order?.invoice_note,
      note: order?.note,
    };

    const shippingAddress = user.addresses?.find((a) => a.id === order?.addressShipping);
    const card = user.cards?.find((c) => c.id === order?.creditCard);

    if (!user?.isAuthenticated) {
      orderDetails = {
        ...orderDetails,
        address: {
          province_id: shippingAddress?.province_id,
          name: shippingAddress?.name,
          zipcode: shippingAddress?.zipcode,
          city: shippingAddress?.city,
          address: shippingAddress?.address,
          company_name: shippingAddress?.company_name,
          department: shippingAddress?.department,
          tel: shippingAddress?.tel,
          province: {name: shippingAddress?.province?.name},
        },
        card: {
          expiration_date: card?.expiration_date,
          holder_name: card?.holder_name,
          req_number: card?.req_number,
          card_type: card?.card_type,
          cvc_code: card?.cvc_code,
        },
        user: {
          email: order?.email,
          nickname: order?.nickname,
          password: order.password,
          password_confirmation: order?.confirm,
        },
      };
    }

    if (user?.isAuthenticated) {
      orderDetails = {
        ...orderDetails,
        address_id: order?.addressShipping,
        card_id: order?.creditCard,
        address: shippingAddress,
        card,
      };
    }

    const result = await OrderService.createOrder(orderDetails);
    if (result?.order) {
      if (!user?.isAuthenticated) {
        // remove temporarily addresses, cards
        setUser({});
      }
      setCart({items: [], seller: null});
      setOrder();

      router.push('/order-form/successded');
    } else {
      setAlerts({
        type: 'error',
        message: '注文処理が失敗しました。',
      });
    }
    setLoading(false);
  };

  React.useEffect(() => {
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
            <FormSignup isReadonly={isReadonly}/>
          )}

          <FormShipping isReadonly={isReadonly}/>

          <FormPaymentMethods isReadonly={isReadonly}/>

          <FormCreditCard isReadonly={isReadonly}/>

          {/* eslint-disable-next-line no-warning-comments */}
          {/* TODO: hide not-ready-yet feature */}
          {/* <FormCoupon isReadonly={isReadonly}/> */}

          <FormNote isReadonly={isReadonly}/>

          <FormInvoice isReadonly={isReadonly}/>

          <OrderReview isReadonly={isReadonly}/>

          <div
            className={classes.row}
            style={{justifyContent: 'center'}}
          >
            {!isReadonly &&
              <Button
                variant='pill'
                customColor='red'
                customSize='extraLarge'
                type='submit'
              >
                {'確認画面へ'}
              </Button>
            }

            {isReadonly &&
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
                    customBorder='bdGray'
                    customSize='extraLarge'
                    onClick={() => setIsReadOnly(false)}
                  >
                    {'前のページへ戻る'}
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
                    onClick={handleSendOrderClick}
                  >
                    {'送信'}
                  </Button>
                </Grid>
              </Grid>
            }
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
