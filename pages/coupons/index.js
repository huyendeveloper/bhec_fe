import {Box, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {makeStyles} from '@material-ui/core/styles';
import {signOut} from 'next-auth/client';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import {AlertMessageForSection, ContentBlock} from '~/components';
import {ApplyCouponBar, CouponItem} from '~/components/Coupon';
import {DefaultLayout} from '~/components/Layouts';
import {getErrorMessage} from '~/lib/getErrorMessage';
import {CouponService} from '~/services';
import {cartState} from '~/store/cartState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';

const useStyles = makeStyles((theme) => ({
  couponContainer: {
    marginTop: '1rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem 0',
    [theme.breakpoints.down('md')]: {
      margin: '1.5rem 0',
    },
    '& .MuiButtonBase-root': {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      border: '1px solid ' + theme.palette.grey.dark,
      margin: '0 0.5rem',
      background: theme.palette.white.main,
      fontWeight: '700',
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      '&:hover': {
        background: theme.palette.red.main,
        borderColor: theme.palette.red.main,
        color: theme.palette.white.main,
      },
      [theme.breakpoints.down('md')]: {
        width: '2.5rem',
        height: '2.5rem',
        margin: '0 0.25rem',
        fontSize: '0.875rem',
      },
    },
    '& .Mui-selected': {
      background: theme.palette.red.main,
      borderColor: theme.palette.red.main,
      color: theme.palette.white.main,
    },
  },
  textCouponNull: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    color: theme.palette.black4.main,
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      marginTop: '1rem',
    },
  },
}));

// Default
const PER_PAGE = 10;

const Coupons = ({queryParams}) => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useRecoilState(userState);
  const cartStateData = useRecoilValue(cartState);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [alerts, setAlerts] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [order, setOrder] = useRecoilState(orderState);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      setCurrentPage(queryParams?.page ?? 0);
      fetchCoupons();
    } else {
      requestLogin();
    }
  }, [queryParams]);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const fetchCoupons = async () => {
    const payload = {
      page: queryParams?.page ?? 1,
      per_page: queryParams?.per_page ?? 10,
      order_by: 'id',
      order: 'desc',
    };

    const {page, pages, userCoupons, error} = await CouponService.getCoupons(payload);

    if (error) {
      if (error.errorCode) {
        setAlerts({
          type: 'error',
          message: getErrorMessage(error.errorCode),
        });
      }
    } else {
      setCoupons(userCoupons);
    }

    setCurrentPage(page ?? 0);
    setCountPages(pages ?? 0);

    return userCoupons;
  };

  const changePageCoupons = (_, pageNumber) => {
    router.push({
      pathname: '/coupons',
      query: {...router.query, page: pageNumber},
    });
  };

  const addCouponCode = async (couponCode) => {
    const {userCoupon, error} = await CouponService.addCoupons({
      coupon_code: couponCode,
    });

    if (error) {
      if (error.errorCode) {
        setAlerts({
          type: 'error',
          message: getErrorMessage(error.errorCode),
        });
      }
    } else {
      setAlerts({
        type: 'success',
        message: '入力されたクーポンは登録できました。',
      });
      router.push({
        pathname: '/coupons',
        query: {...router.query, page: 1},
      });
    }

    return userCoupon;
  };

  const useCoupon = (coupon) => {
    if (cartStateData.items[0]) {
      setOrder({...order, coupon_code: coupon?.coupon?.code});
      router.push('/order-form');
    } else {
      Swal.fire({
        title: 'まず商品をカートに入れてください',
        html: 'カートに商品はありません。<br />このクーポンを使うにはまず商品をカートに入れてください',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '閉じる',
        confirmButtonText: '商品一覧画面へ',
        backdrop: true,
        customClass: {
          container: 'swal2-warning',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/products');
        }
      });
    }
  };

  const renderCouponList = () => {
    const numberOfCoupons = coupons.length;
    const isNotLastItem = (i) => i !== numberOfCoupons - 1;
    return coupons.map((coupon, index) => (
      <CouponItem
        key={index}
        coupon={coupon}
        handleSubmit={useCoupon}
        haveBottomBorder={isNotLastItem(index)}
      />
    ));
  };

  return (
    <DefaultLayout title={'クーポン一覧'}>
      {isAuthenticated && (
        <ContentBlock
          title={'クーポン一覧'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          <ApplyCouponBar handleSubmit={(couponCode) => addCouponCode(couponCode)}/>
          {coupons?.[0] ? (
            <>
              <div className={classes.couponContainer}>
                {renderCouponList()}

                {coupons?.length > 0 && currentPage > 0 && (
                  <Pagination
                    count={countPages}
                    page={currentPage}
                    variant={'outlined'}
                    color={'primary'}
                    size={'large'}
                    defaultPage={1}
                    onChange={changePageCoupons}
                    className={classes.pagination}
                  />
                )}
              </div>
            </>
          ) : (
            <Box
              textAlign='center'
              mt={4}
              mb={-4}
            >
              <Image
                src={'/img/coupons/coupon-empty.png'}
                width={isTablet ? 100.65 : 161}
                height={isTablet ? 200 : 320}
                alt={'クーポン画像'}
              />
              <Typography
                component='h3'
                align='center'
                className={classes.textCouponNull}
              >
                {'クーポンはありません。'}
              </Typography>
            </Box>
          )}
        </ContentBlock>
      )}
      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
};

export default Coupons;

Coupons.propTypes = {
  queryParams: PropTypes.object.isRequired,
};

export async function getServerSideProps({query}) {
  const queryParams = {...query, page: Number(query?.page ?? 1), per_page: PER_PAGE};

  return {
    props: {
      queryParams,
    },
  };
}
