import React from 'react';

import {Box} from '@material-ui/core';

import {ContentBlock} from '../components/ContentBlock';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ContentBlock',
  component: ContentBlock,
};

export const ContentBlockWithBgColor = () => (
  <ContentBlock
    title='おしながきの特徴'
    bgColor='lightGreen'
    description={'生産者から直送！新鮮で厳選された商品をお届けするのは今や当たり前！\n' +
    'おしながきではこんな特徴があります'}
  >
    <Box
      textAlign='center'
      py={5}
    >{'Example Content Here...'}</Box>
  </ContentBlock>
);
