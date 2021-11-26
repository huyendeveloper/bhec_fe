import {Divider, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';

import {BlockForm} from '~/components';
import ConnectForm from '~/components/ConnectForm';
import OrderFormItem from '~/components/OrderFormItem';
import {format as formatNumber} from '~/lib/number';
import {billState, cartState} from '~/store/cartState';
import {orderState} from '~/store/orderState';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
  },
  calculatedBill: {
    margin: '1.938rem 0',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.875rem',
    },
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

const OrderReview = ({isReadonly}) => {
  const classes = useStyles();
  const theme = useTheme();
  const cart = useRecoilValue(cartState);
  const {net_amount, total_shipping_fee} = useRecoilValue(billState);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const order = useRecoilValue(orderState);

  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
    setLoaded(true);
    // eslint-disable-next-line
  }, []);

  return (
    <ConnectForm>
      {({control, formState: {errors}, setValue}) => {
        return (loaded &&
          <>
            <BlockForm
              themeStyle={'gray'}
              title={'注文内容'}
            >
              {cart.items?.map((item, index) => (
                <OrderFormItem
                  key={item.productDetail?.id}
                  data={item}
                  control={control}
                  errors={errors}
                  disabled={isReadonly}
                  index={index}
                  defaultNote={item.note}
                />
              ))}
            </BlockForm>

            <Divider/>

            <div className={classes.calculatedBill}>
              <div
                className={classes.row}
              >
                <div>{'商品合計'}</div>

                <b>{formatNumber(net_amount, 'currency')}</b>
              </div>

              <div
                className={classes.row}
              >
                <div>{'送料合計'}</div>

                <b>{formatNumber(total_shipping_fee, 'currency')}</b>
              </div>

              <div
                className={classes.row}
              >
                <div>
                  {'クーポン '}
                  {isMobile ? <br/> : null}
                  <Link
                    href={'#coupon'}
                  >
                    <a onClick={() => setValue('couponCode', '')}>{'他のクーポンを使う'}</a>
                  </Link>
                </div>
                <b>{`${(order?.discount > 0) ? '-' : ''}${formatNumber((order?.discount ?? 0), 'currency')}`}</b>
              </div>
            </div>

            <Divider/>

            <div className={classes.calculatedBill}>
              <div
                className={classes.row}
              >
                <h3 style={{margin: '0'}}>{'決済金額'}</h3>

                <h1 className={classes.total}>
                  {formatNumber((net_amount + total_shipping_fee) - (order?.discount ?? 0), 'currency')}
                </h1>
              </div>
            </div>
          </>
        );
      }}
    </ConnectForm>
  );
};

export default OrderReview;

OrderReview.propTypes = {
  isReadonly: PropTypes.bool,
};

OrderReview.defaultProps = {
  isReadonly: false,
};
