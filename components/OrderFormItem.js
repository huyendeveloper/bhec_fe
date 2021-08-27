import {ErrorMessage} from '@hookform/error-message';
import {Grid, Icon, TextField, Typography, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';

import {cookieUtil} from '~/modules/cookieUtil';

const useStyles = makeStyles((theme) => ({
  centerCell: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'space-between',
    },
  },
  deleteBtn: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.red.main,
    flexDirection: 'column',
    '& .MuiSvgIcon-root': {
      height: '3rem',
    },
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    width: '58%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      width: '88%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.813rem',
      lineHeight: '1.188rem',
      fontWeight: 'normal',
      width: '100%',
    },
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    lineHeight: '1.313rem',
    height: '1.313rem',
    marginBottom: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  price: {
    fontWeight: '700',
    lineHeight: '2.25rem',
    height: '3rem',
  },
  selectBox: {
    '& .MuiInputBase-root': {
      width: '4.813rem',
      height: '3rem',
      margin: 'auto',
      background: theme.palette.white.main,
    },
    '& input[type=number]': {
      '&::-webkit-inner-spin-button,::-webkit-outer-spin-button': {
        appearance: 'none',
      },
    },
    '& input': {
      color: '#8a8a8a !important',
      padding: 'auto',
    },
  },
  selectHour: {
    background: theme.palette.white.main,
    '& .MuiInputBase-root': {
      width: '10.625rem',
      height: '3rem',
    },
    '& select': {
      border: `1px solid ${theme.palette.grey.dark} !important`,
      color: '#8a8a8a !important',
      padding: '0 0 0 1rem !important',
      height: '100%',
    },
  },
  datePicker: {
    background: theme.palette.white.main,
  },
}));

const OrderFormItem = ({data, control, errors, calculateBill}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  const handleChangeQuantity = (e) => {
    const cartItems = JSON.parse(cookieUtil.getCookie('cartItems')) || [];
    let dataUpdate = cartItems.find((item) => item.product_id === data.product_id);
    dataUpdate = {...dataUpdate, quantity_user: e.target.value};

    const index = cartItems.findIndex((item) => item.product_id === dataUpdate.product_id);
    const newCart = [...cartItems];
    newCart[index] = dataUpdate;

    cookieUtil.setCookie('cartItems', JSON.stringify(newCart));
    calculateBill();
  };

  const handleDelete = () => {
    const cartItems = JSON.parse(cookieUtil.getCookie('cartItems')) || [];

    const newCart = cartItems.filter((item) => item.product_id !== data.product_id);
    cookieUtil.setCookie('cartItems', JSON.stringify(newCart));
    calculateBill();
  };

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        spacing={3}
      >
        <Grid
          item={true}
          md={2}
          sm={3}
          xs={4}
        >
          <Image
            src={'/img/products/product-01.png'}
            width={
              // eslint-disable-next-line no-nested-ternary
              isMobile ? 87 : (isTablet ? 124 : 170)
            }
            height={
              // eslint-disable-next-line no-nested-ternary
              isMobile ? 56 : (isTablet ? 80 : 111)
            }
            layout='responsive'
            alt={'icon'}
          />
        </Grid>

        <Grid
          item={true}
          md={9}
          sm={8}
          xs={7}
        >
          <Grid
            container={true}
            spacing={3}
            style={{height: 'calc(100% + 24px)'}}
          >
            <Grid
              item={true}
              md={8}
              sm={6}
              xs={12}
              style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
            >
              <Typography
                variant={'h6'}
                className={classes.productName}
              >{data.name}</Typography>
            </Grid>

            <Grid
              item={true}
              md={2}
              sm={3}
              xs={6}
              className={classes.centerCell}
              style={{justifyContent: 'center'}}
            >
              <div className={classes.title}>{'税込価格'}</div>

              <Typography
                variant={'h5'}
                className={classes.price}
              >{currency.format(data.price)}</Typography>
            </Grid>

            <Grid
              item={true}
              md={2}
              sm={3}
              xs={6}
              className={classes.centerCell}
              style={{justifyContent: 'center'}}
            >
              <div className={classes.selectBox}>
                <div className={classes.title}>{'数量'}</div>
                <Controller
                  name={`quantity${data.product_id}`}
                  control={control}
                  defaultValue={data.quantity_user}
                  rules={{required: '必須項目です。'}}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      label={''}
                      variant='outlined'
                      error={Boolean(errors.quantity)}
                      InputLabelProps={{shrink: false}}
                      name={name}
                      value={value}
                      type={'number'}
                      InputProps={{inputProps: {min: 1, max: data.quantity}}}
                      inputRef={ref}
                      onChange={(e) => {
                        onChange(e);
                        handleChangeQuantity(e);
                      }}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name={`quantity${data.product_id}`}
                  render={({messages}) => {
                    return messages ? Object.entries(messages).map(([type, message]) => (
                      <p
                        className='inputErrorText'
                        key={type}
                      >
                        <Icon>{'warning_amber'}</Icon>
                        {message}
                      </p>
                    )) : null;
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item={true}
          md={1}
          sm={1}
          xs={1}
          className={classes.deleteBtn}
        >
          <div className={classes.title}/>

          <DeleteIcon onClick={handleDelete}/>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
          xs={12}
          className={classes.gridContainer}
          style={{justifyContent: isMobile ? 'flex-start' : 'flex-end'}}
        >
          {'お届け時間指定'}
        </Grid>

        <Grid
          item={true}
          md={4}
          sm={3}
          xs={6}
          className={classes.gridContainer}
        >
          <Controller
            name={`note${data.product_id}`}
            control={control}
            defaultValue={''}
            render={({field: {name, value, ref, onChange}}) => (
              <TextField
                label=''
                variant='outlined'
                InputLabelProps={{shrink: false}}
                name={name}
                value={value}
                onChange={onChange}
                inputRef={ref}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

OrderFormItem.propTypes = {
  data: PropTypes.object,
  control: PropTypes.any,
  errors: PropTypes.object,
  calculateBill: PropTypes.func,
};

export default OrderFormItem;
