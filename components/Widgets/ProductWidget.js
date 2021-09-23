import {Avatar, Chip, Link, useMediaQuery, useTheme} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: '10rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '& .MuiCardContent-root': {
      flex: '1 1 auto',
    },
    '& .MuiCardActionArea-root': {
      flex: '0 1 auto',
      display: 'flex',
    },
  },
  linkName: {
    width: '100%',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  linkNameImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImg: {
    backgroundColor: '#DBDBDB',
    padding: '10%',
    objectFit: 'scale-down',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '0.813rem',
    lineHeight: '1.188rem',
    marginBottom: '0.75rem',
    color: '#333',
  },
  productTags: {
    marginBottom: '1rem',
    '& > div': {
      height: '16px',
      borderRadius: '4px',
      backgroundColor: '#8a8a8a',

      '& span': {
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#f1f1f1',
      },
      '&:not(:last-child)': {
        marginRight: '0.5rem',
      },
    },
  },
  productPrice: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    lineHeight: '1.875rem',
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.black3.main,
  },
  productSellerAction: {
    borderTop: '1px solid #f1ebdf',
  },
  subContent: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0',
  },
  productSeller: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    color: '#000',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  productSellerAvatar: {
    marginRight: '0.75rem',
    width: '3rem',
    height: '3rem',
    [theme.breakpoints.down('xs')]: {
      width: '2.5rem',
      height: '2.5rem',
    },
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
const ProductWidget = ({variant, data, heart, border, handleLike}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  if (!data) {
    return null;
  }

  const product = data;
  const tags = data.tags || [];
  const seller = data.seller_info || {};
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  const handleLikeProduct = async (likeStatus) => {
    handleLike(data.id, likeStatus);
  };

  return (
    <Card className={clsx(classes.root, classes[border])}>
      <CardActionArea>
        <Link
          href={`/product/${product.id}`}
          className={clsx(classes.linkName, classes.linkNameImage)}
        >
          <CardMedia
            component='img'
            alt={product.name}
            height={isTablet ? '160' : '208'}
            className={clsx(product.thumb_url ? null : classes.bgImg)}
            image={product.thumb_url ?? '/logo.png'}
            title={product.name}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Link
          href={`/products/${product.id}`}
          className={clsx(classes.linkName)}
        >
          <Typography
            gutterBottom={true}
            component='h3'
            className={classes.productName}
          >
            {product.name}
          </Typography>
        </Link>
      </CardContent>
      <div className={classes.subContent}>
        <CardContent>
          <div className={classes.productTags}>
            {tags && tags.length > 0 ? tags.map((tag, index) => {
              return (
                <Chip
                  key={String(index)}
                  size='small'
                  label={tag.name}
                />
              );
            }) : null}
          </div>

          <div className={classes.productPrice}>
            {currency.format(product.price)}
            {heart &&
              (product.is_favorite_product ? (
                <Image
                  src={'/img/icons/fill-heart.svg'}
                  width={27}
                  height={24}
                  alt={'heart'}
                  onClick={() => handleLikeProduct(false)}
                />
              ) : (
                <Image
                  src={'/img/icons/ountline-heart.svg'}
                  width={27}
                  height={24}
                  alt={'heart'}
                  onClick={() => handleLikeProduct(true)}
                />
              ))}
          </div>
        </CardContent>

        <CardActions className={classes.productSellerAction}>
          <Link
            href={seller ? `/seller/${seller.id}` : '#'}
            className={classes.productSeller}
          >
            <Avatar
              alt={seller.name}
              src={seller.avatar_url}
              className={classes.productSellerAvatar}
            />

            <div className={classes.productSellerInfo}>
              <Typography
                component={'h5'}
                className={classes.sellerInfo}
              >{seller.name}</Typography>
              <Typography
                component={'div'}
                className={classes.sellerInfo + ' ' + classes.sellerInfoIntro}
              >
                {seller.catch_phrase}
              </Typography>
            </div>
          </Link>
        </CardActions>
      </div>
    </Card>
  );
};

ProductWidget.propTypes = {
  variant: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  heart: PropTypes.bool,
  border: PropTypes.string,
  handleLike: PropTypes.func,
};

ProductWidget.defaultProps = {
  variant: 'simple',
  heart: false,
  border: null,
};

export default ProductWidget;
