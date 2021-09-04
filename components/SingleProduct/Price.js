import {Box} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {format as formatNumber} from '~/lib/number';
import {productState} from '~/store/productState';

const Price = () => {
  const product = useRecoilValue(productState);
  const price = product?.productDetail?.price || 0;

  return (
    <Box
      component='div'
    >
      <span className={'price'}>{`¥ ${formatNumber(parseInt(price, 10))}`}</span>
      <span>{'（税込 / 送料別）'}</span>
    </Box>
  );
};

export default Price;
