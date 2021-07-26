import React from 'react';
import {Container, Grid, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

import {Header} from '../components/Layout/Header';
import {Footer} from '../components/Layout/Footer';
import {Slider} from '../components/Slider';
import {Article} from '../components/Article/Article';
import {Search} from '../components/Search';
import {AdsWidget} from '../components/AdsWidget';
import {CategoryBlock} from '../components/CategoryBlock';
import {ProductWidget} from '../components/Widgets/ProductWidget';
import 'swiper/swiper.min.css';
import {ContentBlock} from '../components/ContentBlock';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  topBanner: {
    backgroundImage: 'url("/img/noise.png")',
  },
  topContainer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  search: {
    paddingBottom: '2rem',
  },
  advertisements: {
    backgroundImage: 'url("/img/noise.png")',
    padding: '3rem 0',
  },
}));

export default function TopPage() {
  const slideData = [
    {
      id: 1,
      img: '/img/slider/slider.png',
    },
    {
      id: 2,
      img: '/img/slider/slider.png',
    },
  ];

  const articleData = [
    {
      id: 1,
      thumb: '/img/article/article1.png',
      title: '伊万里焼・有田焼',
      description: '伊万里焼（いまりやき）・有田焼（ありたやき）は、佐賀県有田町周辺で作られている磁器です。薄く華奢な印象の伊万里焼・有田焼ですが、どちらも陶石から作られた磁器のために耐久性に優れています。伊万里焼・有田焼の特徴は、キメが細かくなめらかな手触り、透明感のある白磁に染め付け呉須の藍と鮮やかな赤の配色です。',
    },
    {
      id: 2,
      thumb: '/img/article/article2.png',
      title: '伊万里焼・有田焼',
      description: '伊万里焼（いまりやき）・有田焼（ありたやき）は、佐賀県有田町周辺で作られている磁器です。薄く華奢な印象の伊万里焼・有田焼ですが、どちらも陶石から作られた磁器のために耐久性に優れています。伊万里焼・有田焼の特徴は、キメが細かくなめらかな手触り、透明感のある白磁に染め付け呉須の藍と鮮やかな赤の配色です。',
    },
    {
      id: 3,
      thumb: '/img/article/article3.png',
      title: '伊万里焼・有田焼',
      description: '伊万里焼（いまりやき）・有田焼（ありたやき）は、佐賀県有田町周辺で作られている磁器です。薄く華奢な印象の伊万里焼・有田焼ですが、どちらも陶石から作られた磁器のために耐久性に優れています。伊万里焼・有田焼の特徴は、キメが細かくなめらかな手触り、透明感のある白磁に染め付け呉須の藍と鮮やかな赤の配色です。',
    },
  ];

  const recommendProducts = [
    {
      productId: 1,
      productName: '『大好評』小田原漆器についてご紹介しています。',
      productThumb: '/img/products/product-01.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
      productPrice: 26600,
      productOwner: {
        name: '小田原漆器',
        avatar: '/img/sellers/seller-01.png',
        introduction: '木地部門　伝統工芸士',
      },
    },
    {
      productId: 2,
      productName: '『大好評』江戸べっ甲についてご紹介しています。',
      productThumb: '/img/products/product-02.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
      productPrice: 32800,
      productOwner: {
        name: '磯貝 剛',
        avatar: '/img/sellers/seller-02.png',
        introduction: 'ベッ甲イソガイ　統括',
      },
    },
    {
      productId: 3,
      productName: '『大好評』東京アンチモニー工芸品についてご紹介しています。',
      productThumb: '/img/products/product-03.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '期間限定'}],
      productPrice: 149300,
      productOwner: {
        name: '林　文雄',
        avatar: '/img/sellers/seller-03.png',
        introduction: 'アートランド',
      },
    },
    {
      productId: 4,
      productName: '『大好評』江戸節句人形についてご紹介しています。',
      productThumb: '/img/products/product-04.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}],
      productPrice: 184750,
      productOwner: {
        name: '松崎光正',
        avatar: '/img/sellers/seller-04.png',
        introduction: '松崎人形',
      },
    },
  ];

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const renderProduct = () => {
    if (isMobile) {
      return (
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          className='productSwiper'
        >
          {recommendProducts.map((product, index) => (
            <SwiperSlide
              style={{width: '70%'}}
              key={String(index)}
            >
              <ProductWidget data={product}/>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else if (isTablet) {
      return (
        <Swiper
          slidesPerView={2.5}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          className='productSwiper'
        >
          {recommendProducts.map((product, index) => (
            <SwiperSlide
              style={{width: '90%'}}
              key={String(index)}
            >
              <ProductWidget data={product}/>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }
    return (
      <Grid
        container={true}
        justify='center'
        spacing={3}
      >
        {recommendProducts.map((product, index) => (
          <Grid
            key={String(index)}
            item={true}
            xs={12}
            sm={4}
            md={3}
          >
            <ProductWidget data={product}/>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{'Home - BH_EC'}</title>
        <meta
          name='description'
          content='Generated by NextJs'
        />
      </Head>
      <Header showMainMenu={false}/>

      <div className={classes.topBanner}>
        <Container
          maxWidth='lg'
          className={classes.topContainer}
        >
          <div className={classes.search}>
            <Search/>
          </div>
          <Slider data={slideData}/>
        </Container>
      </div>

      {/* News */}
      <ContentBlock
        title='特集'
        bgColor='#F8F8F8'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {articleData && articleData.length > 0 ? articleData.map((article) => (
          <Grid
            key={article.id}
            container={true}
            justify='space-between'
            spacing={1}
          >
            <Grid
              item={true}
              xs={12}
              md={3}
            >
              <Image
                src={article.thumb}
                alt='article'
                layout='responsive'
                width='364'
                height='208'
              />
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={9}
            >
              <Article
                key={article.id}
                data={article}
              />
            </Grid>
          </Grid>
        )) : null
        }
      </ContentBlock>

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
              md={6}
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
              md={6}
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
      <CategoryBlock
        title='オススメ商品'
        category='伝統工芸品'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct()}
      </CategoryBlock>
      <CategoryBlock
        category='食品・飲料'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct()}
      </CategoryBlock>
      <CategoryBlock
        category='ライフスタイル'
        bgColor='#FAF6EF'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct()}
      </CategoryBlock>

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
              md={6}
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
              md={6}
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
