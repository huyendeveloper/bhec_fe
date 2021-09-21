import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {Breadcrumbs, Search, SingleProduct} from '~/components';
import {productState} from '~/store/productState';
import {ProductService} from '~/services';
import {DefaultLayout} from '~/components/Layouts';
const ProductServiceInstance = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundImage: 'url("/img/noise.png")',
  },
  breadcrumbs: {
    padding: '4rem 0 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 0',
    },
  },
  topContainer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  banner: {
    padding: '2rem 0',
  },
}));

function ProductDetail(props) {
  const classes = useStyles();
  const [product, setProduct] = useRecoilState(productState);
  const [linkProps, setLinkProps] = useState([]);

  useEffect(() => {
    setProduct((oldValue) => ({
      ...oldValue,
      ...props,
    }));
  }, [props, setProduct]);

  useEffect(() => {
    if (product?.productDetail?.categories?.length && linkProps.length === 0) {
      const categories = product.productDetail.categories;
      const current = [
        {
          id: 'root',
          linkLabel: 'ホーム',
          linkUrl: '/',
        },
      ];
      for (let idx = 0; idx < categories.length; idx++) {
        const category = categories[idx];
        if (category.parent_id === null) {
          current.push({
            id: 0,
            linkLabel: category?.name_kana,
            linkUrl: `/products?cat=${category?.name}`,
          });
          break;
        }
      }
      setLinkProps(current);
    }
  }, [linkProps, product]);

  return (
    <DefaultLayout title='Product Detail - Oshinagaki Store'>
      <div className={classes.root}>
        {/* Breadcrumbs */}
        {linkProps && (
          <Container
            maxWidth='lg'
          >
            <Grid
              container={true}
              spacing={0}
              className={classes.breadcrumbs}
            >
              <Grid
                item={true}
                xs={12}
                md={12}
                lg={12}
              >
                <Breadcrumbs linkProps={linkProps}/>
              </Grid>
            </Grid>
          </Container>
        )}

        {/* Search */}
        <Container
          maxWidth='lg'
          className={classes.topContainer}
        >
          <Search/>
        </Container>

        {/* Product details */}
        <SingleProduct/>

        {/* Banner */}
        <Container maxWidth='lg'>
          <Grid
            container={true}
            className={classes.banner}
          >
            <Grid
              item={true}
              xs={12}
              md={12}
            >
              <Image
                src={'/img/banner-botton.png'}
                alt='banner bottom'
                layout={'responsive'}
                width={'1140'}
                height={'192'}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({params}) {
  const {id} = params;
  const res = id ? await ProductServiceInstance.getProductDetail(id) : null;
  if (!res?.product_detail?.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productDetail: res.product_detail,
      sellerInfo: res.seller_info,
      sellerProduct: res.seller_products,
      recommendProduct: res.recommend_products,
    },
  };
}

export default ProductDetail;
