import {useEffect, useState} from 'react';
import Image from 'next/image';
import produce from 'immer';
import {signOut} from 'next-auth/client';
import {useRouter} from 'next/router';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {Typography, Box, useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Swal from 'sweetalert2';

import {AuthService, CouponService} from '~/services';
import {userState} from '~/store/userState';
import {cartState} from '~/store/cartState';
import {userSelectedCouponState} from '~/store/couponState';
import {httpStatus} from '~/constants';
import {getErrorMessage} from '~/lib/getErrorMessage';
import {ContentBlock, AlertMessageForSection, Button} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ApplyCouponBar, CouponItem} from '~/components/Coupon';

const AuthServiceInstance = new AuthService();

const useStyles = makeStyles((theme) => ({
  couponContainer: {
    marginTop: '1rem',
  },
  loadMoreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
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

const Coupons = () => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const [user, setUser] = useRecoilState(userState);
  const cartStateData = useRecoilValue(cartState);
  const setUserSelectedCoupon = useSetRecoilState(userSelectedCouponState);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [alerts, setAlerts] = useState(null);
  const [page, setPage] = useState(1);
  const [coupons, setCoupons] = useState([]);

  // Default
  const PER_PAGE = 10;

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      fetchCoupons();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setCoupons([]);
    setUser({});
    signOut({redirect: false});
    router.push({
      pathname: 'auth/login',
    });
  };

  const fetchUserInfo = async () => {
    const response = await AuthServiceInstance.getInfoUser();
    if (!response?.user) {
      return requestLogin();
    }

    setUser(
      produce((draft) => {
        draft.profile = response?.user;
      }),
    );

    return 0;
  };

  const fetchCoupons = async (targetPage = 1) => {
    const pageQuery = targetPage !== 1 && targetPage === page ? targetPage + 1 : targetPage;

    const {haveNextPage, userCoupons, error} = await CouponService.getCoupons({
      page: pageQuery,
      per_page: PER_PAGE,
    });

    if (error) {
      fetchUserInfo();
      if (error === httpStatus.UN_AUTHORIZED) {
        requestLogin();
      }
    } else {
      setCoupons([...coupons, ...userCoupons]);
    }

    setCanLoadMore(haveNextPage);

    return 0;
  };

  const loadMoreCoupons = () => {
    fetchCoupons(page + 1);
    setPage(page + 1);
  };

  const addCouponCode = async (couponCode) => {
    const {userCoupon, error} = await CouponService.addCoupons({
      coupon_code: couponCode,
    });

    if (error) {
      fetchUserInfo();
      if (error === httpStatus.UN_AUTHORIZED) {
        requestLogin();
      }
      if (error.errorCode) {
        setAlerts({
          type: 'error',
          message: getErrorMessage(error.errorCode),
        });
      }
    } else {
      setCoupons([...coupons, userCoupon]);
      setAlerts({
        type: 'success',
        message: '入力されたクーポンは登録できました。',
      });
    }

    return 0;
  };

  const useCoupon = (coupon) => {
    if (cartStateData.items[0]) {
      setUserSelectedCoupon(coupon);
      router.push('/cart');
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
                {canLoadMore && (
                  <div className={classes.loadMoreButton}>
                    <Button
                      variant='contained'
                      size='large'
                      onClick={loadMoreCoupons}
                    >
                      {'もっと見る'}
                    </Button>
                  </div>
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
