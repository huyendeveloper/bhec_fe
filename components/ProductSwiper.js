import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import {ContentBlock, CategoryBlock} from '~/components';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {ProductService} from '~/services';

const Product = new ProductService();

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
  categoryBlock: {
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      '& .MuiGrid-container': {
        overflow: 'scroll',
        flexWrap: 'nowrap',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '& .MuiGrid-item': {
        minWidth: '16.688rem',
      },
    },
  },
}));

const ProductSwiper = ({widthMedia}) => {
  const classes = useStyles();
  const [recommendProducts, setRecommendProducts] = React.useState([]);

  const getListRecommendProducts = async () => {
    const query = {
      page: 1,
      per_page: 3,
    };
    const result = await Product.getProducts(query);
    if (result && result.products && result.products.length) {
      setRecommendProducts(result.products);
    }
  };

  React.useEffect(() => {
    getListRecommendProducts();
  }, []);

  return (
    <ContentBlock
      title={'あなたにオススメの商品'}
      bgColor='#faf6ef'
      bgImage='/img/noise.png'
    >
      <div className={classes.categoryBlock}>
        <CategoryBlock
          bgColor='transparent'
        >
          <Grid
            container={true}
            spacing={3}
            className={classes.recommendedProducts}
          >
            {recommendProducts.map((product) => (
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
        </CategoryBlock>
      </div>

      <Grid
        container={true}
        spacing={3}
        className={classes.recommendedProducts}
      >
        <Grid
          item={true}
          xs={12}
          className={classes.ads}
        >
          <AdsWidget
            imgSrc={'/img/ad/ad6.png'}
            imgWidth={'1140'}
            imgHeight={'192'}
          />
        </Grid>

        <Grid
          item={true}
          xs={12}
          className={classes.ads}
        >
          <AdsWidget
            imgSrc={'/img/ad/ad7.png'}
            imgWidth={'1140'}
            imgHeight={'192'}
          />
        </Grid>
      </Grid>
    </ContentBlock>
  );
};

ProductSwiper.propTypes = {
  widthMedia: PropTypes.number,
};
export default ProductSwiper;
