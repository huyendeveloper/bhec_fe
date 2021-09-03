import {Box} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {RatingWidget} from '../Widgets';

import {productState} from '~/store/productState';

const Rating = () => {
  const product = useRecoilValue(productState);
  const rating = product?.productDetail?.rating || 0;
  const reviewCount = product?.productDetail?.no_rating || 0;

  return (
    <Box
      component='div'
      className={'rate'}
    >
      <RatingWidget
        readOnly={true}
        rating={rating}
      />
      <span className={'noRating'}>{reviewCount}{'個の評価'}</span>
    </Box>
  );
};

export default Rating;
