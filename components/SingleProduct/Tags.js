import {Box, Chip, makeStyles} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'normal',
    [theme.breakpoints.down('lg')]: {
      padding: '2rem 0 0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '2rem 0',
    },
    '& .MuiChip-root': {
      backgroundColor: '#FAF6EF',
      marginRight: '0.5rem',
      height: '2rem',
    },
  },
}));

const Tags = () => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const tags = product?.productDetail?.tags || [];

  return (
    <Box
      component='div'
      className={classes.root}
    >
      {tags.map((tag) => (
        <Chip
          key={tag.id ?? tag?.name}
          size='small'
          label={`#${tag.name}`}
        />
      ))
      }
    </Box>
  );
};

export default Tags;
