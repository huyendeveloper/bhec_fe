import React from 'react';
import {Container, Grid, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Image from 'next/image';

import {Header, Footer, Slider, Search, CategoryBlock, ContentBlock, ProductSwiper} from '~/components';
import {Article} from '~/components/Article';
import {AdsWidget} from '~/components/Widgets';
import 'swiper/swiper.min.css';
import {ProductService, ArticleService} from '~/services';

const ProductServiceInstance = new ProductService();
const ArticleServiceInstance = new ArticleService();

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
    [theme.breakpoints.up('md')]: {
      paddingTop: '4rem',
    },
  },
  news: {
    [theme.breakpoints.up('lg')]: {
      padding: '0rem 6.063rem',
    },
  },
  advertisements: {
    backgroundImage: 'url("/img/noise.png")',
    padding: '3rem 0',
  },
}));

export default function TopPage({traditional_craft, food_and_beverage, lifestyle, articles}) {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down('lg'));
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

  return (
    <div className={classes.root}>
      <Head>
        <title>{'おしながき'}</title>
      </Head>
      <Header showMainMenu={false}/>

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
                lg={4}
              >
                <Image
                  src={article.thumb_url ?? '/logo.png'}
                  alt='article'
                  layout='responsive'
                  width='364'
                  height='208'
                  objectFit='cover'
                />
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={6}
                lg={8}
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
        <CategoryBlock
          title='オススメ商品'
          category='伝統工芸品'
          categoryLink='traditional_craft'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          <ProductSwiper items={traditional_craft}/>
        </CategoryBlock>) : null
      }

      {food_and_beverage?.length ? (
        <CategoryBlock
          category='食品・飲料'
          categoryLink='food_and_beverage'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          <ProductSwiper items={food_and_beverage}/>
        </CategoryBlock>) : null
      }

      {lifestyle?.length ? (
        <CategoryBlock
          category='ライフスタイル'
          categoryLink='lifestyle'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          <ProductSwiper items={lifestyle}/>
        </CategoryBlock>) : null
      }

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

      <Footer/>
    </div>
  );
}

export const getServerSideProps = async () => {
  //traditional_craft
  const lstProduct1 = await ProductServiceInstance.getProducts({category: 'traditional_craft', limit: '4'});
  const traditional_craft = lstProduct1?.products?.length ? lstProduct1.products : [];

  //food_and_beverage
  const lstProduct2 = await ProductServiceInstance.getProducts({category: 'food_and_beverage', limit: '4'});
  const food_and_beverage = lstProduct2?.products?.length ? lstProduct2.products : [];

  //lifestyle
  const lstProduct3 = await ProductServiceInstance.getProducts({category: 'lifestyle', limit: '4'});
  const lifestyle = lstProduct3?.products?.length ? lstProduct3.products : [];

  // articles
  const articles = await ArticleServiceInstance.getArticles({limit: '6'});

  return {
    props: {
      traditional_craft,
      food_and_beverage,
      lifestyle,
      articles,
    },
  };
};

TopPage.propTypes = {
  traditional_craft: PropTypes.array,
  food_and_beverage: PropTypes.array,
  lifestyle: PropTypes.array,
  articles: PropTypes.array,
};
