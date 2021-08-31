import React from 'react';
import {Box, makeStyles, Grid, Icon, useMediaQuery, useTheme} from '@material-ui/core';
import Image from 'next/image';
import PropTypes from 'prop-types';

import {QuantityBox} from '~/components';
import {format as formatNumber} from '~/lib/number';

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

const CartItem = ({item, handleChangeQuantity, handleRemove}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid
        key={item.product_id}
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
              item.thumbnail ? (
                <Image
                  src={`${item.thumbnail}`}
                  width={170}
                  height={112}
                  alt={`${item.name}`}
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
              {item.name}
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
              {item.name}
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
              {'¥' + formatNumber(item.price)}
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
                maximumQuantity={item.maximum_quantity}
                defaultValue={item.quantity}
                handleChange={(event) => handleChangeQuantity(event, item.product_id)}
              />
            </div>
          </Box>
          <Box
            component='div'
            className={'delete'}
          >
            <Icon onClick={() => handleRemove(item.product_id)}>{'delete'}</Icon>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleChangeQuantity: PropTypes.func.isRequired,
};
