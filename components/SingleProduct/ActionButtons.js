import {Box} from '@material-ui/core';
import Image from 'next/image';
import React, {useState, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {makeStyles} from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import produce from 'immer';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';

import Button from '../Button';
import {AlertMessageForSection} from '..';

import {cartState} from '~/store/cartState';
import {productState} from '~/store/productState';
import {userState} from '~/store/userState';
import {loadingState} from '~/store/loadingState';
import {ProductService} from '~/services';

const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '1.438rem',
      borderBottom: `1px solid ${theme.palette.gray.main}`,
    },
  },
  btnBuyNow: {
    '& button': {
      height: '3rem',
      [theme.breakpoints.down('sm')]: {
        height: '2.5rem',
      },
    },
  },
}));

const ActionButtons = ({isPreview}) => {
  const classes = useStyles();
  const [cart, setCart] = useRecoilState(cartState);
  const [product, setProduct] = useRecoilState(productState);
  const [alerts, setAlerts] = useState(null);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);
  const [maximumQuantity, setMaximumQuantity] = useState(0);

  const isOutStock = !(product?.productDetail?.quantity > 0);

  const addToCart = () => {
    if ((product.quantity ?? 0) === 0) {
      setAlerts({
        type: 'warning',
        message: '購入する商品の数を選択してください。',
      });
      return false;
    }

    const enoughStock = product?.quantity <= maximumQuantity;

    if (cart.items?.length === 0) {
      setCart(produce((draft) => {
        draft.items = [{...product, enoughStock}];
        draft.seller = product.sellerInfo;
      }));
    } else if (cart.items?.length > 0) {
      const items = [...cart.items];
      const isExisting = items.findIndex((item) => item.productDetail?.id === product.productDetail?.id);

      // if (cart.seller?.id !== product.sellerInfo.id) {
      //   setAlerts({
      //     type: 'warning',
      //     message: 'カートに他の出品者からの商品があります。',
      //   });
      //   return false;
      // } else
      if (isExisting >= 0) {
        setCart(produce((draft) => {
          draft.items[isExisting].quantity += parseInt(product.quantity, 10);
          draft.items[isExisting].enoughStock = (draft.items[isExisting].quantity + parseInt(product.quantity, 10)) <= maximumQuantity;
        }));
      } else {
        setCart(produce((draft) => {
          draft.items.push({...product, enoughStock});
        }));
      }
    }
    return true;
  };

  const handleAddToCartClick = () => {
    if (isPreview) {
      return;
    }
    if (addToCart()) {
      router.push('/cart');
    }
  };

  const handleInstantBuyClick = () => {
    if (isPreview) {
      return;
    }
    if (addToCart()) {
      router.push('/order-form');
    }
  };

  const handleLikeProduct = async (likeStatus) => {
    if (isPreview) {
      return;
    }
    let isAuthenticated = user?.isAuthenticated;
    if (isAuthenticated) {
      setLoading(true);
      const res = likeStatus ? await Product.likeProduct(product?.productDetail?.id) : await Product.unlikeProduct(product?.productDetail?.id);
      if (res && (res?.message === 'You have unliked this product' || res?.message === 'You have liked this product')) {
        const productDetail = {...product.productDetail, is_favorite_product: !product.productDetail.is_favorite_product};
        setProduct((oldValue) => ({
          ...oldValue,
          productDetail,
        }));
      } else {
        isAuthenticated = false;
      }
      setLoading(false);
    }
    if (!isAuthenticated) {
      Swal.fire({
        title: '登録・ログインが必要です。',
        text: ' ',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '閉じる',
        confirmButtonText: '登録・ログインへ',
        backdrop: true,
        customClass: {
          container: 'swal2-warning',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/auth/login');
        }
      });
    }
  };

  useEffect(() => {
    setMaximumQuantity(product?.productDetail?.maximum_quantity > product?.productDetail?.quantity ? product?.productDetail?.quantity : (product?.productDetail?.maximum_quantity || product?.productDetail?.quantity));
  }, [product]);

  return (
    <div className={classes.root}>
      <Box
        component='div'
        className={'add'}
      >
        <Button
          variant='contained'
          customColor='green'
          customSize='medium'
          startIcon={
            <Image
              src={'/img/icons/cart.svg'}
              width={24}
              height={24}
              alt={'cart'}
            />}
          onClick={handleAddToCartClick}
          disabled={(isPreview ? false : isOutStock) || (product?.quantity > maximumQuantity)}
        >
          {'カートに入れる'}
        </Button>

        <Button
          variant='contained'
          customColor='whiteRed'
          customSize='medium'
          customBorder='bdRed'
          onClick={() => handleLikeProduct(!product?.productDetail?.is_favorite_product)}
          // eslint-disable-next-line
          startIcon={product?.productDetail?.is_favorite_product ?
            // eslint-disable-next-line
            <Image
              src={'/img/icons/heart_fill.svg'}
              width={24}
              height={24}
              alt={'heart'}
            /> :
            <Image
              src={'/img/icons/heart_line.svg'}
              width={24}
              height={24}
              alt={'heart'}
            />
          }
        >
          {'お気に入り'}
        </Button>
      </Box>

      <Box
        component='div'
        className={classes.btnBuyNow}
      >
        <Button
          customColor='red'
          customSize='medium'
          customWidth='fullwidth'
          onClick={handleInstantBuyClick}
          startIcon={
            <Image
              src={'/img/icons/click.svg'}
              width={32}
              height={32}
              alt={'touch'}
            />}
          disabled={isPreview ? false : isOutStock}
        >
          {'今すぐ購入する'}
        </Button>
      </Box>

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </div>
  );
};

ActionButtons.propTypes = {
  isPreview: PropTypes.boolean,
};

ActionButtons.defaultProps = {
  isPreview: false,
};

export default ActionButtons;
