import {Divider, makeStyles} from '@material-ui/core';
import router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {BlockForm} from '~/components';
import ConnectForm from '~/components/ConnectForm';
import OrderFormItem from '~/components/OrderFormItem';
import {format as formatNumber} from '~/lib/number';
import {billState, cartState} from '~/store/cartState';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
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

const OrderReview = ({isReadonly}) => {
  const classes = useStyles();
  const cart = useRecoilValue(cartState);
  const {subTotal, shippingFee} = useRecoilValue(billState);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
    setLoaded(true);
    // eslint-disable-next-line
  }, []);

  return (
    <ConnectForm>
      {({control, formState: {errors}}) => {
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

                <b>{`¥${formatNumber(subTotal)}`}</b>
              </div>

              <div
                className={classes.row}
              >
                <div>{'送料合計'}</div>

                <b>{`¥${formatNumber(shippingFee)}`}</b>
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

                <h1 className={classes.total}>
                  {`¥${formatNumber(subTotal + shippingFee)}`}
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
