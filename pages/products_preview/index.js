import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';

import {Breadcrumbs, Search, SingleProduct} from '~/components';
import {productState} from '~/store/productState';
import {ProductService} from '~/services';
import {DefaultLayout} from '~/components/Layouts';

const ProductServiceInstance = new ProductService();

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '2rem 0',
    backgroundColor: '#f8f8f8',
    backgroundRepeat: 'repeat',
    backgroundImage: 'url("/img/noise.png")',
    mixBlendMode: 'multiply',
    [theme.breakpoints.down('sm')]: {
      padding: '1.5rem 0 0 0',
    },
  },
  banner: {
    padding: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0 2.5rem',
    },
  },
  searchBox: {
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.5rem',
    },
  },
}));

function ProductDetail(props) {
  const classes = useStyles();
  const [product, setProduct] = useRecoilState(productState);
  const [linkProps, setLinkProps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getDetailProduct();
  }, [props, setProduct]);

  const getDetailProduct = async () => {
    const {id} = router.query;
    const res = id ? await ProductServiceInstance.getProductDetail(id) : null;
    if (res) {
      const productRes = {
        productDetail: res.product_detail,
        sellerInfo: res.seller_info,
        sellerProduct: res.seller_products,
        recommendProduct: res.recommend_products,
      };
      setProduct((oldValue) => ({
        ...oldValue,
        ...productRes,
      }));
    }
  };

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
            linkLabel: `${category?.name_kana}一覧`,
            linkUrl: `/products?cat=${category?.name}`,
          });
          break;
        }
      }
      current.push({
        id: 0,
        linkLabel: product?.productDetail?.name,
      });
      setLinkProps(current);
    }
  }, [linkProps, product]);

  return (
    <DefaultLayout title={product?.productDetail?.name ?? '商品詳細'}>
      <div className={classes.content}>
        <Container className={classes.searchBox}>
          {/* Breadcrumbs */}
          {linkProps && (
            <Breadcrumbs linkProps={linkProps}/>
          )}

          {/* Search */}
          <Search/>
        </Container>

        {/* Product details */}
        <SingleProduct
          getDetailProduct={getDetailProduct}
          isPreview={true}
        />

        {/* Banner */}
        <Container>
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

export default ProductDetail;
