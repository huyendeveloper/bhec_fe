import {Box, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import produce from 'immer';
import {useSession} from 'next-auth/client';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import Swal from 'sweetalert2';

import {get, groupBy, map} from 'lodash';

import {Button, CartItem, ContentBlock, ProductSwiper} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {CartService} from '~/services';
import {cartState, disableOrderState} from '~/store/cartState';

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
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8125rem',
      },
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
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
      marginBottom: '1rem',
    },
  },
  store: {
    paddingBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      '& button': {
        minWidth: '0',
        padding: '0 1.5rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& button': {
        fontSize: '0.875rem',
      },
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
  continueShop: {
    paddingTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0.5rem',
      '& button': {
        width: '14rem',
        height: '2.5rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '14rem',
      },
    },
  },
  banner: {
    padding: '2rem 0 1rem',
  },
  banner1: {
    padding: '1rem 0 4rem',
  },
  ads: {
    paddingTop: '3rem !important',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem !important',
    },
  },
  buttons: {
    marginTop: '1.25rem',
    [theme.breakpoints.down('xs')]: {
      '& button': {
        width: '65%',
        margin: '0 17.5%',
      },
    },
  },

  label: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem !important',
    },
  },

  blockCart: {
    marginBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0',
    },
  },

}));

export default function Cart() {
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();

  const [cart, setCart] = useRecoilState(cartState);
  const [loaded, setLoaded] = useState(false);
  const disableOrder = useRecoilValue(disableOrderState);

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

  const getListRecommendProducts = async () => {
    const query = {
      page: 1,
      per_page: 3,
    };
    if (cart.items.length) {
      query.category = cart.items[0].productDetail?.categories?.map((item) => item.name).join(',');
    }
    if (cart.items.length && cart.items[0]?.sellerInfo) {
      query.seller_ids = cart.items[0]?.sellerInfo?.id;
    }
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: '?????????????????????',
      text: '?????????????????????????????????????????????????????????????????????',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '???????????????',
      confirmButtonText: '??????',
      backdrop: true,
      customClass: {
        container: 'swal2-warning',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setCart(produce((draft) => {
          // eslint-disable-next-line
          draft.items = draft.items.filter((item) => item.productDetail?.id !== id);
        }));
      }
    });
  };

  const handleChangeQuantity = (newQuantity, productId) => {
    if (newQuantity === 0) {
      handleRemove(productId);
    } else {
      const itemIdx = cart.items.findIndex((item) => item.productDetail?.id === productId);
      setCart(produce((draft) => {
        const maximumQuantity = draft.items[itemIdx]?.productDetail?.maximum_quantity > draft.items[itemIdx]?.productDetail?.quantity ? draft.items[itemIdx]?.productDetail?.quantity : (draft.items[itemIdx]?.productDetail?.maximum_quantity || draft.items[itemIdx]?.productDetail?.quantity);
        draft.items[itemIdx].quantity = newQuantity;
        draft.items[itemIdx].enoughStock = newQuantity <= maximumQuantity;
      }));
    }
  };

  const handleGoToOrderClick = () => {
    router.push('/order-form');
  };
  useEffect(() => {
    if (session?.accessToken) {
      updateRemoteCart(cart.items);
    }
    getListRecommendProducts();
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, session]);

  let sellerList = map(cart?.items ?? [], 'sellerInfo');
  const groupedCartItems = groupBy(cart?.items ?? [], 'sellerInfo.id');
  sellerList = sellerList.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.id === item.id
    )));

  /* eslint-disable max-lines */
  return (
    <DefaultLayout title='?????????'>
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
            {loaded &&
              <Box
                textAlign={'center'}
                className={classes.title}
              >
                <Typography
                  variant={'h2'}
                  className={classes.label}
                >{'?????????????????????' + (cart.items?.length > 0 ? ` (${cart.items?.length}???)` : '')}</Typography>
                {cart.items?.length ? <div className={'notice'}>{'?????????????????????????????????????????????????????????'}</div> : null}
              </Box>
            }

            {loaded && cart.items?.length === 0 && (
              <Typography align='center'>{'???????????????????????????????????????'}</Typography>
            )}
          </Grid>
        </Grid>

        <Grid container={true}>
          {loaded && cart.items?.length > 0 &&
              sellerList.map((s, i) => (
                <Grid
                  item={true}
                  xs={12}
                  md={12}
                  lg={12}
                  key={`seller-info-${i}`}
                  className={classes.blockCart}
                >
                  <Box
                    textAlign={'left'}
                    className={classes.store}
                  >
                    <Button
                      variant='pill'
                      customColor='yellow'
                      customSize='medium'
                      onClick={() => router.push(`/seller/${cart.seller?.id}`)}
                      startIcon={
                        <Image
                          src={'/img/icons/store.svg'}
                          width={24}
                          height={26}
                          alt={'store'}
                        />}
                    >
                      {`${s?.name}`}
                      {s?.catch_phrase ? ` (${s?.catch_phrase})` : ''}
                    </Button>
                  </Box>

                  {get(groupedCartItems, s.id, []).map((item, j) => (
                    <CartItem
                      item={item}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`cart-item-${j}`}
                      handleChangeQuantity={handleChangeQuantity}
                      handleRemove={handleRemove}
                    />
                  ))}
                </Grid>
              ))
          }
        </Grid>

        {loaded && cart.items?.length > 0 && (
          <>
            <Grid
              container={true}
              spacing={3}
              className={classes.buttons}
            >
              <Grid
                item={true}
                sm={6}
                xs={12}
                style={{justifyContent: 'flex-end', display: 'flex'}}
              >
                <Button
                  variant='pill'
                  customColor='white'
                  customBorder='bdBlack'
                  customSize='extraLarge'
                  onClick={() => router.push('/products')}
                >
                  {'?????????????????????'}
                </Button>
              </Grid>

              <Grid
                item={true}
                sm={6}
                xs={12}
              >
                <Button
                  variant='pill'
                  customColor='red'
                  customSize='extraLarge'
                  onClick={handleGoToOrderClick}
                  disabled={disableOrder}
                >
                  {'????????????????????????'}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </ContentBlock>
      <ProductSwiper/>
    </DefaultLayout>
  );
}
