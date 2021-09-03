import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import Head from 'next/head';
import Image from 'next/image';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Box, useMediaQuery, Grid, useTheme, Container, Typography} from '@material-ui/core';
import {useSession} from 'next-auth/client';

import {Header, Footer, ContentBlock, Button, CategoryBlock, CartItem} from '~/components';
import {ProductWidget} from '~/components/Widgets';
import {cookieUtil} from '~/modules/cookieUtil';
import {ProductService, CartService} from '~/services';

const ProductServiceInstance = new ProductService();
const CartServiceInstance = new CartService();

const useStyles = makeStyles((theme) => ({
  bgBanner: {
    backgroundImage: 'url(/img/noise.png)',
    backgroundColor: '#FAF6EF',
  },
  title: {
    margin: '2rem 0 3rem',
    '& h2': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
    },
    '& .notice': {
      marginTop: '1rem',
      fontSize: '1rem',
      lineHeight: '1.563rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.75rem',
      '& h2': {
        fontSize: '1.25rem',
        lineHeight: '1.875rem',
      },
      '& .notice': {
        fontSize: '0.813rem',
      },
    },
  },
  store: {
    paddingBottom: '2rem',
  },
  continueShop: {
    paddingTop: '2rem',
  },
  banner: {
    padding: '2rem 0 1rem',
  },
  banner1: {
    padding: '1rem 0 4rem',
  },
}));

// eslint-disable-next-line no-warning-comments
// TODO: get products in same category with cart item
const recommendProducts = [];

