import React from 'react';

import {Slider} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Slider',
  component: Slider,
};

const sliderItem = [
  {
    id: 1,
    img: '/img/slider/slider.png',
  },
  {
    id: 2,
    img: '/img/slider/slider.png',
  },
];

export const SliderDefault = () => (
  <Slider data={sliderItem}/>
);
