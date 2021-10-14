/* eslint-disable consistent-return */
import React, {useEffect, useState} from 'react';
import {Container, Grid, useTheme, Button, useMediaQuery, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import clsx from 'clsx';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {useRouter} from 'next/router';

import {DefaultLayout} from '~/components/Layouts';
import {Search, CategoryBlock, ProductSwiperSeller, Breadcrumbs} from '~/components';
import 'swiper/swiper.min.css';
import {SellerService, ProductService} from '~/services';
const ProductServiceInstance = new ProductService();
const SellerInstance = new SellerService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingBottom: '3rem',

    '& .MuiRating-root': {
      color: '#E6B422',
    },
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
    fontSize: '0.875rem',
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
    boxShadow: 'none',
    border: `1px solid ${theme.btnFollow.isFollowing}`,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
    },
  },

  sellerAvatar: {
    borderRadius: '50%',
  },
}));

const Seller = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [seller, setSeller] = useState();
  const [refinedHTML, setRefinedHTML] = useState();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const avatarWidth = isMobile ? 72 : (isTablet ? 80 : 128);
  const avatarHeight = isMobile ? 72 : (isTablet ? 80 : 128);
  const [linkProps, setLinkProps] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [lastestProduct, setLastestProduct] = useState([]);
  const router = useRouter();

  const getSellerInfo = async () => {
    const {id} = router.query;
    if (id) {
      const response = await SellerInstance.getSellerDetail(id);
      if (!response?.seller?.id) {
        return {
          notFound: true,
        };
      }

      getListRelatedProduct(response?.seller?.id);
      getListLastestProduct();
      const current = [
        {
          id: 1,
          linkLabel: 'ホーム',
          linkUrl: '/',
        },
        {
          id: 2,
          linkLabel: response?.seller?.name,
          linkUrl: '#',
        },
      ];
      setLinkProps(current);

      setSeller(response?.seller);
      setIsFollowing(response?.seller?.followed);
      const rawHTML = response?.seller?.description;
      const productsRegrex = /\[product_ids=([\s\S]*?)\]/gm;
      let match;
      let refinedHTMLGenerate = rawHTML;
      const shortcodesGenerate = [];
      let shortcodeIdx = 0;
      // eslint-disable-next-line no-cond-assign
      while (match = productsRegrex.exec(rawHTML)) {
        const shortcode = match[0];
        shortcodesGenerate.push(shortcode);

        // replace shortcode by div container
        // then, render shortcode to container in client side
        refinedHTMLGenerate = refinedHTMLGenerate.replace(shortcode, `<div id="js-shorcode-${shortcodeIdx}"></div>`);
        shortcodeIdx++;
      }
      setRefinedHTML(refinedHTMLGenerate);
      for (let i = 0; i < shortcodesGenerate.length; i++) {
        const shortcode = shortcodesGenerate[i];
        const shortcodeRegex = /\[product_ids=([\s\S]*?)\]/gm;
        let matchProd;
        const products = [];
        // eslint-disable-next-line no-cond-assign
        while (matchProd = shortcodeRegex.exec(shortcode)) {
          const productIds = matchProd[1].replace(/ /g, '').split(',');
          for (let j = 0; j < productIds.length; j++) {
            const idProduct = productIds[j];
            // eslint-disable-next-line no-await-in-loop
            const result = await ProductServiceInstance.getProductDetail(idProduct);
            if (result?.product_detail) {
              products.push({
                ...result?.product_detail,
                seller_info: result?.seller_info,
                tags: result?.product_detail.tags,
              });
            }
          }
        }
        ReactDOM.render(<ProductSwiperSeller items={products}/>, document.getElementById(`js-shorcode-${i}`));
      }
    }
  };

  const getListRelatedProduct = async (id) => {
    const result = await ProductServiceInstance.getProducts({seller_ids: id, per_page: 3});
    if (result && result.products.length) {
      setRelatedProduct(result.products);
    }
  };

  const getListLastestProduct = async () => {
    const result = await ProductServiceInstance.getProducts({per_page: 3});
    if (result && result.products.length) {
      setLastestProduct(result.products);
    }
  };

  useEffect(() => {
    getSellerInfo();
  }, [router]);
  return (
    <DefaultLayout title={seller?.name}>
      <div className={classes.root}>
        <div className={classes.topBanner}>
          <Container
            maxWidth='lg'
            className={classes.topContainer}
          >
            <Grid
              item={true}
              xs={12}
            >
              {linkProps && (
                <Breadcrumbs linkProps={linkProps}/>
              )}
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
                      value={seller?.rating || 1}
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
                  className={clsx(classes.btnFollow, isFollowing ? classes.isFollowing : '')}
                >
                  {isFollowing ? 'フォロー中' : 'フォローする'}
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
        {relatedProduct?.length ? (
          <CategoryBlock
            category='この生産者の商品'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <ProductSwiperSeller items={relatedProduct}/>
          </CategoryBlock>) : null
        }

        {lastestProduct?.length ? (
          <CategoryBlock
            category='オススメ商品'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            <ProductSwiperSeller items={lastestProduct}/>
          </CategoryBlock>) : null
        }

      </div>
    </DefaultLayout>
  );
};

export default Seller;
