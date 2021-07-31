import React from 'react';

import {Block} from '../components/MyPage/Block';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Block',
  component: Block,
};

export const BlockDefault = () => (
  <Block title={'マイページ'}>
    {'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque molestias enim fugiat nostrum praesentium perferendis tenetur laborum maiores quos commodi veniam beatae, quisquam excepturi explicabo quibusdam quas laboriosam? Neque?'}
  </Block>
);

export const BlockWithCustomPaddingBottom = () => (
  <Block title={'マイページ'} paddingBot={'10rem'}>
    {'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque molestias enim fugiat nostrum praesentium perferendis tenetur laborum maiores quos commodi veniam beatae, quisquam excepturi explicabo quibusdam quas laboriosam? Neque?'}
  </Block>
);
