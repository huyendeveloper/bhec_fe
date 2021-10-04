import {Divider, Grid, makeStyles, Typography} from '@material-ui/core';
import router from 'next/router';

import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import Button from '../Button';
import {AlertMessageForSection, StyledForm} from '..';

import FormSignup from '../Checkout/FormSignup';

import OrderFormItem from '../OrderFormItem';

import {loadingState} from '~/store/loadingState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';
import {billState, cartState} from '~/store/cartState';
import {CommonService, OrderService, PaymentService} from '~/services';
import {format as formatNumber} from '~/lib/number';

const Payment = new PaymentService();

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
  infoBlock: {
    marginBottom: '2.5rem',
  },
  infoBlockTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.5rem',
    marginBottom: '1.5rem',
  },
  infoBlockContent: {
    '& p': {
      margin: '3px 0',
    },
  },
  calculatedBill: {
    margin: '1.938rem 0',
    '& a': {
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.875rem',
      },
    },
  },
  total: {
    fontSize: '1.5rem',
    margin: '0',
  },
}));

const ConfirmCheckout = () => {
  const classes = useStyles();
  const {handleSubmit, ...methods} = useForm({criteriaMode: 'all'});
  const [user, setUser] = useRecoilState(userState);
  const [cart, setCart] = useRecoilState(cartState);
  const [order, setOrder] = useRecoilState(orderState);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setLoading = useSetRecoilState(loadingState);
  const [addressData, setAddressData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const {subTotal, shippingFee} = useRecoilValue(billState);

  const fetchAddressData = async () => {
    const res = order?.addressShipping ? await CommonService.getAddress(order?.addressShipping) : null;
    if (!res?.address) {
      router.push('/404');
    }
    if (cart.items.length === 0) {
      router.push('/cart');
    }
    setAddressData(res.address);
  };

  const fetchCardData = async () => {
    const res = order?.creditCard ? await Payment.getDetailCard(order?.creditCard) : null;
    if (!res?.card) {
      router.push('/404');
    }
    setCardData(res.card);
  };

  useEffect(() => {
    fetchAddressData();
    fetchCardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-warning-comments
  // TODO: confirm user before leaving ConfirmCheckout
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
      coupon_code: order?.coupon_code,
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
      setOrder({order_number: result?.order.order_number});

      router.push('/order-form/successded');
    } else {
      let messageError = '';
      switch (result) {
      case 1811:
        messageError = 'この数量の在庫がありません';
        break;
      case 2306:
        messageError = 'クーポンの利用期限が切れました。';
        break;
      default:
        break;
      }
      setAlerts({
        type: 'error',
        message: messageError,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
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
            <FormSignup isReadonly={true}/>
          )}

          <div className={classes.infoBlock}>
            <Typography
              component='h3'
              className={classes.infoBlockTitle}
            >
              {'お届け先の住所'}
            </Typography>

            <div className={classes.infoBlockContent}>
              <Typography component='p'>
                <span>{`郵便番号： ${addressData?.zipcode ?? ''}`}</span>
              </Typography>
              <Typography component='p'>
                <span>{`都道府県： ${addressData?.province?.name ?? ''}`}</span>
              </Typography>
              <Typography component='p'>
                <span>{`住所： ${addressData?.city ?? ''}${addressData?.address ?? ''}`}</span>
              </Typography>
              <Typography component='p'>
                <span>{`受取人氏名： ${addressData?.name ?? ''}様`}</span>
              </Typography>
            </div>
          </div>

          <div className={classes.infoBlock}>
            <Typography
              component='h3'
              className={classes.infoBlockTitle}
            >
              {'お支払い方法'}
            </Typography>

            <div className={classes.infoBlockContent}>
              <Typography>
                {parseInt(order?.payment_method, 10) === 1 && <Typography>{'クレジットカード払い'}</Typography>}
                {parseInt(order?.payment_method, 10) === 2 && <Typography>{'銀聯カード（UnionPay）払い'}</Typography>}
                {parseInt(order?.payment_method, 10) === 3 && <Typography>{'コンビニ払い'}</Typography>}
              </Typography>
            </div>
          </div>

          {cardData && parseInt(order?.payment_method, 10) === 1 &&
            <div className={classes.infoBlock}>
              <Typography
                component='h3'
                className={classes.infoBlockTitle}
              >
                {'お支払いクレジットカード'}
              </Typography>

              <div className={classes.infoBlockContent}>
                <Typography component='p'>
                  <span>{`${cardData?.card_type ?? ''} ${cardData?.holder_name ?? ''} ${cardData?.req_number ?? ''}`}</span>
                </Typography>
              </div>
            </div>
          }

          {/*<FormCoupon isReadonly={true}/>*/}

          {order?.note?.length > 0 && (
            <div className={classes.infoBlock}>
              <Typography
                component='h3'
                className={classes.infoBlockTitle}
              >
                {'特記事項'}
              </Typography>

              <div className={classes.infoBlockContent}>
                <Typography component='p'>
                  <span>{order?.note ?? ''}</span>
                </Typography>
              </div>
            </div>
          )}

          <div className={classes.infoBlock}>
            <Typography
              component='h3'
              className={classes.infoBlockTitle}
            >
              {'注文内容'}
            </Typography>

            <div className={classes.infoBlockContent}>
              {cart.items?.map((item, index) => (
                <OrderFormItem
                  key={item.productDetail?.id}
                  data={item}
                  disabled={true}
                  index={index}
                  defaultNote={item.note}
                />
              ))}
            </div>
          </div>

          <Divider/>

          <div className={classes.calculatedBill}>
            <div
              className={classes.row}
            >
              <div>{'商品合計'}</div>

              <b>{formatNumber(subTotal, 'currency')}</b>
            </div>

            <div
              className={classes.row}
            >
              <div>{'送料合計'}</div>

              <b>{formatNumber(shippingFee, 'currency')}</b>
            </div>

            <div
              className={classes.row}
            >
              <div>
                {'クーポン '}
                {/*{isMobile ? <br/> : null}*/}
              </div>
              <b>{formatNumber(-(order?.discount ?? 0), 'currency')}</b>
            </div>
          </div>

          <Divider/>

          <div className={classes.calculatedBill}>
            <div
              className={classes.row}
            >
              <h3 style={{margin: '0'}}>{'決済金額'}</h3>

              <h1 className={classes.total}>
                {formatNumber((subTotal + shippingFee) - (order?.discount ?? 0), 'currency')}
              </h1>
            </div>
          </div>

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
                  customBorder='bdGray'
                  customSize='extraLarge'
                  onClick={() => {
                    window.history.back();
                  }}
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

export default ConfirmCheckout;
