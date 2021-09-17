import React, {useEffect, useState} from 'react';
import {Container, Grid, Breadcrumbs as MuiBreadcrumbs, useTheme, Button, useMediaQuery, Link, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import clsx from 'clsx';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {useRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {useRouter} from 'next/router';

import {DefaultLayout} from '~/components/Layouts';
import {Search, CategoryBlock, ProductSwiper} from '~/components';
import 'swiper/swiper.min.css';
import {SellerService, ProductService} from '~/services';
import {ProductWidget} from '~/components/Widgets';
import {userState} from '~/store/userState';
const ProductServiceInstance = new ProductService();
const SellerInstance = new SellerService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingBottom: '3rem',
  },
  topBanner: {
    backgroundImage: 'url("/img/noise.png")',
  },
  topContainer: {
    position: 'relative',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  news: {
    [theme.breakpoints.up('lg')]: {
      padding: '0rem 6.063rem',
    },
  },
  advertisements: {
    backgroundImage: 'url("/img/noise.png")',
    padding: '3rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2.2625rem 1.625rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '2.5rem 0',
    },
  },
  lastBlock: {
    marginBottom: '4rem',
  },
  blockAds: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 3.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 'initial',
    },
  },

  breadcrumbs: {
    fontSize: '0.8125rem',
    lineHeight: '1.1875rem',
    color: theme.palette.black3.main,
    marginBottom: '1.25rem',
  },
  blockInfo: {
    borderBottom: '1px solid #DBDBDB',
    paddingBottom: '10px',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      paddingBottom: 0,
      marginTop: '0.5rem',
    },
  },
  blockAvatar: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  blockDetail: {
    marginLeft: '2rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
    },
  },
  intro: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: theme.palette.black4.main,
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8125rem',
      lineHeight: '1.1875rem',
      marginBottom: '4px',
    },
  },
  name: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: theme.palette.black.default,
    marginBottom: '14px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.3125rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
  },
  btnFollow: {
    backgroundColor: theme.btnFollow.backgroundColor,
    color: theme.palette.white.main,
    fontWeight: 'bold',
    fontSize: '0.8125rem',
    width: '100%',
    height: '40px',
    '&:hover': {
      backgroundColor: theme.btnFollow.backgroundColor,
    },
  },
  introduction: {
    margin: '1.5rem 0',
    fontSize: '0.8125rem',
    lineHeight: '1.25rem',
  },
  description: {
    marginTop: '2rem',
    '& img': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '0',
    },
  },
  isFollowing: {
    backgroundColor: theme.palette.white.main,
    color: theme.btnFollow.isFollowing,
    borderColor: theme.btnFollow.isFollowing,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
    },
  },
}));

const linkProps = [
  {
    id: 1,
    linkLabel: 'ホーム',
    linkUrl: '/',
  },
  {
    id: 2,
    linkLabel: '工芸品一覧',
    linkUrl: '/',
  },
  {
    id: 3,
    linkLabel: '工芸品名',
    linkUrl: '#',
  },
];

