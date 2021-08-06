import React from 'react';

import {OrderItem} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'OrderItem',
  component: OrderItem,
};

const paidItem =
{
  productId: 2,
  name: '『大好評』小田原漆器についてご紹介しています。',
  image: '/img/products/product-02.png',
  url: '#',
  tags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
  price: 26600,
  owner: {
    id: 3217,
    name: '小田原漆器',
    avatar: '/img/sellers/seller-02.png',
    introduction: '木地部門　伝統工芸士',
  },
  quantity: 20,
  trackingNum: '01234567980',
  transportType: 'ヤマト運輸',
  status: 0,
};

const shippedItem = {
  productId: 2,
  name: '『大好評』小田原漆器についてご紹介しています。',
  image: '/img/products/product-02.png',
  url: '#',
  tags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
  price: 26600,
  owner: {
    id: 3217,
    name: '小田原漆器',
    avatar: '/img/sellers/seller-02.png',
    introduction: '木地部門　伝統工芸士',
  },
  quantity: 20,
  trackingNum: '01234567980',
  transportType: 'ヤマト運輸',
  status: 2,
};
export const PaidOrder = () => (
  <OrderItem
    data={paidItem}
  />
);

export const ShippedOrder = () => (
  <OrderItem
    data={shippedItem}
  />
);
