import React from 'react';

import {ReviewsBlock} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ReviewsBlock',
  component: ReviewsBlock,
};

export const ReviewsBlockDefault = () => (
  <ReviewsBlock title={'マイページ'}>
    {'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque molestias enim fugiat nostrum praesentium perferendis tenetur laborum maiores quos commodi veniam beatae, quisquam excepturi explicabo quibusdam quas laboriosam? Neque?'}
  </ReviewsBlock>
);

export const ReviewsBlockWithCustomPaddingBottom = () => (
  <ReviewsBlock
    title={'マイページ'}
    paddingBot={'10rem'}
  >
    {'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae eaque molestias enim fugiat nostrum praesentium perferendis tenetur laborum maiores quos commodi veniam beatae, quisquam excepturi explicabo quibusdam quas laboriosam? Neque?'}
  </ReviewsBlock>
);
