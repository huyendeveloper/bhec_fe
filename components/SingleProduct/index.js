import {Container, Grid, makeStyles} from '@material-ui/core';
import React from 'react';

import ActionButtons from './ActionButtons';
import Description from './Description';
import Meta from './Meta';
import Price from './Price';
import ProductGallery from './ProductGallery';
import Quantity from './Quantity';
import SellerInfo from './SellerInfo';
import Tags from './Tags';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  productDetail: {
    [theme.breakpoints.down('lg')]: {
      padding: '1rem 0rem 1rem 1rem',
    },
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },

    '& .rate': {
      marginBottom: '0.5rem',
      '& span.noRating': {
        position: 'absolute',
        paddingTop: '3px',
        textDecoration: 'underline',
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
      },
    },
    '& span.price': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
    },
    '& .table': {
      maxWidth: 350,
      '& .MuiTableCell-root': {
        borderBottom: 'none !important',
        paddingLeft: 0,
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
      '& .MuiTableCell-root:first-child': {
        fontWeight: 'bold',
      },
    },
    '& div.add': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 0',
    },
  },
  description: {
    backgroundColor: '#F8F8F8',
    border: '1px solid #DBDBDB',
    borderRadius: '4px',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    [theme.breakpoints.down('lg')]: {
      margin: '3rem 0',
    },
  },
}));

const SingleProduct = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='lg'>
        <Grid
          container={true}
          spacing={0}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <Title/>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={12}
            lg={6}
          >
            <ProductGallery/>
            <Tags/>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={12}
            lg={6}
            className={classes.productDetail}
          >

            {/* eslint-disable-next-line no-warning-comments */}
            {/* TODO: not implemented yet */}
            {/* <Rating/> */}

            <Price/>

            <Quantity/>

            <Meta/>

            <ActionButtons/>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
            className={classes.description}
          >
            <Description/>

          </Grid>
        </Grid>
      </Container>

      <SellerInfo/>
    </>
  );
};

export default SingleProduct;
