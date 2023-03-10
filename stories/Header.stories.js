import React from 'react';

import {Header} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Header',
  component: Header,
};

export const FixedHeaderWithoutMenu = () => (
  <Header showMainMenu={false}/>
);
