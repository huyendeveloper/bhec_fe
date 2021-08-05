import React from 'react';

import {SelectBox} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'SelectBox',
  component: SelectBox,
};

export const SelectBoxWithBorder = () => (
  <SelectBox
    variant='bordered'
    options={[
      {name: '日本語', value: 'jp'},
      {name: 'ENG', value: 'en'},
    ]}
  />
);