const Seller = ({seller, shortcodes, refinedHTML, traditional_craft, food_and_beverage}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [user] = useRecoilState(userState);
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const avatarWidth = isMobile ? 72 : (isTablet ? 80 : 128);
  const avatarHeight = isMobile ? 72 : (isTablet ? 80 : 128);
  const router = useRouter();
  const renderShortcodes = async () => {
    for (let i = 0; i < shortcodes.length; i++) {
      const shortcode = shortcodes[i];
      const shortcodeRegex = /\[product_ids=([\s\S]*?)\]/gm;
      let match;
      const products = [];
      // eslint-disable-next-line no-cond-assign
      while (match = shortcodeRegex.exec(shortcode)) {
        const productIds = match[1].replace(/ /g, '').split(',');
        for (let j = 0; j < productIds.length; j++) {
          const id = productIds[j];
          // eslint-disable-next-line no-await-in-loop
          const response = await ProductServiceInstance.getProductDetail(id);
          if (response?.product_detail) {
            products.push({
              ...response?.product_detail,
              seller_info: response?.seller_info,
              tags: response?.product_detail.tags,
            });
          }
        }
      }
      ReactDOM.render(
        <Grid
          container={true}
          spacing={3}
          style={{
            justifyContent: 'center',
            margin: '16px auto',
          }}
        >
          {products?.map((item) => (
            <Grid
              key={item.id}
              item={true}
              sm={4}
              xs={6}
            >
              <ProductWidget
                data={item}
                border={'borderNone'}
              />
            </Grid>
          ))}
        </Grid>
        , document.getElementById(`js-shorcode-${i}`));
    }
  };

  const toggleFollow = async () => {
    if (user?.isAuthenticated) {
      const payload = {
        seller_id: seller.id,
      };
      if (isFollowing) {
        const response = await SellerInstance.unFollowSeller(payload);
        if (response) {
          setIsFollowing(false);
        }
      } else {
        const response = await SellerInstance.followSeller(payload);
        if (response) {
          setIsFollowing(true);
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

  useEffect(() => {
    renderShortcodes();
  }, []);
  return (
    <DefaultLayout title='TopPage - Oshinagaki Store'>
      <div className={classes.root}>
        <Head>
          <title>{'おしながき'}</title>
        </Head>

        <div className={classes.topBanner}>
          <Container
            maxWidth='lg'
            className={classes.topContainer}
          >
            <Grid
              item={true}
              xs={12}
            >
              <MuiBreadcrumbs
                className={classes.breadcrumbs}
                separator={'＞'}
              >
                {linkProps.map((item) => (
                  item.linkUrl ? (
                    <Link
                      key={`link-${item.id}`}
                      className={classes.link}
                      href={item.linkUrl}
                      color='textPrimary'
                    >
                      {item.linkLabel}
                    </Link>
                  ) : (
                    <Typography
                      key={`textLink-${item.id}`}
                      className={classes.link}
                    >
                      {item.linkLabel}
                    </Typography>
                  )
                ))}
              </MuiBreadcrumbs>
            </Grid>
            <Grid
              item={true}
              xs={12}
              lg={12}
            >
              <Search/>
            </Grid>
          </Container>

        </div>
        <div className={classes.blockInfo}>
          <Container>
            <Grid
              container={true}
              className={classes.blockInfo}
            >
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={9}
              >
                <Box
                  component='div'
                  className={classes.blockAvatar}
                >
                  <Image
                    src={seller?.avatar_url ? seller?.avatar_url : '/default-avatar.png'}
                    alt={'seller avatar'}
                    width={avatarWidth}
                    height={avatarHeight}
                    className={classes.sellerAvatar}
                  />
                  <Box
                    component='div'
                    className={classes.blockDetail}
                  >
                    <Typography
                      component={'h5'}
                      className={classes.intro}
                    >
                      {seller?.catch_phrase}
                    </Typography>
                    <Typography
                      component={'h5'}
                      className={classes.name}
                    >
                      {seller?.name}
                    </Typography>
                    <Rating
                      name='read-only'
                      value={2}
                      precision={0.5}
                      readOnly={true}
                      emptyIcon={<StarBorderIcon fontSize='inherit'/>}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={4}
                md={3}
                style={{textAlign: 'right'}}
              >
                <Button
                  variant='contained'
                  onClick={() => toggleFollow()}
                  className={clsx(classes.btnFollow, isFollowing ? classes.isFollowing : '')}
                >
                  {isFollowing ? 'フォロー中' : 'プロフィール'}
                </Button>
              </Grid>
              <Grid
                item={true}
                xs={12}
                md={12}
                className={classes.introduction}
              >
                <Box
                  component='div'
                  dangerouslySetInnerHTML={{__html: seller?.introduction}}
                />
              </Grid>
            </Grid>
            <Grid
              container={true}
              className={classes.description}
            >
              <Grid
                item={true}
                xs={12}
              >
                <Box
                  component='div'
                  dangerouslySetInnerHTML={{__html: refinedHTML}}
                />
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* Product by category*/}
        {traditional_craft?.length ? (
          <CategoryBlock
            category='この生産者の商品'
            categoryLink='traditional_craft'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <ProductSwiper items={traditional_craft}/>
          </CategoryBlock>) : null
        }

        {food_and_beverage?.length ? (
          <CategoryBlock
            category='オススメ商品'
            categoryLink='food_and_beverage'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <ProductSwiper items={food_and_beverage}/>
          </CategoryBlock>) : null
        }

      </div>
    </DefaultLayout>
  );
};

Seller.propTypes = {
  seller: PropTypes.object,
  shortcodes: PropTypes.array,
  refinedHTML: PropTypes.string,
  traditional_craft: PropTypes.array,
  food_and_beverage: PropTypes.array,
};

Seller.defaultProps = {
  shortcodes: [],
  refinedHTML: '',
  traditional_craft: [],
  food_and_beverage: [],
};

export default Seller;

export async function getServerSideProps({params}) {
  //traditional_craft
  const lstProduct1 = await ProductServiceInstance.getProducts({category: 'traditional_craft', limit: '4'});
  const traditional_craft = lstProduct1?.products?.length ? lstProduct1.products : [];

  //food_and_beverage
  const lstProduct2 = await ProductServiceInstance.getProducts({category: 'food_and_beverage', limit: '4'});
  const food_and_beverage = lstProduct2?.products?.length ? lstProduct2.products : [];
  const {id} = params;
  const response = await SellerInstance.geSellerDetail(id);
  if (!response?.seller?.id) {
    return {
      notFound: true,
    };
  }

  const rawHTML = response?.seller?.description;
  const productsRegrex = /\[product_ids=([\s\S]*?)\]/gm;
  let match;
  let refinedHTML = rawHTML;
  const shortcodes = [];
  let shortcodeIdx = 0;
  // eslint-disable-next-line no-cond-assign
  while (match = productsRegrex.exec(rawHTML)) {
    const shortcode = match[0];
    shortcodes.push(shortcode);

    // replace shortcode by div container
    // then, render shortcode to container in client side
    refinedHTML = refinedHTML.replace(shortcode, `<div id="js-shorcode-${shortcodeIdx}"></div>`);
    shortcodeIdx++;
  }

  return {
    props: {
      seller: {
        ...response?.seller,
      },
      shortcodes,
      refinedHTML,
      traditional_craft,
      food_and_beverage,
    },
  };
}

