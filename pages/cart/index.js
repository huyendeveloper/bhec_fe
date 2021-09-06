import {Box, Container, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import produce from 'immer';
import {useSession} from 'next-auth/client';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {Button, CartItem, CategoryBlock, ContentBlock, Footer, Header, ProductSwiper} from '~/components';
import {CartService} from '~/services';
import {cartState} from '~/store/cartState';

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
  const [session] = useSession();
  const router = useRouter();

  const [cart, setCart] = useRecoilState(cartState);

  const updateRemoteCart = async (items) => {
    const payload = [];
    items.forEach((item) => payload.push(
      {
        product_id: item.productDetail?.id,
        quantity: item.quantity,
      },
    ));

    await CartServiceInstance.addCart({products: payload});
    // eslint-disable-next-line no-warning-comments
    // TODO: should display success/failed result as
  };

  const handleRemove = (id) => {
    // eslint-disable-next-line no-warning-comments
    // TODO: MUST ask user before removing cart item
    setCart(produce((draft) => {
      draft.items = draft.items.filter((item) => item.productDetail?.id !== id);
    }));
  };

  const handleChangeQuantity = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity === 0) {
      handleRemove(productId);
    } else {
      const itemIdx = cart.items.findIndex((item) => item.productDetail?.id === productId);
      setCart(produce((draft) => {
        draft.items[itemIdx].quantity = parseInt(event.target.value, 10);
      }));
    }
  };

  const handleGoToOrderClick = () => {
    // eslint-disable-next-line no-warning-comments
    // TODO: validate cart items before ordering
    router.push('/order-form');
  };

  useEffect(() => {
    if (session?.accessToken) {
      updateRemoteCart(cart.items);
    }
  }, [cart, session]);

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
              <Typography variant={'h2'}>{`カート内の商品 (${cart.items?.length}点)`}</Typography>
              <div className={'notice'}>{'注文画面にて送料を必ずご確認ください。'}</div>
            </Box>

            {cart.seller && (
              <Box
                textAlign={'left'}
                className={classes.store}
              >
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
                  {`${cart.seller?.name ?? ''}`}{cart.seller.catch_phrase?.length > 0 ? `(${cart.seller.catch_phrase})` : ''}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>

        {cart.items?.length === 0 && (
          <Typography align='center'>{'カートに商品はありません。'}</Typography>
        )}

        {cart.items?.length > 0 && (
          <>
            {cart.items?.map((item, idx) => (
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
          <ProductSwiper items={recommendProducts}/>
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
