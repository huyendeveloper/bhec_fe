import React from 'react';

import { AdsWidget } from '../components/AdsWidget';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'AdsWidget',
  component: AdsWidget,
};

export const AdsWidgetDefault = () => (
  <AdsWidget
    imgSrc={'/img/ad/ad3.png'}
    imgWidth={'320'}
    imgHeight={'250'}
  />
);
