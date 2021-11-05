/* eslint-disable no-unneeded-ternary */
import {Avatar, Chip, Link, useMediaQuery, useTheme} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {get} from 'lodash';
import Image from 'next/image';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Swal from 'sweetalert2';

import {ProductService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const Product = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.white.main,

    '& .MuiCardContent-root': {
      flex: '1 1 auto',
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: '0rem',
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
    objectFit: 'scale-down',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    lineHeight: '1.188rem',
    marginBottom: '0.75rem',
    color: '#333',
    height: 'auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.813rem',
    },
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
        marginBottom: '0.2rem',
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
    '& a': {
      color: theme.palette.black3.main,
    },
  },
  productSellerAction: {
    borderTop: '1px solid #f1ebdf',
  },
  subContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& .MuiCardContent-root': {
      padding: '5px 16px 20px 16px',
      display: 'flex',
      flexDirection: 'column',

      '& .linkName': {
        flex: '1 1 auto',
      },
    },
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
  redChip: {
    backgroundColor: `${theme.palette.red.main} !important`,
    color: theme.palette.white.main,
  },
}));

// eslint-disable-next-line no-unused-vars
const ProductWidget = ({variant, data, heart, border, widthMedia, loadListFavourite}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const user = useRecoilValue(userState);
  const [isLike, setIsLike] = useState(data?.is_favorite_product || false);
  const hasQuantity = 'quantity' in data && 'maximum_quantity' in data;
  const isInStock = hasQuantity ? (data?.quantity > 0) : true;

  if (!data) {
    return null;
  }

  const product = data;
  const tags = data.tags || [];
  const seller = data.seller_info || {};
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

  const handleLikeProduct = async (likeStatus) => {
    if (user?.isAuthenticated) {
      setLoading(true);
      const res = likeStatus ? await Product.likeProduct(data.id) : await Product.unlikeProduct(data.id);
      if (res && (res?.message === 'You have unliked this product' || res?.message === 'You have liked this product')) {
        if (loadListFavourite) {
          loadListFavourite();
        }
        setIsLike(!isLike);
      }
      setLoading(false);
    } else {
      Swal.fire({
        title: '登録・ログインが必要です。',
        text: ' ',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '閉じる',
        confirmButtonText: '登録・ログインへ',
        backdrop: false,
        customClass: {
          container: 'swal2-warning',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/auth/login');
        }
      });
    }
  };

  return (
    <Card
      className={clsx(classes.root, classes[border])}
    >
      <Link
        href={`/product/${product.id}`}
        className={clsx(classes.linkName)}
      >
        <CardActionArea>
          <CardMedia
            component='img'
            alt={product.name}
            height={widthMedia ? '160' : isTablet ? '160' : '208'}
            className={clsx(product.image_urls?.length > 0 ? null : classes.bgImg)}
            image={product.image_urls?.length > 0 ? get(product, 'image_urls.0') : '/logo.png'}
            title={product.name}
            style={{objectFit: product.image_urls?.length > 0 ? 'cover' : 'contain'}}
          />
        </CardActionArea>
        <CardContent>
          <Typography
            gutterBottom={true}
            component='h3'
            className={clsx(classes.productName, 'overflowText')}
          >
            {product.name}
          </Typography>
        </CardContent>
      </Link>
      <div className={classes.subContent}>
        <CardContent>
          <Link
            href={`/product/${product.id}`}
            className={classes.linkName}
          >
            <div className={classes.productTags}>
              {!isInStock &&
                <Chip
                  size='small'
                  label={'売り切れ'}
                  className={classes.redChip}
                />
              }
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
          </Link>

          <strong className={classes.productPrice}>
            <Link
              href={`/product/${product.id}`}
              className={classes.linkName}
            >
              {currency.format(product.price)}
            </Link>

            {heart &&
              (isLike ? (
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
          </strong>
        </CardContent>

        <CardActions className={classes.productSellerAction}>
          <Link
            href={seller ? `/seller/${seller.id}` : '#'}
            className={classes.productSeller}
          >
            <Avatar
              alt={seller.name}
              src={seller?.avatar_url}
              className={classes.productSellerAvatar}
            />

            <div className={classes.productSellerInfo}>
              <Typography
                component={'h5'}
                className={classes.sellerInfo}
              >{seller?.name}</Typography>
              <Typography
                component={'div'}
                className={classes.sellerInfo + ' ' + classes.sellerInfoIntro}
              >
                {seller?.catch_phrase}
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
  widthMedia: PropTypes.number,
  loadListFavourite: PropTypes.func,
};

ProductWidget.defaultProps = {
  variant: 'simple',
  heart: false,
  border: null,
};

export default ProductWidget;
