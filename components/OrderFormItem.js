import {ErrorMessage} from '@hookform/error-message';
import {Card, CardActionArea, CardMedia, FormControl, Grid, IconButton, NativeSelect, Typography, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import 'date-fns';
import produce from 'immer';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';

import QuantityBox from '~/components/QuantityBox';
import {times} from '~/constants';
import {format as formatNumber} from '~/lib/number';
import {cartState} from '~/store/cartState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      background: theme.palette.white.main,
    },
  },
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
    alignItems: 'center',
    flexDirection: 'column',
    '& .MuiIconButton-label': {
      color: theme.palette.red.main,
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
    [theme.breakpoints.down('md')]: {
      height: '2rem',
    },
  },
  selectBox: {
    '& .MuiInputBase-root': {
      width: '4.813rem',
      margin: 'auto',
      background: theme.palette.white.main,
      [theme.breakpoints.down('md')]: {
        height: '2rem',
      },
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
    '& select': {
      border: 'none !important',
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
  card: {
    boxShadow: 'none',
  },
  bgImg: {
    width: 170,
    height: 112,
    objectFit: 'contain',
  },
}));

const OrderFormItem = ({data, control, errors, disabled, defaultNote}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [cart, setCart] = useRecoilState(cartState);

  const handleChangeQuantity = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity === 0) {
      handleDelete();
    } else {
      const itemIdx = cart.items.findIndex((item) => item.productDetail?.id === data.productDetail.id);
      setCart(produce((draft) => {
        draft.items[itemIdx].quantity = parseInt(event.target.value, 10);
      }));
    }
  };

  const handleChangeNote = (event) => {
    const itemIdx = cart.items.findIndex((item) => item.productDetail?.id === data.productDetail.id);
    setCart(produce((draft) => {
      draft.items[itemIdx].note = event.target.value;
    }));
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'カートから削除',
      text: 'この商品をカートから削除してもよろしいですか。',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: 'キャンセル',
      confirmButtonText: 'Ok',
      backdrop: false,
      customClass: {
        container: 'swal2-warning',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(produce((draft) => {
          // eslint-disable-next-line max-nested-callbacks
          draft.items = draft.items.filter((item) => item.productDetail?.id !== data.productDetail.id);
        }));
        if (cart.items.length === 1) {
          Router.push('/cart');
        }
      }
    });
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
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={clsx(data.productDetail.images?.length ? '' : classes.bgImg)}
                component='img'
                alt={data.productDetail.name}
                width={170}
                height={112}
                image={data.productDetail?.image_urls?.length ? data.productDetail.image_urls[0] : '/logo.png'}
                title={data.productDetail.name}
              />
            </CardActionArea>
          </Card>
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
              >{data.productDetail.name}</Typography>
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
              >{`¥${formatNumber(parseInt(data.productDetail.price, 10))}`}</Typography>
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
                <QuantityBox
                  name={`quantity${data.productDetail.id}`}
                  maximum_quantity={data?.productDetail?.maximum_quantity}
                  quantity={data?.productDetail?.quantity}
                  defaultValue={data.quantity}
                  handleChange={handleChangeQuantity}
                  disabled={disabled}
                />
                <ErrorMessage
                  errors={errors}
                  name={`quantity${data.productDetail.id}`}
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
              </div>
            </Grid>
          </Grid>
        </Grid>

        {!disabled && (
          <Grid
            item={true}
            md={1}
            sm={1}
            xs={1}
            className={classes.deleteBtn}
          >
            <IconButton
              aria-label='delete'
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </IconButton>
          </Grid>
        )}

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
          sm={4}
          xs={12}
          className={classes.gridContainer}
        >
          <Controller
            name={`product_id${data.productDetail.id}`}
            control={control}
            defaultValue={data.productDetail.id}
            render={() => (<div>{''}</div>)}
          />

          <Controller
            name={`note${data.productDetail.id}`}
            control={control}
            defaultValue={defaultNote || '指定なし'}
            render={({field: {name, value, ref, onChange}}) => (
              <FormControl>
                <NativeSelect
                  className={errors.note ? 'selectBoxError' : ''}
                  name={name}
                  value={value}
                  inputRef={ref}
                  onChange={(e) => {
                    onChange(e);
                    handleChangeNote(e);
                  }}
                  disabled={disabled}
                >
                  {times.map((time) => (
                    <option
                      key={time.value}
                      value={time.value}
                    >{time.value}</option>
                  ))}
                </NativeSelect>
              </FormControl>
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
  disabled: PropTypes.bool,
  defaultNote: PropTypes.string,
};

export default OrderFormItem;
