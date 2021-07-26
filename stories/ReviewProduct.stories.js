import React from 'react';

import {ReviewProduct} from '../components/Review';

const product = {
  productId: 2,
  productName: '『大好評』江戸べっ甲についてご紹介しています。',
  productThumb: '/img/products/product-02.png',
  productUrl: '#',
  productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
  productPrice: 32800,
  productRate: 3.5,
  productOwner: {
    name: '磯貝 剛',
    avatar: '/img/sellers/seller1.jpg',
    introduction: 'ベッ甲イソガイ　統括',
    rate: 3.5,
},
}

export const ReviewProductDefault = () => (
  <div style={{width: '80%', margin: 'auto'}}>
    <ReviewProduct product={product} />
  </div>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ReviewProduct',
  component: ReviewProduct,
};

