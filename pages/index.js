import url from 'url';

import React, {useEffect, useState} from 'react';
import {Container, Grid, useMediaQuery, Link} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {useSetRecoilState} from 'recoil';
import axios from 'axios';
import qs from 'qs';
import produce from 'immer';
import {signIn} from 'next-auth/client';

import {httpStatus} from '~/constants';
import {userState} from '~/store/userState';
import {DefaultLayout} from '~/components/Layouts';
import {Slider, Search, CategoryBlock, ContentBlock} from '~/components';
import {Article} from '~/components/Article';
import {AdsWidget, ProductWidget} from '~/components/Widgets';
import 'swiper/swiper.min.css';
import {ProductService, ArticleService, AuthService} from '~/services';
const Auth = new AuthService();
const ProductServiceInstance = new ProductService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
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
}));

export default function TopPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down('lg'));
  const setUser = useSetRecoilState(userState);
  const redirectURI = process.env.NEXT_PUBLIC_LINE_REDIRECT_URL;
  const clientID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET;
  const [traditional_craft, setTraditionalCraft] = useState({});
  const [food_and_beverage, setFoodAndBeverage] = useState({});
  const [lifestyle, setLifestyle] = useState({});
  const [articles, setArticles] = useState({});

  const slideData = [
    {
      id: 1,
      img: '/img/slider/slider.png',
    },
    {
      id: 2,
      img: '/img/video-banner.png',
    },
  ];

  const fetchData = async () => {
    //traditional_craft
    const lstProduct1 = await ProductServiceInstance.getProducts({category: 'traditional_craft', limit: '4'});
    setTraditionalCraft(lstProduct1?.products?.length ? lstProduct1.products : []);

    //food_and_beverage
    const lstProduct2 = await ProductServiceInstance.getProducts({category: 'food_and_beverage', limit: '4'});
    setFoodAndBeverage(lstProduct2?.products?.length ? lstProduct2.products : []);

    //lifestyle
    const lstProduct3 = await ProductServiceInstance.getProducts({category: 'lifestyle', limit: '4'});
    setLifestyle(lstProduct3?.products?.length ? lstProduct3.products : []);

    // articles
    const result = await ArticleService.getArticles({limit: 3, per_page: 3});
    if (result && result.data) {
      setArticles(result.data);
    }
  };

  useEffect(() => {
    getAccessToken(window.location.href);
    fetchData();
  }, []);

  const getAccessToken = (callbackURL) => {
    const urlParts = url.parse(callbackURL, true);
    const query = urlParts.query;
    const hasCodeProperty = Object.prototype.hasOwnProperty.call(query, 'code');
    if (hasCodeProperty) {
      const reqBody = {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: redirectURI,
        client_id: clientID,
        client_secret: clientSecret,
      };
      const reqConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      axios.post(
        'https://api.line.me/oauth2/v2.1/token',
        qs.stringify(reqBody),
        reqConfig,
      ).then(async (res) => {
        if (res.status === httpStatus.SUCCESS) {
          const result = await Auth.loginBySNS({
            type: 'line',
            id_token: res.data.id_token,
            client_id: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
          });
          if (result && result.access_token) {
            setUser(produce((draft) => {
              draft.isAuthenticated = true;
            }));
            await signIn('credentials',
              {
                data: result,
                token: result.access_token,
                redirect: false,
              },
            );
          }
        }
      }).catch(() => {
        return false;
      });
    }
  };

  return (
    <DefaultLayout title='おしながき'>
      <div className={classes.root}>
        <div className={classes.topBanner}>
          <Container
            maxWidth='lg'
            className={classes.topContainer}
          >
            <Grid
              item={true}
              xs={12}
              lg={12}
            >
              <Search/>
              <Slider data={slideData}/>
            </Grid>

          </Container>

        </div>

        {/* News */}
        {articles?.length > 0 && (
          <ContentBlock
            title='特集'
            bgColor='#F8F8F8'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >
            {articles?.length > 0 && articles?.map((article) => (
              <Grid
                key={article.id}
                container={true}
                justifyContent='space-between'
                direction='row'
                alignItems='center'
                spacing={isDesktop ? 4 : 2}
                className={classes.news}
              >
                <Grid
                  item={true}
                  xs={12}
                  sm={6}
                  lg={5}
                >
                  <Link href={`articles/${article.id}`}>
                    <Image
                      src={article.image_url ?? '/logo.png'}
                      alt='article'
                      layout='intrinsic'
                      width={364}
                      height={208}
                      objectFit={article.image_url ? 'cover' : 'contain'}
                    />
                  </Link>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                  sm={6}
                  lg={7}
                >
                  <Article
                    key={`article-${article.id}`}
                    data={article}
                  />
                </Grid>
              </Grid>
            ))
            }
          </ContentBlock>
        )}

        {/* Ads */}
        <div className={classes.advertisements}>
          <Container maxWidth='lg'>
            <Grid
              container={true}
              spacing={3}
            >
              <Grid
                item={true}
                xs={12}
                sm={6}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad1.png'}
                  imgWidth={'320'}
                  imgHeight={'100'}
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={6}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad2.png'}
                  imgWidth={'320'}
                  imgHeight={'100'}
                />
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* Product by category*/}
        {traditional_craft?.length ? (
          <div className={classes.categoryBlock}>
            <CategoryBlock
              title='オススメ商品'
              category='伝統工芸品'
              categoryLink='traditional_craft'
              bgColor='#FAF6EF'
              bgImage='/img/noise.png'
              bgRepeat='repeat'
              mixBlendMode='multiply'
            >
              <Grid
                container={true}
                spacing={3}
              >
                {traditional_craft.map((item) => (
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
          </div>) : null
        }

        {food_and_beverage?.length ? (
          <div className={classes.categoryBlock}>
            <CategoryBlock
              category='食品・飲料'
              categoryLink='food_and_beverage'
              bgColor='#FAF6EF'
              bgImage='/img/noise.png'
              bgRepeat='repeat'
              mixBlendMode='multiply'
            >
              <Grid
                container={true}
                spacing={3}
              >
                {food_and_beverage.map((item) => (
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
          </div>) : null
        }

        {lifestyle?.length ? (
          <div className={classes.categoryBlock}>
            <CategoryBlock
              category='ライフスタイル'
              categoryLink='lifestyle'
              bgColor='#FAF6EF'
              bgImage='/img/noise.png'
              bgRepeat='repeat'
              mixBlendMode='multiply'
              padding='2rem 0 4rem 0'
            >
              <Grid
                container={true}
                spacing={3}
              >
                {lifestyle.map((item) => (
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
          </div>) : null
        }

        {/* Ads */}
        <div className={classes.advertisements}>
          <Container
            maxWidth='lg'
            className={classes.blockAds}
          >
            <Grid
              container={true}
              spacing={3}
            >
              <Grid
                item={true}
                xs={12}
                sm={6}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad3.png'}
                  imgWidth={'320'}
                  imgHeight={'250'}
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={6}
              >
                <AdsWidget
                  imgSrc={'/img/ad/ad4.png'}
                  imgWidth={'320'}
                  imgHeight={'250'}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </DefaultLayout>
  );
}

TopPage.propTypes = {
  traditional_craft: PropTypes.array,
  food_and_beverage: PropTypes.array,
  lifestyle: PropTypes.array,
  articles: PropTypes.array,
};
