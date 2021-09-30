import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import {ContentBlock} from '~/components';
import {ProductWidget} from '~/components/Widgets';

const useStyles = makeStyles((theme) => ({
  recommendedProducts: {
    marginTop: '2rem',
  },
  ads: {
    paddingTop: '1.25rem !important',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0.25rem !important',
    },
  },
}));

const ProductSwiperSeller = ({items, widthMedia}) => {
  const classes = useStyles();

  return (
    <ContentBlock
      bgImage='/img/noise.png'
      padding='0'
    >
      <Grid
        container={true}
        spacing={3}
        className={classes.recommendedProducts}
      >
        {items.map((product) => (
          <Grid
            key={product.id}
            item={true}
            sm={4}
            xs={12}
          >
            <ProductWidget
              data={product}
              border={'borderNone'}
              widthMedia={widthMedia}
            />
          </Grid>
        ))}
      </Grid>

    </ContentBlock>
  );
};

ProductSwiperSeller.propTypes = {
  widthMedia: PropTypes.number,
  items: PropTypes.array,
};
export default ProductSwiperSeller;
