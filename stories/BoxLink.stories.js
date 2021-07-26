import React from 'react';

import {BoxLink} from '../components/MyPage/BoxLink';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'BoxLink',
  component: BoxLink,
};

export const BoxLinkDefault = () => (
  <BoxLink
    link={{
      image: '/img/icons/list.svg',
      content: '注文確認',
      url: '/orders'
    }} />
);
