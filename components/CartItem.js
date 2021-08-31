import React, {useEffect, useState} from 'react';
import {Box, makeStyles, Grid, Icon, useMediaQuery, useTheme} from '@material-ui/core';
import Image from 'next/image';
import {useSession} from 'next-auth/client';

import {QuantityBox} from '~/components';
import {CartService} from '~/services';
const Cart = new CartService();
import {format as formatNumber} from '~/lib/number';

import {cookieUtil} from '~/modules/cookieUtil';

const useStyles = makeStyles((theme) => ({
  cart: {
    paddingBottom: '1rem',
    '& .blockFirst': {
      display: 'flex',
      alignItems: 'center',

      '& .productName': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
        paddingLeft: '1.5rem',
        width: '22.75rem',

        [theme.breakpoints.down('sm')]: {
          fontSize: '0.875rem',
          lineHeight: '1.313rem',
        },
      },
    },
    '& .blockSecond': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '5.5rem',
      [theme.breakpoints.down('sm')]: {
        gap: '3rem',
      },
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-around',
        gap: '1rem',
        marginTop: '1rem',
      },

      '& .productNameMobile': {
        position: 'absolute',
        left: '7rem',
        marginTop: '-3.5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '12.75rem',
      },
      '& .label': {
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        marginBottom: '1rem',

        [theme.breakpoints.down('sm')]: {
          fontSize: '0.813rem',
          lineHeight: '1.188rem',
        },
      },
      '& .labelTablet': {
        [theme.breakpoints.down('sm')]: {
          marginBottom: '0.1rem',
        },
      },
      '& .price': {
        fontSize: '1.5rem',
        lineHeight: '2.25rem',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
        },
      },
      '& .quantity': {
      },
      '& .delete': {
        color: theme.palette.red.main,
      },
    },
  },
}));

const CartItem = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [session] = useSession();
  const [cartItems, setCartItems] = useState([]);

  const getCartAPI = async () => {
    const result = await Cart.getCarts();
    const cart_items = result?.cart_items ?? [];

    //Set setCartItems from api data
    if (cart_items.length) {
      const apiData = [];
      for (const item of cart_items) {
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

    const result = await Cart.addCart({products: payload});
    // eslint-disable-next-line no-console
    console.log(result);
  };

  useEffect(() => {
    const cartItem = cookieUtil.getCookie('cartItems') ? JSON.parse(cookieUtil.getCookie('cartItems')) : [];
    if (cartItem.length > 0) {
      setCartItems(cartItem);
    } else if (session) {
      getCartAPI();//Get API
    }
  }, [session]);

  const handleRemove = (id) => {
    const cartData = cartItems.filter((item) => item.product_id !== id);
    setCartItems(cartData);

    //update cookie and call API update cart
    cookieUtil.setCookie('cartItems', JSON.stringify(cartData));
    addCartAPI(cartData);
  };

  const handleChangeQuantity = (event, productId) => {
    for (var i in cartItems) {
      if (cartItems[i].product_id === productId) {
        cartItems[i].quantity = parseInt(event.target.value, 10);
        break;
      }
    }
    cookieUtil.setCookie('cartItems', JSON.stringify(cartItems));
  };

  return (
    <>
      {cartItems.map((cart) => (
        <Grid
          key={cart.product_id}
          container={true}
          className={classes.cart}
        >
          <Grid
            item={true}
            xs={3}
            sm={6}
            lg={6}
            className={'blockFirst'}
          >
            <Box
              component='div'
              className={'thumbnail'}
            >
              {
                cart.thumbnail ? (
                  <Image
                    src={`${cart.thumbnail}`}
                    width={170}
                    height={112}
                    alt={`${cart.name}`}
                  />
                ) : null
              }

            </Box>
            {isMobile ? null : (
              <Box
                component='div'
                className={'productName'}
                textAlign={'left'}
              >
                {cart.name}
              </Box>
            )}
          </Grid>
          <Grid
            item={true}
            xs={9}
            sm={6}
            lg={6}
            className={'blockSecond'}
          >
            {isMobile ? (
              <Box
                component='div'
                className={'productNameMobile'}
                textAlign={'left'}
              >
                {cart.name}
              </Box>
            ) : null
            }
            <Box
              component='div'
              textAlign={'center'}
            >
              {isMobile ? null : (
                <div className={'label'}>
                  {'税込価格'}
                </div>
              )}
              <div className='price'>
                {'¥' + formatNumber(cart.price)}
              </div>
            </Box>
            <Box
              component='div'
              textAlign={'center'}
            >
              {isMobile ? null : (
                <div className={'label labelTablet'}>
                  {'数量'}
                </div>
              )}
              <div className={'quantity'}>
                <QuantityBox
                  name={'productQuantity'}
                  maximumQuantity={cart.maximum_quantity}
                  defaultValue={cart.quantity}
                  handleChange={(event) => handleChangeQuantity(event, cart.product_id)}
                />
              </div>
            </Box>
            <Box
              component='div'
              className={'delete'}
            >
              <Icon onClick={() => handleRemove(cart.product_id)}>{'delete'}</Icon>
            </Box>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
export default CartItem;
