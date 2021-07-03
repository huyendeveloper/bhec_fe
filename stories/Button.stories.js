import React from 'react';

import {Button} from '../components/BButton';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Button',
  component: Button,
};

export const PillStyle = () => (
  <Button
    pill={true}
    color='red'
  >{'オススメ商品をもっと見る'}</Button>
);
