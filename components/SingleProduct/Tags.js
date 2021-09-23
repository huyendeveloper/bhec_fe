import {Box, Chip, makeStyles} from '@material-ui/core';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'normal',
    padding: '2rem 0 0',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      padding: '1rem 0 1.5rem',
      borderBottom: `1px solid ${theme.palette.gray.main}`,
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
