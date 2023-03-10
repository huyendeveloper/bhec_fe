import {Divider, Grid, makeStyles, Typography, Dialog} from '@material-ui/core';
import router from 'next/router';

import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {find, get} from 'lodash';

import Button from '../Button';
import {AlertMessageForSection, StyledForm} from '..';

import OrderFormItem from '../OrderFormItem';

import {loadingState} from '~/store/loadingState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';
import {billState, cartState} from '~/store/cartState';
import {CommonService, OrderService, PaymentService} from '~/services';
import {format as formatNumber} from '~/lib/number';
import {order as orderConstants} from '~/constants';
import {registerPayment} from '~/pages/payment-method';

const Payment = new PaymentService();

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTypography-body1': {
      fontSize: '0.875rem',
    },
  },
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },
  infoBlockContent: {
    '& p': {
      margin: '3px 0',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8125rem',
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8125rem',
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
  totalRow: {
    margin: theme.spacing(2, 0, 4),
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
  const {net_amount, total_shipping_fee} = useRecoilValue(billState);
  const [loaded, setLoaded] = useState(false);
  const [formUnionPay, setFormUnionPay] = useState('');
  const [messageWaitPayment, setMessageWaitPayment] = useState('');

  const fetchAddressData = async () => {
    if (user?.isAuthenticated) {
      const res = order?.addressShipping ? await CommonService.getAddress(order?.addressShipping) : null;
      if (res?.address) {
        setAddressData(res.address);
      }
    } else {
      const address = user?.addresses?.find((x) => x.id === order?.addressShipping);
      setAddressData(address);
    }
  };

  const fetchCardData = async () => {
    if (user?.isAuthenticated) {
      const res = order?.creditCard ? await Payment.getDetailCard(order?.creditCard) : null;
      setCardData(res.card);
    } else {
      const card = user?.cards?.find((x) => x.id === order?.creditCard);
      setCardData(card);
    }
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(true);
    }
    fetchAddressData();
    if (parseInt(order?.payment_method, 10) === 1) {
      fetchCardData();
    }
    setLoaded(true);
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
  useEffect(() => {
    if (document.querySelector('#pay_form')) {
      setMessageWaitPayment('????????????UnionPay??????????????????????????????????????????????????????????????????????????????');
      setTimeout(() => {
        document.querySelector('#pay_form').submit();
      }, 5000);
    }
  }, [formUnionPay]);

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
    const card = user?.cards?.find((c) => String(c.id) === order?.creditCard);

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
        user: {
          email: order?.email,
          nickname: order?.nickname,
          password: order.password,
          password_confirmation: order?.confirm,
        },
      };
      if (parseInt(order?.payment_method, 10) === 1) {
        // creditcard payment
        const body = {
          card_number: card.card_number,
          token_api_key: process.env.VERITRANS_TOKEN_API,
          lang: 'en',
          security_code: card.security_code,
          card_expire: card.expiration_date,
        };
        const res = await registerPayment(body);
        orderDetails = {
          ...orderDetails,
          card: {
            expiration_date: card?.expiration_date,
            holder_name: card?.holder_name,
            req_number: card?.req_number,
            card_type: card?.card_type,
            cvc_code: card?.cvc_code,
          },
          token: res?.data?.token,
        };
      }
    }

    if (user?.isAuthenticated) {
      orderDetails = {
        ...orderDetails,
        address_id: order?.addressShipping,
        address: shippingAddress,
      };
      if (parseInt(order?.payment_method, 10) === 1) {
        // creditcard payment
        orderDetails = {
          ...orderDetails,
          card_id: order?.creditCard,
          card,
        };
      }
    }

    if (parseInt(order?.payment_method, 10) === 3) {
      // kombini payment
      orderDetails = {
        ...orderDetails,
        service_option_type: order?.service_option_type,
        phone_no: order?.phone_no,
      };
    }
    const result = await OrderService.createOrder(orderDetails);
    if (result?.union_info) {
      if (result?.union_info?.mstatus === 'success') {
        setFormUnionPay(result?.union_info?.entry_form || '');
      } else {
        setAlerts({
          type: 'error',
          message: result?.union_info?.merr_msg,
        });
      }
      setLoading(false);
    } else {
      if (result?.orders && result?.orders?.length) {
        if (!user?.isAuthenticated) {
          // remove temporarily addresses, cards
          setUser({});
        }
        setCart({items: [], seller: null});
        setOrder({
          id: result?.orders[0]?.id,
          payment_method: result?.orders[0]?.payment_method,
          order_number: result?.orders[0]?.order_number,
          kombini_info: result?.kombini_info,
          mstatus: result?.credit_card_info?.mstatus || result?.union_info?.mstatus || result?.kombini_info?.mstatus,
        });
        router.push('/order-form/successded');
      } else {
        setAlerts({
          type: 'error',
          message: result,
        });
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessageWaitPayment('');
  };

  return (
    <div className={classes.root}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(handleConfirmClick)}>
          <>
            {!isAuthenticated && (
              <div className={classes.infoBlock}>
                <Typography
                  component='h3'
                  className={classes.infoBlockTitle}
                >
                  {'??????????????????'}
                </Typography>
                <div className={classes.infoBlockContent}>
                  <Typography component='p'>
                    <span>{`????????????????????????????????? ${order?.email ?? ''}`}</span>
                  </Typography>
                  <Typography component='p'>
                    <span>{`????????????????????? ${order?.nickname ?? ''}`}</span>
                  </Typography>
                </div>
              </div>
            )}

            <div className={classes.infoBlock}>
              <Typography
                component='h3'
                className={classes.infoBlockTitle}
              >
                {'?????????????????????'}
              </Typography>

              <div className={classes.infoBlockContent}>
                <Typography component='p'>
                  <span>{`??????????????? ${addressData?.zipcode ?? ''}`}</span>
                </Typography>
                <Typography component='p'>
                  <span>{`??????????????? ${addressData?.province?.name ?? ''}`}</span>
                </Typography>
                <Typography component='p'>
                  <span>{`????????? ${addressData?.city ?? ''}${addressData?.address ?? ''}`}</span>
                </Typography>
                <Typography component='p'>
                  <span>{`?????????????????? ${addressData?.name ?? ''}???`}</span>
                </Typography>
              </div>
            </div>
            <div className={classes.infoBlock}>
              <Typography
                component='h3'
                className={classes.infoBlockTitle}
              >
                {'??????????????????'}
              </Typography>

              <div className={classes.infoBlockContent}>
                <Typography>
                  {parseInt(order?.payment_method, 10) === 1 && <Typography>{'??????????????????????????????'}</Typography>}
                  {parseInt(order?.payment_method, 10) === 2 && <Typography>{'??????????????????UnionPay?????????'}</Typography>}
                  {parseInt(order?.payment_method, 10) === 3 && <Typography>{'??????????????????'}</Typography>}
                </Typography>
              </div>
            </div>

            {cardData && parseInt(order?.payment_method, 10) === 1 &&
              <div className={classes.infoBlock}>
                <Typography
                  component='h3'
                  className={classes.infoBlockTitle}
                >
                  {'????????????????????????????????????'}
                </Typography>

                <div className={classes.infoBlockContent}>
                  <Typography component='p'>
                    <span>{`${cardData?.card_type ?? ''} ${cardData?.holder_name ?? ''} ${cardData?.req_number ?? ''}`}</span>
                  </Typography>
                </div>
              </div>
            }

            {parseInt(order?.payment_method, 10) === 3 &&
              <div className={classes.infoBlock}>
                <Typography
                  component='h3'
                  className={classes.infoBlockTitle}
                >
                  {'??????????????????????????????'}
                </Typography>

                <div className={classes.infoBlockContent}>
                  <Typography component='p'>
                    <span>{`???????????????????????? ${get(find(orderConstants.kombiniPayment, ['value', order.service_option_type]), 'label', '')}`}</span>
                  </Typography>
                  <Typography component='p'>
                    <span>{`???????????????????????? ${get(order, 'phone_no', '')}`}</span>
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
                  {'????????????'}
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
                {'????????????'}
              </Typography>

              <div className={classes.infoBlockContent}>
                {loaded && cart.items?.map((item, index) => (
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

            {loaded &&
            <div className={classes.calculatedBill}>
              <div
                className={classes.row}
              >
                <div>{'????????????'}</div>

                <b>{formatNumber(net_amount, 'currency')}</b>
              </div>

              <div
                className={classes.row}
              >
                <div>{'????????????'}</div>

                <b>{formatNumber(total_shipping_fee, 'currency')}</b>
              </div>

              <div
                className={classes.row}
              >
                <div>
                  {'???????????? '}
                  {/*{isMobile ? <br/> : null}*/}
                </div>
                <b>{`${(order?.discount > 0) ? '-' : ''}${formatNumber((order?.discount ?? 0), 'currency')}`}</b>
              </div>
            </div>
            }

            <Divider/>

            <div className={classes.totalRow}>
              <div
                className={classes.row}
              >
                <h3 style={{margin: '0'}}>{'????????????'}</h3>

                {loaded &&
                  <h1 className={classes.total}>
                    {formatNumber((net_amount + total_shipping_fee) - (order?.discount ?? 0), 'currency')}
                  </h1>
                }
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
                    customBorder='bdBlack'
                    customSize='extraLarge'
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    {'????????????????????????'}
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
                    {'?????????????????????'}
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
      <div
        dangerouslySetInnerHTML={{
          __html: formUnionPay,
        }}
      />
      {messageWaitPayment &&
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='draggable-dialog-title'
          classes={{
            root: classes.root,
          }}
        >
          <DialogTitle id='draggable-dialog-title'>
            {'??????'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {messageWaitPayment}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      }
    </div>
  );
};

export default ConfirmCheckout;