export default function Cart() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [session] = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [sellerInfo, setSellerInfo] = useState();
  const router = useRouter();

  const getCartAPI = async () => {
    const result = await CartServiceInstance.getCarts();
    const items = result?.cart_items ?? [];

    //Set setCartItems from api data
    if (items.length) {
      const apiData = [];
      for (const item of items) {
        const mapData = {
          product_id: item.product_id,
          name: item.product.name,
          price: item.price ? item.price : 0,
          maximum_quantity: item.product.maximum_quantity,
          quantity: item.quantity,
          thumb_url: item.product.thumb_url ? item.product.thumb_url : '',
          seller_id: item.product.seller_id,
          note: item.note,
        };
        apiData.push(mapData);
      }
      setCartItems(apiData);
    }
  };

  const addCartAPI = async (cartData) => {
    const payload = [];
    cartData.forEach((item) => payload.push(
      {
        product_id: item.product_id,
        quantity: item.quantity,
        note: item.note,
      },
    ));

    await CartServiceInstance.addCart({products: payload});
    // eslint-disable-next-line no-warning-comments
    // TODO: should display success/failed result as
  };

  useEffect(() => {
    const items = cookieUtil.getCookie('cartItems') ? JSON.parse(cookieUtil.getCookie('cartItems')) : [];
    if (items.length > 0) {
      setCartItems(items);
    } else if (session?.accessToken) {
      getCartAPI();
    }
  }, [session]);

  useEffect(() => {
    if (cartItems.length > 0) {
      // get seller info from product details
      const productId = cartItems[0].product_id;
      ProductServiceInstance.getProductDetail(productId).then((product) => {
        setSellerInfo(product?.seller_info);
      });
    }
  }, [cartItems]);

  const handleRemove = (id) => {
    // eslint-disable-next-line no-warning-comments
    // TODO: MUST ask user before removing cart item
    const cartData = cartItems.filter((item) => item.product_id !== id);
    setCartItems(cartData);

    // update cookie
    cookieUtil.setCookie('cartItems', JSON.stringify(cartData));

    // then call API update cart if authorized
    if (session?.accessToken) {
      addCartAPI(cartData);
    }
  };

  const handleChangeQuantity = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity === 0) {
      handleRemove(productId);
    } else {
      for (const i in cartItems) {
        if (cartItems[i].product_id === productId) {
          cartItems[i].quantity = parseInt(event.target.value, 10);
          break;
        }
      }
      cookieUtil.setCookie('cartItems', JSON.stringify(cartItems));
    }
  };

  const renderProduct = () => {
    if (isMobile) {
      return (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          className='productSwiper'
        >
          {recommendProducts.map((product, index) => (
            <SwiperSlide
              style={{width: '70%'}}
              key={String(index)}
            >
              <ProductWidget
                data={product}
                heart={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else if (isTablet) {
      return (
        <Swiper
          slidesPerView={2.5}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          className='productSwiper'
        >
          {recommendProducts.map((product, index) => (
            <SwiperSlide
              style={{width: '90%'}}
              key={String(index)}
            >
              <ProductWidget
                data={product}
                heart={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
    return (
      <Grid
        container={true}
        justifyContent='center'
        spacing={3}
      >
        {recommendProducts.map((product, index) => (
          <Grid
            key={String(index)}
            item={true}
            xs={12}
            sm={4}
            md={3}
          >
            <ProductWidget
              data={product}
              heart={true}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const handleGoToOrderClick = () => {
    // eslint-disable-next-line no-warning-comments
    // TODO: validate cart items before ordering
    router.push('/order-form');
  };

  /* eslint-disable max-lines */
  return (
    <>
      <Head>
        <title>{'カート'}</title>
      </Head>
      <Header showMainMenu={false}/>

      {/* Cart */}
      <ContentBlock
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
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
            <Box
              textAlign={'center'}
              className={classes.title}
            >
              <Typography variant={'h2'}>{`カート内の商品 (${cartItems.length}点)`}</Typography>
              <div className={'notice'}>{'注文画面にて送料を必ずご確認ください。'}</div>
            </Box>

            {cartItems.length > 0 && (
              <Box
                textAlign={'left'}
                className={classes.store}
              >
                {Boolean(sellerInfo) && (
                  <Button
                    variant='pill'
                    customColor='yellow'
                    customSize='medium'
                    startIcon={
                      <Image
                        src={'/img/icons/store.svg'}
                        width={24}
                        height={26}
                        alt={'store'}
                      />}
                  >
                    {`${sellerInfo.name}`}{sellerInfo.catch_phrase?.length > 0 ? `(${sellerInfo.catch_phrase})` : ''}
                  </Button>
                )}
              </Box>
            )}
          </Grid>
        </Grid>

        {cartItems.length === 0 && (
          <Typography align='center'>{'カートに商品はありません。'}</Typography>
        )}

        {cartItems.length > 0 && (
          <>
            {cartItems.map((item, idx) => (
              <CartItem
                item={item}
                // eslint-disable-next-line react/no-array-index-key
                key={`cart-item-${idx}`}
                handleChangeQuantity={handleChangeQuantity}
                handleRemove={handleRemove}
              />
            ))}

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
                <Box
                  textAlign={'center'}
                  className={classes.continueShop}
                >
                  <Button
                    variant='pill'
                    customColor='black'
                    customSize='extraLarge'
                    onClick={handleGoToOrderClick}
                  >
                    {'購入画面へすすむ'}
                  </Button>
                </Box>

              </Grid>
            </Grid>
          </>
        )}
      </ContentBlock>

      {/* Recommend Product */}
      {recommendProducts.length > 0 && (
        <CategoryBlock
          title='あなたにオススメの商品'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          {renderProduct()}
        </CategoryBlock>
      )}

      {/* Banner */}
      <div className={classes.bgBanner}>
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
                src={'/img/banner-favorite2.png'}
                alt='banner bottom'
                layout={'responsive'}
                width={'1140'}
                height={'192'}
              />
            </Grid>
          </Grid>
          <Grid
            container={true}
            className={classes.banner1}
          >
            <Grid
              item={true}
              xs={12}
              md={12}
            >
              <Image
                src={'/img/banner.png'}
                alt='banner bottom'
                layout={'responsive'}
                width={'1140'}
                height={'192'}
              />
            </Grid>
          </Grid>
        </Container>
      </div>

      <Footer/>
    </>
  );
}
