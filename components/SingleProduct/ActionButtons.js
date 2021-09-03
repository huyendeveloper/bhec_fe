import {Box} from '@material-ui/core';
import Image from 'next/image';
import React, {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import produce from 'immer';

import {useRouter} from 'next/router';

import Button from '../Button';

import {AlertMessageForSection} from '..';

import {cartState} from '~/store/cartState';
import {productState} from '~/store/productState';

const ActionButtons = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const product = useRecoilValue(productState);
  const [alerts, setAlerts] = useState(null);
  const router = useRouter();

  const addToCart = () => {
    if ((product.quantity ?? 0) === 0) {
      setAlerts({
        type: 'warning',
        message: '購入する商品の数を選択してください。',
      });
      return false;
    }

    if (cart.items?.length === 0) {
      setCart(produce((draft) => {
        draft.items = [product];
        draft.seller = product.sellerInfo;
      }));
    } else if (cart.items?.length > 0) {
      const items = [...cart.items];
      const isExisting = items.findIndex((item) => item.productDetail?.id === product.productDetail?.id);

      if (cart.seller?.id !== product.sellerInfo.id) {
        setAlerts({
          type: 'warning',
          message: 'カートに他の出品者からの商品があります。',
        });
        return false;
      } else if (isExisting >= 0) {
        setCart(produce((draft) => {
          draft.items[isExisting].quantity += parseInt(product.quantity, 10);
        }));
      } else {
        setCart(produce((draft) => {
          draft.items.push(product);
        }));
      }
    }
    return true;
  };

  const handleAddToCartClick = () => {
    if (addToCart()) {
      router.push('/cart');
    }
  };

  const handleInstantBuyClick = () => {
    if (addToCart()) {
      router.push('/order-form');
    }
  };

  return (
    <>
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
        >
          {'カートに入れる'}
        </Button>

        {/* eslint-disable-next-line no-warning-comments */}
        {/* TODO: not implemented yet */}
        {/* <Button
          variant='contained'
          customColor='whiteRed'
          customSize='medium'
          customBorder='bdRed'
          startIcon={
            <Image
              src={'/img/icons/heart_line.svg'}
              width={24}
              height={24}
              alt={'heart'}
            />}
        >
          {'お気に入り'}
        </Button> */}
      </Box>

      <Box
        component='div'
      >
        <Button
          customColor='red'
          customSize='medium'
          customWidth='fullwidth'
          onClick={handleInstantBuyClick}
          startIcon={
            <Image
              src={'/img/icons/click.svg'}
              width={24}
              height={26}
              alt={'touch'}
            />}
        >
          {'今すぐ購入する'}
        </Button>
      </Box>

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </>
  );
};

export default ActionButtons;
