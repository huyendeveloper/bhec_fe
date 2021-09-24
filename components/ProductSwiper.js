import {Grid, makeStyles} from '@material-ui/core';
import React from 'react';

import {ContentBlock} from '~/components';
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
}));

const ProductSwiper = () => {
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
            />
          </Grid>
        ))}

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

export default ProductSwiper;
