import React from 'react';

import {ProductWidget, FeatureWidget} from '~/components/Widgets';

export const FeatureDefault = () => (
  <FeatureWidget title='見つかる'>
    {'自分だけの'} <br/>
    {'こだわり商品を簡単に'} <br/>
    {'見つけることができる！'}
  </FeatureWidget>
);

export const ProductListItem = () => (
  <ProductWidget
    data={{
      productId: 1,
      productName: '『大好評』小田原漆器についてご紹介しています。',
      productThumb: '/img/products/product-01.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
      productPrice: 26600,
      seller_info: {
        name: '小田原漆器',
        avatar: '/img/sellers/seller-01.png',
        introduction: '木地部門　伝統工芸士',
      },
    }}
  />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Widgets',
  component: FeatureDefault,
};

