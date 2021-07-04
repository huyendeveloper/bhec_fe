import React from 'react';

import {Icon} from '@material-ui/core';

import {Button} from '../components/Button';

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

export const ExtraLargeButton = () => (
  <Button
    pill={true}
    color='red'
    size={'extraLarge'}
  >{'オススメ商品をもっと見る'}</Button>
);

