import {Avatar, Box, Container, Grid, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

import CategoryBlock from '../CategoryBlock';
import {ProductWidget} from '../Widgets';

import {Button} from '..';

import {productState} from '~/store/productState';
import {userState} from '~/store/userState';
import {SellerService} from '~/services';
const SellerInstance = new SellerService();
const useStyles = makeStyles((theme) => ({
  seller: {
    '& .info': {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      color: theme.productWidget.seller.textColor,
      '&:hover': {
        textDecoration: 'none',
      },
      '& .avatar': {
        marginRight: '0.75rem',
        width: '5rem',
        height: '5rem',
        [theme.breakpoints.down('xs')]: {
          width: '4rem',
          height: '4rem',
        },
      },
      '& .name': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.875rem',
        },
      },
      '& .profileLink': {
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        marginTop: '3px',
        fontWeight: 'normal',
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.813rem',
        },
      },
    },
    '& .action': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& button:first-child': {
        marginRight: '1.5rem',
      },
    },
  },
  introduction: {
    padding: '2rem 0 3rem',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
  },
  description: {
    padding: '2rem 0 3rem',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
  },
  sellerPost: {
    textAlign: 'left',
    marginBottom: '1rem',
    position: 'relative',
    '& h5': {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 'bold',
      borderLeft: '5px solid #E6B422',
      borderRadius: '0.125rem',
      borderWidth: '0.5rem',
      paddingLeft: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      '& h5': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
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

const SellerInfo = ({getDetailProduct}) => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const sellerInfo = product?.sellerInfo;
  const router = useRouter();
  const [user] = useRecoilState(userState);

  const goToDetailSeller = () => {
    router.push(`/seller/${sellerInfo.id}`);
  };

  const toggleFollow = async () => {
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
  };

  return sellerInfo ? (
    <>
      <Container>

        <Grid
          container={true}
          className={classes.seller}
        >
          <Grid
            item={true}
            xs={12}
            sm={6}
            md={6}
            className={'info'}
          >
            <Avatar
              alt={sellerInfo.name ?? ''}
              src={sellerInfo.avatar_url ?? ''}
              className={'avatar'}
            />
            <Box
              component='div'
            >
              {sellerInfo.name && (
                <Typography
                  component={'h5'}
                  className={'name'}
                >
                  {sellerInfo.name}
                </Typography>
              )}
              {sellerInfo.catch_phrase && (
                <Typography
                  component={'p'}
                  className={'profileLink'}
                >
                  {sellerInfo.catch_phrase}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item={true}
            xs={12}
            sm={6}
            md={6}
          >
            <Box
              component='div'
              className={'action'}
            >
              {/* <Button
                variant='contained'
                customColor='yellow'
                customSize='small'
              >
                {sellerInfo?.followed ? 'フォローする' : 'フォロー中'}
              </Button> */}
              <Button
                variant='contained'
                onClick={() => toggleFollow()}
                className={clsx(classes.btnFollow, sellerInfo?.followed ? classes.isFollowing : '')}
              >
                {sellerInfo?.followed ? 'フォローする' : 'フォロー中'}
              </Button>
              <Button
                variant='contained'
                customSize='small'
                customColor='white'
                customBorder='bdGray'
                onClick={goToDetailSeller}
              >
                {'プロフィールを見る'}
              </Button>
            </Box>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={12}
            className={classes.introduction}
          >
            <Box
              component='div'
              dangerouslySetInnerHTML={{__html: `${sellerInfo.introduction}`}}
            />
          </Grid>
        </Grid>

        {/* This get from API editor */}
        <div className={classes.sellerPost}>
          <Typography variant={'h5'}>{'生産者のこだわり'}</Typography>
        </div>
        <Grid
          container={true}
          className={classes.description}
        >
          <Box
            component='div'
            dangerouslySetInnerHTML={{__html: `${sellerInfo.description}`}}
          />
        </Grid>
      </Container>

      {product?.sellerProduct?.length > 0 && (
        <div className={classes.categoryBlock}>
          <CategoryBlock
            category='この生産者の商品'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <Grid
              container={true}
              spacing={3}
            >
              {product?.sellerProduct?.map((item) => (
                <Grid
                  key={item.id}
                  item={true}
                  sm={4}
                  xs={6}
                  className={classes.product}
                >
                  <ProductWidget
                    data={item}
                    border={'borderNone'}
                    heart={true}
                  />
                </Grid>
              ))}
            </Grid>
          </CategoryBlock>
        </div>
      )}

      {product?.recommendProduct?.length > 0 && (
        <div className={classes.categoryBlock}>
          <CategoryBlock
            category='オススメ商品'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <Grid
              container={true}
              spacing={3}
            >
              {product?.recommendProduct?.map((item) => (
                <Grid
                  key={item.id}
                  item={true}
                  sm={4}
                  xs={6}
                  className={classes.product}
                >
                  <ProductWidget
                    data={item}
                    border={'borderNone'}
                    heart={true}
                  />
                </Grid>
              ))}
            </Grid>
          </CategoryBlock>
        </div>
      )}
    </>
  ) : <></>;
};

SellerInfo.propTypes = {
  getDetailProduct: PropTypes.func,
};

export default SellerInfo;
