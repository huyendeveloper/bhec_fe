import {makeStyles} from '@material-ui/core';
import router from 'next/router';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue} from 'recoil';

import {AlertMessageForSection, StyledForm} from '..';
import Button from '../Button';

import FormCreditCard from './FormCreditCard';
import FormInvoice from './FormInvoice';
import FormNote from './FormNote';
import FormPaymentMethods from './FormPaymentMethods';
import FormShipping from './FormShipping';
import FormSignup from './FormSignup';
import OrderReview from './OrderReview';
import FormCoupon from './FormCoupon';

import {userState} from '~/store/userState';
import {orderState} from '~/store/orderState';

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
  const user = useRecoilValue(userState);
  const [order, setOrder] = useRecoilState(orderState);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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
    setOrder({...data, coupon_code: order?.coupon_code || '', discount: order?.discount || 0});
    router.push('/order-form/confirm');
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
            <FormSignup/>
          )}

          <FormShipping/>

          <FormPaymentMethods/>

          <FormCreditCard/>

          <FormCoupon/>

          <FormNote/>

          <FormInvoice/>

          <OrderReview/>

          <div
            className={classes.row}
            style={{justifyContent: 'center'}}
          >
            <Button
              variant='pill'
              customColor='red'
              customSize='extraLarge'
              type='submit'
            >
              {'確認画面へ'}
            </Button>
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
