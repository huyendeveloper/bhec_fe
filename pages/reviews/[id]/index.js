import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {signOut} from 'next-auth/client';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {AlertMessageForSection, Button, ReviewProduct, ReviewsBlock, ReviewShop, StyledForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {CommonService, ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {productState} from '~/store/productState';
import {userState} from '~/store/userState';

const ProductServiceInstance = new ProductService();

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto 4rem',
    '& button': {
      width: '22.75rem',
      fontSize: '1rem',
      [theme.breakpoints.down('sm')]: {
        width: '14rem',
        minWidth: '14rem',
        fontSize: '0.875rem',
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      '& button': {
        width: '100%',
      },
    },
  },
}));

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
    },
  };
}

const ReviewsDetail = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [product, setProduct] = useRecoilState(productState);

  const {handleSubmit, ...methods} = useForm({criteriaMode: 'all'});

  const [images, setImages] = useState([]);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const addImage = async (index, newImage) => {
    setLoading(true);
    if (newImage) {
      const bodyFormData = new FormData();
      bodyFormData.append('images[]', newImage);
      const result = await CommonService.uploadFile(bodyFormData);
      if (result && result.urls && result.urls.length) {
        const newImages = [...images, ...result.urls];
        setImages(newImages);
      }
    }
    setLoading(false);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleConfirmClick = async (data) => {
    setLoading(true);
    const reviewData = {
      ...data,
      rating_product: Number(data?.rating_product),
      rating_seller: Number(data?.rating_seller),
      product_id: product?.productDetail?.id,
      seller_id: product?.sellerInfo?.id,
      product_images: images,
    };
    const response = await ProductServiceInstance.reviewProduct(reviewData);
    if (response?.success) {
      setAlerts({
        type: 'success',
        message: '???????????????????????????',
      });
      router.push(`/product/${product?.productDetail?.id}`);
    } else {
      setAlerts({
        type: 'error',
        message: '????????????????????????????????????',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetailProduct();
  }, [props]);

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

  return (
    <DefaultLayout title='??????????????????????????? - BH_EC'>
      {isAuthenticated && (
        <FormProvider {...methods}>
          <StyledForm onSubmit={handleSubmit(handleConfirmClick)}>
            <>
              <ReviewsBlock
                title={'???????????????????????????'}
                bgImage='/img/noise.png'
                bgRepeat='repeat'
              >
                <ReviewProduct
                  images={images}
                  addImage={addImage}
                  removeImage={removeImage}
                />
              </ReviewsBlock>

              <ReviewsBlock title={'???????????????????????????'}>
                <ReviewShop getDetailProduct={getDetailProduct}/>
              </ReviewsBlock>

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
                  <div className={classes.container}>
                    <Button
                      variant={'pill'}
                      customColor={'red'}
                      customSize={'medium'}
                      customWidth={'fullwidth'}
                      type='submit'
                    >
                      {'??????'}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </>
          </StyledForm>
        </FormProvider>
      )}

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
};

ReviewsDetail.propTypes = {
  productDetail: PropTypes.object.isRequired,
  sellerInfo: PropTypes.object.isRequired,
};

export default ReviewsDetail;
