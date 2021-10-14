import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';

import {AlertMessageForSection, Button, ReviewProduct, ReviewsBlock, ReviewShop, StyledForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
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

  const {productDetail, sellerInfo} = props;

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

  const addImage = (index, newImage) => {
    if (index + 1 > images.length) {
      setImages([...images, newImage]);
    } else {
      const newImages = [...images];
      newImages[index] = newImage;
      setImages(newImages);
    }
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
      product_id: productDetail?.id,
      seller_id: sellerInfo?.id,
      product_images: images,
    };
    const response = await ProductServiceInstance.reviewProduct(reviewData);
    if (response?.success) {
      setAlerts({
        type: 'success',
        message: '成功したレビュー。',
      });
    } else {
      setAlerts({
        type: 'error',
        message: 'レビューに失敗しました。',
      });
    }
    setLoading(false);
  };

  return (
    <DefaultLayout title='商品レビューを書く - BH_EC'>
      {isAuthenticated && (
        <FormProvider {...methods}>
          <StyledForm onSubmit={handleSubmit(handleConfirmClick)}>
            <>
              <ReviewsBlock
                title={'商品レビューを書く'}
                bgImage='/img/noise.png'
                bgRepeat='repeat'
              >
                <ReviewProduct
                  product={productDetail}
                  images={images}
                  addImage={addImage}
                  removeImage={removeImage}
                />
              </ReviewsBlock>

              <ReviewsBlock title={'店舗レビューを書く'}>
                <ReviewShop productOwner={sellerInfo}/>
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
                      {'投稿'}
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
