import {
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';

import {Checkout, ContentBlock} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import {ProductService} from '~/services';

const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      backgroundColor: theme.palette.white.main,
    },
    '& .MuiInputLabel-formControl': {
      [theme.breakpoints.down('md')]: {
        top: '-0.25rem',
      },
    },
    '& .MuiInput-underline': {
      [theme.breakpoints.down('md')]: {
        height: '2.5rem',
      },
    },
  },
  paragraph: {
    lineHeight: '1.375rem',
    marginBottom: '1.563rem',
    color: theme.palette.black.default,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    '& a': {
      color: theme.palette.red.main,
    },
  },
  checkBox: {
    '& .MuiFormControlLabel-label': {
      lineHeight: '1.375rem',
      fontSize: '0.875rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
    '& .Mui-checked': {
      color: theme.palette.red.main,
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0 1rem',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: '1.313rem',
    '& input': {
      backgroundColor: 'transparent',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      color: '#8A8A8A',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.688rem',
        lineHeight: '1.031rem',
      },
    },
  },
  btnApply: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.black.light,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: '6.063rem',
    height: '3rem',
    position: 'absolute',
    right: '-1px',
    fontWeight: '700',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '6.25rem',
      height: '2.5rem',
      fontSize: '0.813rem',
    },
  },
  inputBlock: {
    margin: '2.5rem 0 1rem',
    display: 'flex',
    alignItems: 'center',
    width: '22.75rem',
    height: '3rem',
    border: `1px solid ${theme.border.default}`,
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '21.75rem',
      height: '2.5rem',
    },
  },
  notification: {
    border: '1px solid ' + theme.palette.gray.main,
    height: '10rem !important',
    padding: '1rem',
    width: '100% !important',
    borderRadius: '0.25rem',
    [theme.breakpoints.down('md')]: {
      height: '7.5rem !important',
    },
    [theme.breakpoints.down('xs')]: {
      height: '9rem !important',
    },
    '&:focus': {
      outline: '2px solid #3f51b5',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
  },
  recommendedProducts: {
    marginTop: '2rem',
  },
  radioGroup: {
    '& .labelRadioBtn': {
      height: '1.5rem',
      marginBottom: '1.5rem',
    },
    '& .labelRadioBtn:last-child': {
      marginBottom: '0',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
  },
  calculatedBill: {
    margin: '1.938rem 0',
    '& a': {
      fontSize: '1rem',
      color: theme.palette.gray.dark,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.875rem',
      },
    },
  },
  total: {
    fontSize: '1.5rem',
    margin: '0',
  },
  ads: {
    paddingTop: '3rem !important',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem !important',
    },
  },
  buttons: {
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '100%',
      },
    },
  },
}));

export default function OrderForm() {
  const classes = useStyles();
  const [recommendProducts, setRecommendProducts] = useState([]);

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

  useEffect(() => {
    getListRecommendProducts();
  }, []);

  return (
    <DefaultLayout title={'ご注文フォーム'}>
      <div className={classes.root}>
        <ContentBlock
          title={'ご注文フォーム'}
          bgImage='/img/noise.png'
          bgRepeat='repeat'
        >
          <Checkout/>
        </ContentBlock>

        {recommendProducts?.length > 0 && (
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
        )}
      </div>
    </DefaultLayout>
  );
}

OrderForm.propTypes = {
};
