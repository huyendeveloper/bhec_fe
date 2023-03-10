/* eslint-disable new-cap */
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {signOut} from 'next-auth/client';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Swal from 'sweetalert2';

import {AlertMessageForSection, Button, ContentBlock, OrderItem} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {order as orderConstants} from '~/constants';
import {format as formatNumber} from '~/lib/number';
import {formatDate} from '~/lib/date';
import {OrderService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

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
      width: '9rem',
      marginLeft: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '9rem',
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
    gap: '1rem',
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
  const [alerts, setAlerts] = useState(null);

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
    setLoading(true);
    const res = await OrderService.cancelOrder(id);
    if (res && res?.data?.success) {
      setAlerts({
        type: 'success',
        message: '???????????????????????????????????????',
      });
      fetchOrder();
    } else {
      setAlerts({
        type: 'error',
        message: res,
      });
    }
    setLoading(false);
  };

  const handleCancelOrder = async () => {
    Swal.fire({
      title: '????????????????????????',
      text: '???????????????????????????????????????????????????????????????',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '??????',
      confirmButtonText: '????????????????????????',
      backdrop: true,
      customClass: {
        container: 'swal2-warning',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder();
      }
    });
  };

  return (
    <DefaultLayout title={'????????????'}>
      {isAuthenticated && order && (
        <ContentBlock
          title={'????????????'}
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
                <h4>{'????????????'}</h4>
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
                <h4>{'????????????'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
              >
                {formatDate(order?.created_at)}
              </Grid>
            </div>

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'??????????????????'}</h4>
              </Grid>
              <Grid
                item={true}
                sm={9}
                xs={8}
                className={classes.multiLine}
              >
                {order.address?.name}
                <br/>
                {`???${order.address?.zipcode}`}
                <br/>
                {order.address?.province?.name}{order.address?.city}{order.address?.address}
                <br/>
                {order.address?.apartment_number}
                {order.address?.apartment_number && <br/>}
                {order.address?.tel}
              </Grid>
            </div>

            <div className={classes.row}>
              <Grid
                item={true}
                sm={3}
                xs={4}
              >
                <h4>{'??????????????????'}</h4>
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
                  <h4>{'????????????'}</h4>
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
                <h4>{'???????????????'}</h4>
                <div className={classes.secondLevelTitle}>
                  {'???????????????'}
                  <br/>
                  {'?????????'}
                  <br/>
                  {'??????????????????'}
                  <br/>
                </div>
                <h4>{'???????????????'}</h4>
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
                  {order?.shipping_fee > 0 ? ((order?.discount > 0) ? '-' : '') + formatNumber(order?.discount ?? 0, 'currency') : '????????????'}
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
                {parseInt(order?.status ?? 0, 10) === 1 && (
                  <Button
                    className={clsx(classes.button, classes.whiteButton)}
                    onClick={handleCancelOrder}
                  >
                    {'????????????????????????'}
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
              customBorder={'bdBlack'}
              customSize={'extraLarge'}
              style={{marginRight: '1rem'}}
              onClick={() => router.push('/orders')}
            >
              {'???????????????'}
            </Button>

            {order?.invoice_flag === 1 &&
              <Button
                variant={'pill'}
                customColor={'yellow'}
                customBorder={'bdBlack'}
                customSize={'extraLarge'}
                onClick={() => exportOrder()}
              >
                {'???????????????'}
              </Button>
            }
          </div>
        </ContentBlock>
      )}
      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
};

OrdersDetail.propTypes = {
  id: PropTypes.number.isRequired,
};

export default OrdersDetail;
