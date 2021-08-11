import React from 'react';

import {ReviewShop} from '~/components';

const productOwner = {
  name: '磯貝 剛',
  avatar: '/img/sellers/seller1.jpg',
  introduction: 'ベッ甲イソガイ　統括',
  rate: 3.5,
};

export const ReviewShopDefault = () => (
  <div style={{width: '80%', margin: 'auto'}}>
    <ReviewShop productOwner={productOwner}/>
  </div>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ReviewShop',
  component: ReviewShop,
};

