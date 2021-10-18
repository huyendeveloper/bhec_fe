import {Avatar, Grid, TextareaAutosize, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Swal from 'sweetalert2';

import {Button, ConnectForm} from '~/components';
import {ErrorMessageWidget, RatingWidget} from '~/components/Widgets';
import {SellerService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {productState} from '~/store/productState';
import {userState} from '~/store/userState';

const SellerInstance = new SellerService();

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1.5rem',
    },
    '& img': {
      objectFit: 'cover',
    },
    '& h3': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      margin: '0rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.75rem',
      },
    },
  },
  productName: {
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    color: theme.palette.black.default,
    margin: '1rem 0 1.625rem',
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 1rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingBox: {
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  guideRating: {
    marginLeft: '1rem',
    fontSize: '0.875rem',
    color: theme.palette.gray.dark,
    lineHeight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
  },
  star: {
    width: '2.063rem',
    height: '2.063rem',
  },
  reviewComment: {
    width: '100%',
    border: '1px solid ' + theme.palette.grey.dark,
    outline: 'none',
    height: '9rem !important',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    borderRadius: '0.25rem',
    fontFamily: theme.font.default,
    marginBottom: '3.25rem',
    '&:focus': {
      border: '2px solid #3f51b5',
    },
    [theme.breakpoints.down('sm')]: {
      height: '7rem !important',
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
      marginBottom: '1.75rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '8rem !important',
      marginBottom: '1.5rem',
    },
    '&::placeholder': {
      color: theme.palette.grey.dark,
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
  },
  guide: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    color: theme.palette.black.default,
    margin: '1rem 0 3.25rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.75rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.5rem',
    },
  },
  avatar: {
    width: '7rem',
    height: '7rem',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      width: '5rem',
      height: '5rem',
    },
  },
  btnFollow: {
    backgroundColor: theme.btnFollow.backgroundColor,
    color: theme.palette.white.main,
    fontWeight: 'bold',
    fontSize: '0.8125rem',
    padding: '0 2.5rem',
    height: '40px',
    '&:hover': {
      backgroundColor: theme.btnFollow.backgroundColor,
    },
  },
  isFollowing: {
    border: `1px solid ${theme.btnFollow.isFollowing}`,
    backgroundColor: theme.palette.white.main,
    color: theme.btnFollow.isFollowing,
    borderColor: theme.btnFollow.isFollowing,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
    },
  },
}));

const ReviewShop = ({getDetailProduct}) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const product = useRecoilValue(productState);
  const sellerInfo = product?.sellerInfo;
  const user = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);

  const toggleFollow = async () => {
    setLoading(true);
    if (user?.isAuthenticated) {
      const payload = {
        seller_id: sellerInfo.id,
      };
      if (sellerInfo.followed) {
        const response = await SellerInstance.unFollowSeller(payload);
        if (response) {
          getDetailProduct();
        }
      } else {
        const response = await SellerInstance.followSeller(payload);
        if (response) {
          getDetailProduct();
        }
      }
    } else {
      Swal.fire({
        title: '通知',
        text: '利用するためにログインが必要です。',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: '閉じる',
        confirmButtonText: 'ログイン画面へ',
        backdrop: false,
        customClass: {
          container: 'swal2-warning-1',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/auth/login?callbackUrl=${router.asPath}`);
        }
      });
    }
    setLoading(false);
  };

  return (
    <ConnectForm>
      {({control, errors}) => {
        return (
          <div className={classes.root}>
            <Grid
              container={true}
              spacing={0}
            >
              {sellerInfo &&
                <Grid
                  item={true}
                  sm={12}
                >
                  <Grid
                    container={true}
                    spacing={0}
                  >
                    <Grid
                      item={true}
                      md={2}

                      style={{marginBottom: isMobile ? '1.5rem' : (isTablet ? '1.625rem' : '2.125rem')}}
                    >
                      <Avatar
                        alt={sellerInfo.name}
                        src={sellerInfo.avatar_url}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid
                      item={true}
                      md={10}
                      style={{marginLeft: isTablet ? '1rem' : null}}
                    >
                      <h2
                        className={classes.productName}
                      >
                        {sellerInfo.name}
                      </h2>

                      <Button
                        variant='contained'
                        onClick={toggleFollow}
                        className={clsx(classes.btnFollow, sellerInfo?.followed ? classes.isFollowing : '')}
                      >
                        {sellerInfo?.followed ? 'フォロー中' : 'フォローする'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }

              <Grid
                item={true}
                md={2}
                sm={3}
                xs={12}
              >
                <h3>{'店舗の満足度'}</h3>
              </Grid>
              <Grid
                item={true}
                md={10}
                sm={9}
                xs={12}
                className={classes.ratingBox}
              >
                <div className={classes.stars}>
                  <RatingWidget
                    readOnly={false}
                    nameRating={'rating_seller'}
                  />

                  <span className={classes.guideRating}>{'星をクリックして入力してください'}</span>
                </div>

                <ErrorMessageWidget
                  errors={errors}
                  name='rating_seller'
                />
              </Grid>

              <Grid
                item={true}
                md={2}
                sm={3}
                xs={12}
              >
                <h3>{'レビュー内容'}</h3>
              </Grid>
              <Grid
                item={true}
                md={10}
                sm={9}
                xs={12}
              >
                <Controller
                  name='content_review_seller'
                  control={control}
                  defaultValue={''}
                  render={({field: {name, value, onChange}}) => (
                    <TextareaAutosize
                      variant='outlined'
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={'気に入ったこと/気に入らなかったことは何ですか？この製品をどのように使いましたか？'}
                      className={classes.reviewComment}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
        );
      }}
    </ConnectForm>
  );
};

ReviewShop.propTypes = {
  getDetailProduct: PropTypes.func.isRequired,
};

ReviewShop.defaultProps = {

};

export default ReviewShop;
