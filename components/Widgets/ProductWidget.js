/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Avatar, Chip, Link} from '@material-ui/core';
import Image from 'next/image';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '5.063rem',
    height: '100%',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    marginBottom: '0.75rem',
  },
  productTags: {
    marginBottom: '1rem',
    '& > div': {
      height: '16px',
      borderRadius: '4px',
      backgroundColor: theme.productWidget.tag.backgroundColor,

      '& span': {
        fontSize: '10px',
        fontWeight: 'bold',
        color: theme.productWidget.tag.textColor,
      },
      '&:not(:last-child)': {
        marginRight: '0.5rem',
      },

      [theme.breakpoints.down('sm')]: {
        marginBottom: '5px',
      },
    },
  },
  productTagHighlight: {
    backgroundColor: `${theme.productWidget.tag.highlightColor} !important`,
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: '1.875rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  productSellerAction: {
    borderTop: `1px solid ${theme.productWidget.seller.sepColor}`,
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
  },
  productSeller: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    color: theme.productWidget.seller.textColor,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  productSellerAvatar: {
    marginRight: '0.75rem',
    width: '3rem',
    height: '3rem',
  },
  sellerInfo: {
    fontSize: '0.6875rem',
    lineHeight: '1rem',
    fontWeight: 'bold',
  },
  sellerInfoIntro: {
    marginTop: '3px',
    fontWeight: 'normal',
  },
  borderNone: {
    boxShadow: 'none',
  },
}));

// eslint-disable-next-line no-unused-vars
const ProductWidget = ({variant, data, heart, border}) => {
  const classes = useStyles();

  if (!data) {
    return null;
  }

  const product = data;
  const tags = data.tags || [];
  const owner = data.seller_info || {};
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  return (
    <Card className={clsx(classes.root, classes[border])}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={product.name}
          height='160'
          image={'/img/products/product-01.png'}
          title={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom={true}
            component='h3'
            className={classes.productName}
          >
            {product.name}
          </Typography>

          <div className={classes.productTags}>
            {/* eslint-disable-next-line react/prop-types */}
            {tags && tags.length > 0 ? tags.map((tag, index) => {
              return (
                <Chip
                  key={String(index)}
                  size='small'
                  label={tag.name}
                  className={tag.isFeatured ? classes.productTagHighlight : ''}
                />
              );
            }) : null}
          </div>

          <div className={classes.productPrice}>
            {currency.format(product.price)}
            {heart &&
            (data.is_favorite_product ? (
              <Image
                src={'/img/icons/fill-heart.svg'}
                width={27}
                height={24}
                alt={'heart'}
              />
            ) : (
              <Image
                src={'/img/icons/ountline-heart.svg'}
                width={27}
                height={24}
                alt={'heart'}
              />
            ))}
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.productSellerAction}>
        <Link
          href={'#'}
          className={classes.productSeller}
        >
          <Avatar
            alt={owner.name}
            src={'/img/sellers/seller-01.png'}
            className={classes.productSellerAvatar}
          />

          <div className={classes.productSellerInfo}>
            <Typography
              component={'h5'}
              className={classes.sellerInfo}
            >{owner.name}</Typography>
            <Typography
              component={'p'}
              className={classes.sellerInfo + ' ' + classes.sellerInfoIntro}
            >{owner.catch_phrase}</Typography>
          </div>
        </Link>
      </CardActions>
    </Card>
  );
};

ProductWidget.propTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  heart: PropTypes.bool,
  border: PropTypes.string,
};

ProductWidget.defaultProps = {
  variant: 'simple',
  heart: false,
  border: null,
};

export default ProductWidget;
