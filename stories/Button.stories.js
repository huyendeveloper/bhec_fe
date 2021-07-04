import React from 'react';

import {Button} from '../components/Button';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Button',
  component: Button,
};

export const PillStyle = () => (
  <Button
    pill={true}
    custom_color='red'
  >{'オススメ商品をもっと見る'}</Button>
);

export const ExtraLargeButton = () => (
  <Button
    pill={true}
    custom_color='red'
    custom_size={'extraLarge'}
  >{'オススメ商品をもっと見る'}</Button>
);

