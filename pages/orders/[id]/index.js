/* eslint-disable new-cap */
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';
import clsx from 'clsx';

import {OrderService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';
import {Button, ContentBlock, OrderItem} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {order as orderConstants} from '~/constants';
import {format as formatNumber} from '~/lib/number';

const useStyles = makeStyles((theme) => ({
  row: {
    width: '100%',
    display: 'flex',
    padding: '0.688rem 0',
    borderBottom: '1px solid #DBDBDB',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: theme.palette.black.light,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
    },
    '& h4': {
      margin: '0rem',
    },
  },
  button: {
    width: '10.625rem',
    height: '2.5rem',
    border: 'none',
    background: theme.palette.yellow.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.875rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginLeft: '1.5rem',
    borderRadius: '0.25rem',
    color: theme.palette.white.main,
    [theme.breakpoints.down('md')]: {
      width: '8rem',
      marginLeft: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '6rem',
      margin: '0 0 1rem',
    },
  },
  secondLevelTitle: {
    marginLeft: '1.5rem',
    lineHeight: '1.938rem',
  },
  multiLine: {
    lineHeight: '1.938rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'column',
      width: '100%',
    },
  },
  whiteButton: {
    background: theme.palette.white.main,
    border: '1px solid ' + theme.border.default,
    color: theme.palette.black.light,
  },
  orderDetail: {
    marginBottom: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnToOrderList: {
    marginRight: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },
  btnExport: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem',
    },
  },
}));

export async function getServerSideProps({params}) {
  const {id} = params;
  return {
    props: {id},
  };
}

const OrdersDetail = ({id}) => {
  const classes = useStyles();
  const router = useRouter();

  const [order, setOrder] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      setLoading(true);
      fetchOrder().finally(() => setLoading(false));
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const fetchOrder = async () => {
    const response = await OrderService.getOrderDetail(id);
    setOrder(response?.order);
  };

  const exportOrder = async () => {
    setLoading(true);
    const response = await OrderService.exportOrderPdf(order.order_number);
    if (response && response.url) {
      setLoading(false);
      window.open(response.url, '_blank');
    }
  };

  const cancelOrder = async () => {
    // eslint-disable-next-line no-warning-comments
    // TODO: confirm user before cancelling order
  };

  return (
    <DefaultLayout title={'注文詳細'}>
      {isAuthenticated && order && (
        <ContentBlock
          title={'注文詳細'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          paddingBot={'1.438rem'}
        >
          <Grid
            container={true}
            spacing={0}
            className={classes.orderDetail}
          >
            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'注文番号'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
              >
                {order?.order_number}
              </Grid>
            </div>

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'注文日時'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
              >
                {order?.created_at}
              </Grid>
            </div>

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'お届け先住所'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
                className={classes.multiLine}
              >
                {order.address?.name}
                <br/>
                {order.address?.zipcode}
                <br/>
                {order.address?.city}
                {order.address?.address}
                <br/>
                {order.address?.company_name}&nbsp;&nbsp;{order.address?.department}
                <br/>
                {order.address?.tel}
              </Grid>
            </div>

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'お支払い方法'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
              >
                {orderConstants.paymentMethods.find((p) => p.id === order?.payment_method)?.label}
              </Grid>
            </div>

            {order.admin_note?.length > 0 && (
              <div className={classes.row}>
                <Grid
                  item={true}
                  sm={3}
                  xs={4}
                >
                  <h4>{'配送情報'}</h4>
                </Grid>
                <Grid
                  item={true}
                  sm={9}
                  xs={8}
                />
              </div>
            )}

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'購入明細書'}</h4>
                <div className={classes.secondLevelTitle}>
                  {'商品の小計'}
                  <br/>
                  {'配送料'}
                  <br/>
                  {'クーポン利用'}
                  <br/>
                </div>
                <h4>{'ご請求金額'}</h4>
              </Grid>

              <Grid
                item={true}
                sm={4}
                xs={4}
              >
                <br/>
                <div className={classes.multiLine}>
                  {formatNumber(order?.net_amount ?? 0, 'currency')}
                  <br/>
                  {formatNumber(order?.shipping_fee ?? 0, 'currency')}
                  <br/>
                  {order?.shipping_fee > 0 ? formatNumber(order?.discount ?? 0, 'currency') : '割引無し'}
                  <br/>
                </div>
                <h4>{formatNumber(order?.total_amount ?? 0, 'currency')}</h4>
              </Grid>

              <Grid
                item={true}
                sm={5}
                xs={4}
                className={classes.buttons}
              >
                {parseInt(order?.invoice_flag ?? 0, 10) === 1 && (
                  <Button
                    className={clsx(classes.button, classes.whiteButton)}
                    onClick={exportOrder}
                  >
                    {'領収書発行'}
                  </Button>
                )}

                {parseInt(order?.status ?? 0, 10) === 1 && (
                  <Button
                    className={clsx(classes.button, classes.whiteButton)}
                    onClick={cancelOrder}
                  >
                    {'注文をキャンセル'}
                  </Button>
                )}
              </Grid>
            </div>
          </Grid>

          {order?.cart?.cart_items?.map((item) => (
            <OrderItem
              key={`orderDetail-${item.id}`}
              item={item}
              status={order?.status}
            />
          ))}

          <div className={classes.actionButtons}>
            <Button
              variant={'pill'}
              customColor={'white'}
              customBorder={'bdGray'}
              customSize={'extraLarge'}
              style={{marginRight: '1rem'}}
              onClick={() => router.push('/orders')}
            >
              {'注文一覧へ'}
            </Button>
          </div>
        </ContentBlock>
      )}
    </DefaultLayout>
  );
};

OrdersDetail.propTypes = {
  id: PropTypes.number.isRequired,
};

export default OrdersDetail;
