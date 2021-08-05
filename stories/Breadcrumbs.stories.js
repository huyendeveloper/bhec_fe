import React from 'react';

import {Breadcrumbs} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
};

const linkProps = [
  {
    linkLabel: 'パンクズ',
    linkUrl: '/',
  },
  {
    linkLabel: 'パンクズ',
    linkUrl: '/',
  },
  {
    linkLabel: 'パンクズ',
  },
];

export const BreadcrumbsDefault = () => (
  <Breadcrumbs linkProps={linkProps}/>
);
