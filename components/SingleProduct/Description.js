import {Box} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const Description = () => {
  const product = useRecoilValue(productState);
  const description = product?.productDetail?.description || '';

  return description.length ? (
    <Box
      component='div'
      m={4}
      dangerouslySetInnerHTML={{__html: `${description}`}}
    />
  ) : <></>;
};

export default Description;
