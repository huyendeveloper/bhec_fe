import {Container, Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import ActionButtons from './ActionButtons';
import Description from './Description';
import Meta from './Meta';
import Price from './Price';
import ProductGallery from './ProductGallery';
import Quantity from './Quantity';
import Rating from './Rating';
import SellerInfo from './SellerInfo';
import Tags from './Tags';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  productDetail: {
    padding: '0.5rem 0rem 1rem 1.5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1.438rem 0rem 1rem 0rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },

    '& .rate': {
      marginBottom: '1rem',
      [theme.breakpoints.down('xs')]: {
        marginTop: '1.438rem',
      },
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
      '& th': {
        width: '6.063rem',
        [theme.breakpoints.down('sm')]: {
          width: '6.125rem',
          fontSize: '0.813rem !important',
        },
      },
      '& td': {
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.813rem !important',
        },
      },
      '& .MuiTableCell-root': {
        borderBottom: 'none !important',
        paddingLeft: 0,
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        paddingTop: '1.25rem',
        paddingBottom: '0',
      },
      '& .MuiTableCell-root:first-child': {
        fontWeight: 'bold',
      },
    },
    '& div.add': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2.688rem 0 1rem',
    },
  },
  description: {
    backgroundColor: '#F8F8F8',
    border: '1px solid #DBDBDB',
    borderRadius: '4px',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    margin: '2rem 0',
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
      padding: '1rem',
      margin: '0.5rem 0 1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '1.5rem 0 1.5rem',
    },
  },
}));

const SingleProduct = ({getDetailProduct}) => {
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
            md={6}
          >
            <ProductGallery/>
            <Tags/>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={6}
            className={classes.productDetail}
          >
            <Rating/>

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

      <SellerInfo getDetailProduct={getDetailProduct}/>
    </>
  );
};

SingleProduct.propTypes = {
  getDetailProduct: PropTypes.func,
};

export default SingleProduct;
