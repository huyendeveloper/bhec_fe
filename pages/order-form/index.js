/* eslint-disable max-lines */
/* eslint-disable no-useless-escape */
import {ErrorMessage} from '@hookform/error-message';
import {
  Checkbox,
  Divider,
  // eslint-disable-next-line no-unused-vars
  FormControl,
  FormControlLabel,
  Grid,
  // eslint-disable-next-line no-unused-vars
  InputBase,
  // eslint-disable-next-line no-unused-vars
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {getSession} from 'next-auth/client';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {BlockForm, Button, ContentBlock, DeliveryForm, OrderFormItem, StyledForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {PaymentPopup} from '~/components/Payment';
import {AdsWidget, DialogWidget, ProductWidget} from '~/components/Widgets';
import {httpStatus} from '~/constants';
import {cookieUtil} from '~/modules/cookieUtil';
import {CommonService, CartService, PaymentService, OrderService} from '~/services';

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      backgroundColor: theme.palette.white.main,
      [theme.breakpoints.down('md')]: {
        height: '2.5rem',
        boxSizing: 'border-box',
      },
    },
  },
  paragraph: {
    lineHeight: '1.375rem',
    marginBottom: '1.563rem',
    color: theme.palette.black.default,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    '& a': {
      color: theme.palette.red.main,
    },
  },
  checkBox: {
    '& .MuiFormControlLabel-label': {
      lineHeight: '1.375rem',
      fontSize: '0.875rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
    '& .Mui-checked': {
      color: theme.palette.red.main,
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0 1rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: '1.313rem',
    '& input': {
      backgroundColor: 'transparent',
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
  notification: {
    border: '1px solid ' + theme.palette.gray.main,
    height: '10rem !important',
    padding: '1rem',
    width: '100% !important',
    borderRadius: '0.25rem',
    [theme.breakpoints.down('md')]: {
      height: '7.5rem !important',
    },
    [theme.breakpoints.down('xs')]: {
      height: '9rem !important',
    },
    '&:focus': {
      outline: '2px solid #3f51b5',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
  },
  recommendedProducts: {
    marginTop: '2rem',
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
  ads: {
    paddingTop: '3rem !important',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem !important',
    },
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '100%',
      },
    },
  },
}));

// eslint-disable-next-line no-warning-comments
// TODO: get products in same category with cart item
const recommendProducts = [];

