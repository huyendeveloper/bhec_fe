import React from 'react';

import {Feature} from '../components/Widgets/Feature';

export const FeatureDefault = () => (
  <Feature
    title={'見つかる'}
  >
    {'自分だけの'} <br/>
    {'こだわり商品を簡単に'} <br/>
    {'見つけることができる！'}
  </Feature>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Widgets',
  component: FeatureDefault,
};

