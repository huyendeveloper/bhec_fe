import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import PropTypes from 'prop-types';

import {ProductWidget} from '../Widgets';

const useStyles = makeStyles(() => ({

  block: {
    margin: '1rem 0',
  },

  blogImageRow: {
    width: '100%',
    height: 'auto',
  },

  product: {
    paddingRight: '1rem',
  },

  labelProduct: {
    marginTop: '0.5rem',
  },

  label: {
    fontSize: '1rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
  },
  description: {
    width: '90%',
    margin: '1rem 5% 0 5%',
  },
}));

const ArticleDetailProduct = ({id, listProducts, description}) => {
  const classes = useStyles();
  function generateProduct(products) {
    return products.map((product) =>
      (
        <Grid
          item={true}
          xs={12}
          sm={4}
          md={4}
          key={id}
          className={classes.product}
        >
          <ProductWidget
            data={product}
          />
        </Grid>
      ),
    );
  }

  return (
    <div>
      <Grid
        container={true}
        justify={'center'}
        className={classes.block}
      >
        {listProducts && listProducts.length && generateProduct(listProducts)}
        <Grid
          item={true}
          xs={12}
        >
          <div className={classes.description}>{description}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ArticleDetailProduct.propTypes = {
  id: PropTypes.number,
  listProducts: PropTypes.array,
  description: PropTypes.string,
};

export default ArticleDetailProduct;