export default function OrderForm() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  // eslint-disable-next-line no-unused-vars
  const [coupon] = useState('1');
  const [issueReceipt, setIssueReceipt] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [editMode] = useState(false);
  const [editData] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isDirty, setIsDirty] = useState(false);
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  const [orderData, setOrderData] = useState({});

  const [addressList, setAddressList] = useState(null);
  const [cardList, setCardList] = useState(null);
  const [cart, setCart] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [address, setAddress] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [card, setCard] = useState(null);
  const [bill, setBill] = useState({});

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({criteriaMode: 'all'});

  useEffect(() => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);

  useEffect(() => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      // redirect page if cart is empty
      router.push('/cart');
    }
  }, [cart]);

  useEffect(() => {
    fetchData();

    const handleRouteChange = () => {
      try {
        if (isDirty && !isConfirm) {
          // eslint-disable-next-line no-alert
          const sure = window.confirm('Are you sure about that?');
          if (!sure) {
            router.events.emit('routeChangeError');
            router.replace(router, router.asPath, {shallow: true});
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-throw-literal
        throw 'Cancel redirect to new page';
      }
    };

    router.events.on('beforeHistoryChange', handleRouteChange);
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange);
    };
  }, [isConfirm]);

  const fetchData = () => {
    checkAuthenticated();
    calculateBill();
  };

  const checkAuthenticated = async () => {
    const session = await getSession();
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
      router.push('/cart');
    }

    setCart(cartItems);

    if (session && session?.accessToken) {
      setIsAuthenticated(true);
      const addresses = await CommonService.getAddress();
      setAddressList(addresses);
      fetchListCard();
      if (cartItems === []) {
        const cartDetails = await CartService.getCarts();
        cookieUtil.setCookie('cartItems', JSON.stringify(cartDetails));
        setCart(cartDetails);
      }
    } else {
      setIsAuthenticated(false);
      getLocalData();
    }
  };

  const fetchListCard = async () => {
    const res = await PaymentService.getCards();
    if (res.status === httpStatus.SUCCESS) {
      setCardList(res.data.cards);
    } else {
      setCardList([]);
    }
  };

  const getLocalData = () => {
    const addressLocal = JSON.parse(window.localStorage.getItem('address'));
    const cardLocal = JSON.parse(window.localStorage.getItem('card'));

    setAddressList([addressLocal]);
    setCardList([cardLocal]);
  };

  const handleValidation = () => {
    if (!isAuthenticated && (!address || !card)) {
      setIsValid(false);
    }
  };

  const onSubmit = (data) => {
    const cartItems = cookieUtil.getCookie('cartItems') ? JSON.parse(cookieUtil.getCookie('cartItems')) : [];
    if (cartItems.length === 0) {
      router.push('/cart');
    }

    if (!isAuthenticated && (!address || !card)) {
      return;
    }

    const newCart = [];
    cartItems.forEach((item) => {
      const cartItem = {
        product_id: item.product_id,
        quantity: item.quantity,
        note: item.note || '',
      };
      newCart.push(cartItem);
    });

    let orderDetails = {
      products: newCart,
      payment_method: data.payment_method,
      invoice_flag: data.invoice_flag ? 1 : 0,
      invoice_fullname: data.invoice_fullname,
      invoice_note: data.invoice_note,
      note: data.note,
    };

    const addressOrder = JSON.parse(window.localStorage.getItem('address'));
    const cardOrder = JSON.parse(window.localStorage.getItem('card'));

    if (!isAuthenticated) {
      orderDetails = {...orderDetails,
        user: {
          email: data.email,
          nickname: data.nickname,
          password: data.password,
          password_confirmation: data.confirm,
        },
        address: {
          province_id: addressOrder.province_id,
          name: addressOrder.name,
          zipcode: addressOrder.zipcode,
          city: addressOrder.city,
          address: addressOrder.address,
          company_name: addressOrder.company_name,
          department: addressOrder.department,
          tel: addressOrder.tel,
          province: {name: addressOrder.province.name},
        },
        card: {
          expiration_date: cardOrder.expiration_date,
          holder_name: cardOrder.holder_name,
          req_number: cardOrder.req_number,
          card_type: cardOrder.card_type,
          cvc_code: cardOrder.cvc_code,
        },
      };
    }

    if (isAuthenticated) {
      const addressDetails = addressList.find((item) => item.id === Number(data.addressShipping));
      const cardDetails = cardList.find((item) => item.id === Number(data.creditCard));
      orderDetails = {...orderDetails,
        address_id: data.addressShipping,
        card_id: data.creditCard,
        address: addressDetails,
        card: cardDetails,
      };
    }
    setOrderData(orderDetails);
    setIsConfirm(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChange = () => {
    // eslint-disable-next-line no-warning-comments
    // TODO: handle coupon change
  };

  const handleCloseDelivery = () => {
    setOpenAddAddress(false);

    if (!isAuthenticated) {
      getLocalData();
      setIsValid(true);
    }
  };

  const calculateBill = () => {
    const cartItems = getCartItems();
    const total = cartItems.reduce((totalBill, item) => totalBill + (item.quantity * item.price), 0);
    const billDetails = {
      totalBill: total,
      // eslint-disable-next-line no-warning-comments
      ship: 0, // TODO: retrieve shipping fee via API
      // eslint-disable-next-line no-warning-comments
      discount: 0, // TODO: calculate after coupon feature done
    };
    setBill(billDetails);
  };

  const handleCreateOrder = async () => {
    const result = await OrderService.createOrder(orderData);
    if (result.status === 201) {
      cookieUtil.setCookie('cartItems', []);
      router.push('/order-form/successded');
    }
  };

  const createPaymentSuccess = () => {
    fetchListCard();
    setIsValid(true);
  };

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
  };

  const getCartItems = () => {
    return cookieUtil.getCookie('cartItems') ? JSON.parse(cookieUtil.getCookie('cartItems')) : [];
  };

  return (
    <DefaultLayout title={'ご注文フォーム'}>
      <div className={classes.root}>
        <ContentBlock
          title={'ご注文フォーム'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <>
              {!isAuthenticated &&
              <BlockForm
                themeStyle={'gray'}
                title={'会員登録情報'}
              >
                <div className={classes.paragraph}>
                  {'ご注文いただくには会員登録が必要となります。'}<br/>
                  {'既にアカウントをお持ちの方は'}

                  <Link href={'/auth/login'}>
                    {'こちらからログイン'}
                  </Link>
                </div>

                <Grid
                  container={true}
                  spacing={3}
                >
                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                    className={classes.grid}
                  >
                    <label
                      htmlFor='email'
                      className='formControlLabel'
                    >
                      {'連絡先メールアドレス '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>

                    <Controller
                      name='email'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: '必須項目です。',
                        pattern: {
                          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: '無効なメールアドレスです。',
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='email'
                          variant='outlined'
                          placeholder='メールアドレス'
                          error={Boolean(errors.email)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          disabled={isConfirm}
                          onChange={onChange}
                        />
                      )}
                    />

                    <ErrorMessage
                      errors={errors}
                      name='email'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>

                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                  >
                    <label
                      htmlFor='nickname'
                      className='formControlLabel'
                    >
                      {'ニックネーム '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='nickname'
                      control={control}
                      defaultValue={''}
                      rules={{required: '必須項目です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='nickname'
                          label='おしながきサイト上で表示されます'
                          variant='outlined'
                          error={Boolean(errors.nickname)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          disabled={isConfirm}
                          onChange={onChange}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='nickname'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{`${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>

                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                  >
                    <label
                      htmlFor='password'
                      className='formControlLabel'
                    >
                      {'パスワード '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='password'
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: '必須項目です。',
                        validate: {
                          checkLength: (value) => {
                            return value.length >= 6 || '6文字以上で入力してください。';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='password'
                          label='6文字以上のパスワードをご入力ください'
                          variant='outlined'
                          error={Boolean(errors.password)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          type='password'
                          onChange={onChange}
                          disabled={isConfirm}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='password'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{`${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>

                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                  >
                    <label
                      htmlFor='confirm'
                      className='formControlLabel'
                    >
                      {'パスワード（確認）'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='confirm'
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: '必須項目です。',
                        validate: {
                          matchesPreviousPassword: (value) => {
                            const {password} = getValues();
                            return password === value || 'パスワードが一致しません。';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='confirm'
                          label=''
                          variant='outlined'
                          error={Boolean(errors.confirm)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          type='password'
                          onChange={onChange}
                          disabled={isConfirm}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='confirm'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{`${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>
                </Grid>
              </BlockForm>
              }

              <BlockForm
                themeStyle={'gray'}
                title={'お届け先の住所'}
              >
                {!isConfirm && addressList &&
                <Controller
                  name={'addressShipping'}
                  control={control}
                  defaultValue={(addressList.length > 0) ? `${addressList[0].id}` : '0'}
                  rules={{required: '必須項目です。',
                    validate: {
                      checkSelected: (value) => {
                        return value !== '0' || '必須項目です。';
                      },
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <RadioGroup
                      value={value}
                      onChange={onChange}
                      className={classes.radioGroup}
                      style={{marginBottom: '2.563rem'}}
                    >
                      {addressList.map((item, index) => (
                        <FormControlLabel
                          key={item.id}
                          value={`${item.id}`}
                          control={<Radio/>}
                          label={`住所${index + 1}  ${item.name}、${item.zipcode}、${item.province.name}${item.city}${item.address}`}
                          className={'labelRadioBtn'}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                }

                <ErrorMessage
                  errors={errors}
                  name='addressShipping'
                  render={({messages}) => {
                    return messages ? Object.entries(messages).map(([type, message]) => (
                      <p
                        className='inputErrorText'
                        key={type}
                      >
                        {message}
                      </p>
                    )) : null;
                  }}
                />

                {!isValid && !address &&
                  <p
                    className='inputErrorText'
                  >
                    {'必須項目です。'}
                  </p>
                }

                {!isConfirm &&
                <div className={classes.button}>
                  <Button
                    variant='pill'
                    customSize='extraLarge'
                    customColor='whiteRed'
                    customBorder='bdRed'
                    onClick={() => setOpenAddAddress(true)}
                  >
                    {'お届け先を登録する'}
                  </Button>
                </div>
                }

                {isConfirm &&
                  <div>{`${isAuthenticated ? `住所${orderData.address.id}  ` : ''}${orderData.address.name}、${orderData.address.zipcode}、${orderData.address.province.name}${orderData.address.city}${orderData.address.address}`}</div>
                }
              </BlockForm>

              {!isConfirm &&
              <BlockForm
                themeStyle={'gray'}
                title={'お支払い方法'}
              >
                <Controller
                  name={'payment_method'}
                  control={control}
                  defaultValue={'1'}
                  rules={{required: '必須項目です。'}}
                  render={({field: {onChange, value}}) => (
                    <RadioGroup
                      value={value}
                      onChange={onChange}
                      className={classes.radioGroup}
                      style={{marginBottom: '2.563rem'}}
                    >
                      <FormControlLabel
                        value={'1'}
                        control={<Radio/>}
                        label={'クレジットカード払い'}
                        className={'labelRadioBtn'}
                      />

                      {/* eslint-disable-next-line no-warning-comments */}
                      {/* TODO: hide not-ready-yet feature */}
                      {/* <FormControlLabel
                        value={'2'}
                        control={<Radio/>}
                        label={'UnionPay'}
                        className={'labelRadioBtn'}
                      />*/}

                      {/* eslint-disable-next-line no-warning-comments */}
                      {/* TODO: hide not-ready-yet feature */}
                      {/* <FormControlLabel
                        value={'3'}
                        control={<Radio/>}
                        label={'コンビニ払い'}
                        className={'labelRadioBtn'}
                      /> */}
                    </RadioGroup>
                  )}
                />
              </BlockForm>
              }

              <BlockForm
                themeStyle={'gray'}
                title={'お支払いクレジットカード'}
              >
                {isAuthenticated && !isConfirm && cardList &&
                <Controller
                  name={'creditCard'}
                  control={control}
                  defaultValue={(cardList.length > 0) ? `${cardList[0].id}` : '0'}
                  rules={{required: '必須項目です。',
                    validate: {
                      checkSelected: (value) => {
                        return value !== '0' || '必須項目です。';
                      },
                    },
                  }}
                  render={({field: {onChange, value}}) => (
                    <RadioGroup
                      value={value}
                      onChange={onChange}
                      className={classes.radioGroup}
                      style={{marginBottom: '2.563rem'}}
                    >
                      {cardList.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={`${item.id}`}
                          control={<Radio/>}
                          label={`${item.card_type} ${item.holder_name} ${item.req_number}`}
                          className={'labelRadioBtn'}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                }

                <ErrorMessage
                  errors={errors}
                  name='creditCard'
                  render={({messages}) => {
                    return messages ? Object.entries(messages).map(([type, message]) => (
                      <p
                        className='inputErrorText'
                        key={type}
                      >
                        {message}
                      </p>
                    )) : null;
                  }}
                />

                {!isAuthenticated && !isConfirm && card &&
                  <div>{`${card.card_type} ${card.holder_name} ${card.req_number}`}</div>
                }

                {!isValid && !card &&
                  <p
                    className='inputErrorText'
                  >
                    {'必須項目です。'}
                  </p>
                }

                {!isConfirm &&
                  <div className={classes.button}>
                    <Button
                      variant='pill'
                      customSize='extraLarge'
                      customColor='whiteRed'
                      customBorder='bdRed'
                      onClick={() => setOpenPaymentPopup(true)}
                    >
                      {'クレジットカードを登録する'}
                    </Button>
                  </div>
                }

                {isConfirm &&
                  <div>{`${orderData.card.card_type} ${orderData.card.holder_name} ${orderData.card.req_number}`}</div>
                }
              </BlockForm>

              {/* eslint-disable-next-line no-warning-comments */}
              {/* TODO: hide not-ready-yet feature */}
              {/* <BlockForm
                  themeStyle={'gray'}
                  title={'クーポン利用'}
                >
                  {!isAuthenticated &&
                  <FormControl>
                    <RadioGroup
                      name={'coupon'}
                      value={coupon}
                      onChange={handleChange}
                      className={classes.radioGroup}
                    >
                      <FormControlLabel
                        value={'1'}
                        control={<Radio/>}
                        label={'クーポン名300円3月15日まで...'}
                        className={'labelRadioBtn'}
                      />

                      <FormControlLabel
                        value={'2'}
                        control={<Radio/>}
                        label={'クーポン名5%3月15日まで'}
                        className={'labelRadioBtn'}
                      />

                      <FormControlLabel
                        value={'3'}
                        control={<Radio/>}
                        label={'クーポン名300円3月15日まで'}
                        className={'labelRadioBtn'}
                      />

                      <FormControlLabel
                        value={'4'}
                        control={<Radio/>}
                        label={'クーポン名5%3月15日まで'}
                        className={'labelRadioBtn'}
                      />
                    </RadioGroup>
                  </FormControl>
                  }

                  <Paper
                    elevation={0}
                    component='div'
                    className={classes.inputBlock}
                  >
                    <InputBase
                      className={classes.input}
                      placeholder='クーポンコード入力'
                      inputProps={{'aria-label': 'search'}}
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      size='large'
                      className={classes.btnApply}
                    >
                      {'適用'}
                    </Button>
                  </Paper>
                </BlockForm> */}

              <BlockForm
                themeStyle={'gray'}
                title={'特記事項'}
              >
                <Controller
                  name='note'
                  control={control}
                  defaultValue={''}
                  render={({field: {name, value, onChange}}) => (
                    <TextareaAutosize
                      variant='outlined'
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={classes.notification}
                      disabled={isConfirm}
                    />
                  )}
                />
              </BlockForm>

              <BlockForm
                themeStyle={'gray'}
                title={'領収書'}
              >
                {!isConfirm &&
                <>
                  <div className={classes.checkBox}>
                    <Controller
                      name='invoice_flag'
                      control={control}
                      defaultValue={issueReceipt}
                      render={({field: {onChange, value}}) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Boolean(value)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setIssueReceipt(checked);
                                onChange(checked);
                              }}
                              name='invoice_flag'
                            />
                          }
                          label='領収書の発行を希望する'
                        />
                      )}
                    />
                  </div>

                  <div className={classes.paragraph}>{'※領収書は発送完了後に別途メールで送付いたします。'}</div>
                </>
                }
                <Grid
                  container={true}
                  spacing={3}
                >
                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                  >
                    <label
                      htmlFor='invoice_fullname'
                      className='formControlLabel'
                    >
                      {'氏名 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='invoice_fullname'
                      control={control}
                      defaultValue={''}
                      rules={{validate: {required: (value) => {
                        const {invoice_flag} = getValues();
                        return (!invoice_flag || value.trim().length > 0) || '必須項目です。';
                      }}}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='invoice_fullname'
                          label='鈴木はなこ'
                          variant='outlined'
                          error={Boolean(errors.invoice_fullname)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          disabled={isConfirm}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='invoice_fullname'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{`${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>

                  <Grid
                    item={true}
                    sm={6}
                    xs={12}
                  >
                    <label
                      htmlFor='invoice_note'
                      className='formControlLabel'
                    >
                      {'但し書き'}
                    </label>
                    <Controller
                      name='invoice_note'
                      control={control}
                      defaultValue={''}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='invoice_note'
                          label='品代'
                          variant='outlined'
                          error={Boolean(errors.invoice_note)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          disabled={isConfirm}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </BlockForm>

              <BlockForm
                themeStyle={'gray'}
                title={'注文内容'}
              >
                {cart.map((item) => (
                  <OrderFormItem
                    key={item.product_id}
                    data={item}
                    control={control}
                    errors={errors}
                    setCart={setCart}
                    calculateBill={calculateBill}
                    disabled={isConfirm}
                  />
                ))}
              </BlockForm>

              <Divider/>

              <div className={classes.calculatedBill}>
                <div
                  className={classes.row}
                >
                  <div>{'商品合計'}</div>

                  <b>{currency.format(bill.totalBill)}</b>
                </div>

                <div
                  className={classes.row}
                >
                  <div>{'送料合計'}</div>

                  <b>{currency.format(bill.ship)}</b>
                </div>

                {/* eslint-disable-next-line no-warning-comments */}
                {/* TODO: hide not-ready-yet feature */}
                {/* <div
                  className={classes.row}
                >
                  <div>
                    {'クーポン '}
                    {isMobile ? <br/> : null}
                    <Link
                      href={'/'}
                    >
                      {'他のクーポンを使う'}
                    </Link>
                  </div>

                  <b>{`-${currency.format(bill.discount)}`}</b>
                </div> */}
              </div>

              <Divider/>

              <div className={classes.calculatedBill}>
                <div
                  className={classes.row}
                >
                  <h3 style={{margin: '0'}}>{'決済金額'}</h3>

                  <h1 className={classes.total}>{currency.format((bill.totalBill + bill.ship) - bill.discount)}</h1>
                </div>
              </div>

              <div
                className={classes.row}
                style={{justifyContent: 'center'}}
              >
                {!isConfirm &&
                  <Button
                    variant='pill'
                    customColor='red'
                    customSize='extraLarge'
                    type='submit'
                    onClick={handleValidation}
                  >
                    {'確認画面へ'}
                  </Button>
                }

                {isConfirm &&
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
                        onClick={() => setIsConfirm(false)}
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
                        onClick={handleCreateOrder}
                      >
                        {'送信'}
                      </Button>
                    </Grid>
                  </Grid>
                }
              </div>
            </>
          </StyledForm>
        </ContentBlock>

        {recommendProducts?.length > 0 && (
          <ContentBlock
            title={'あなたにオススメの商品'}
            bgColor='#faf6ef'
            bgImage='/img/noise.png'
          >
            <Grid
              container={true}
              spacing={3}
              className={classes.recommendedProducts}
            >
              {recommendProducts.map((product) => (
                <Grid
                  key={product.productId}
                  item={true}
                  sm={4}
                  xs={12}
                >
                  <ProductWidget
                    data={product}
                    heart={true}
                    border={'borderNone'}
                  />
                </Grid>
              ))}

              <Grid
                item={true}
                xs={12}
                className={classes.ads}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad6.png'}
                  imgWidth={'1140'}
                  imgHeight={'192'}
                />
              </Grid>

              <Grid
                item={true}
                xs={12}
                className={classes.ads}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad7.png'}
                  imgWidth={'1140'}
                  imgHeight={'192'}
                />
              </Grid>
            </Grid>

            <DialogWidget
              open={openAddAddress}
              handleClose={() => setOpenAddAddress(false)}
              size={isTablet ? 'sm' : 'md'}
              title={'新しい住所を追加する'}
            >
              <DeliveryForm
                dataEdit={editData}
                editMode={editMode}
                handleClose={handleCloseDelivery}
                fetchData={fetchData}
              />
            </DialogWidget>

            {openPaymentPopup &&
            <PaymentPopup
              open={openPaymentPopup}
              handleClose={handleClosePaymentPopup}
              style={{width: '80%'}}
              createPaymentSuccess={createPaymentSuccess}
            />
            }
          </ContentBlock>
        )}
      </div>
    </DefaultLayout>
  );
}

OrderForm.propTypes = {
};
