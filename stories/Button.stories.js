import React from 'react';

import {Button} from '../components/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Button',
  component: Button,
};

export const PillStyle = () => (
  <Button
    variant={'pill'}
    customColor='red'
  >{'オススメ商品をもっと見る'}</Button>
);

export const ExtraLargeButton = () => (
  <Button
    variant={'pill'}
    customColor='red'
    customSize={'extraLarge'}
  >{'オススメ商品をもっと見る'}</Button>
);

