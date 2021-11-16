import {Box, Card, CardActionArea, CardMedia, Grid, makeStyles, useMediaQuery, Link, useTheme} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import {QuantityBox} from '~/components';
import {format as formatNumber} from '~/lib/number';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .errorMessage': {
      color: '#ba2636',
      marginBottom: '0.5rem',
      alignItems: 'center',
      textAlign: 'right',
    },
  },
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
        width: '80%',

        [theme.breakpoints.down('sm')]: {
          fontSize: '0.875rem',
          lineHeight: '1.313rem',
        },
        [theme.breakpoints.down('xs')]: {
          width: '100%',
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
        marginTop: '1.5rem',
      },

      '& .productNameMobile': {
        position: 'absolute',
        left: '7rem',
        marginTop: '-3.5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '12.75rem',
        fontSize: '0.875rem',
        [theme.breakpoints.down('xs')]: {
          marginTop: '-3.2rem',
        },
      },
      '& .label': {
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        marginBottom: '0.625rem',

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
      '& .quantity>div': {
        height: '2.25rem',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
          height: '100%',
        },
      },
      '& .quantity .errorMessage': {
        display: 'none !important',
      },
      '& .delete': {
        color: theme.palette.red.main,
        '& button': {
          padding: '0',
        },
      },
    },
  },
  card: {
    boxShadow: 'none',
  },
  bgImg: {
    objectFit: 'contain',
  },
  image: {
    width: '10.625rem',
    height: '7rem',
    [theme.breakpoints.down('sm')]: {
      width: '7.75rem',
      height: '5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '5.438rem',
      height: '3.5rem',
    },
  },
}));

const CartItem = ({item, handleChangeQuantity, handleRemove}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const product = item.productDetail;

  return (
    <div className={classes.root}>
      <Grid
        key={product?.id}
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
          <Card className={classes.card}>
            <Link
              href={`/product/${product.id}`}
              className={clsx(classes.linkName)}
            >
              <CardActionArea>
                <CardMedia
                  className={clsx(classes.image, product.image_urls?.length > 0 ? '' : classes.bgImg)}
                  component='img'
                  alt={product?.name}
                  width={170}
                  height={112}
                  image={product?.image_urls?.length > 0 ? product.image_urls[0] : '/logo.png'}
                  title={product?.name}
                />
              </CardActionArea>
            </Link>
          </Card>
          {isMobile ? null : (
            <Box
              component='div'
              className={'productName'}
              textAlign={'left'}
            >
              {product?.name}
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
              {product?.name}
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
              {'¥' + formatNumber(parseInt(product?.price, 10))}
            </div>
          </Box>
          <Box
            component='div'
            textAlign={'center'}
            className={classes.quantity}
          >
            {isMobile ? null : (
              <div className={'label labelTablet'}>
                {'数量'}
              </div>
            )}
            <div className={'quantity'}>
              <QuantityBox
                name={'productQuantity'}
                maximum_quantity={product?.maximum_quantity}
                quantity={product?.quantity}
                defaultValue={item.quantity}
                handleChange={(newQuantity) => handleChangeQuantity(newQuantity, product?.id)}
              />
            </div>
          </Box>
          <Box
            component='div'
            className={'delete'}
          >
            <IconButton
              aria-label='delete'
              onClick={() => handleRemove(product?.id)}
              style={{color: '#ba2636'}}
            >
              <DeleteIcon/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {!item?.enoughStock && product?.maximum_quantity > 0 &&
        <div
          className={'errorMessage'}
        >
          {`この商品は${product?.maximum_quantity}個以上まとめて注文できません。`}
        </div>
      }
      {!item?.enoughStock && !product?.maximum_quantity &&
        <div
          className={'errorMessage'}
        >
          {`この商品は${product?.quantity}個以上まとめて注文できません。`}
        </div>
      }
    </div>
  );
};
export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
};
