import {makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const useStyles = makeStyles((theme) => ({
  root: {
    '& h1': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
      paddingBottom: '1rem',
    },
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: '1.25rem',
        lineHeight: '1.875rem',
      },
    },
  },
}));

const Title = () => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const productName = product?.productDetail?.name;

  return (
    <div className={classes.root}>
      <Typography
        variant='h2'
        component='h1'
      >{productName}</Typography>
    </div>
  );
};

export default Title;

