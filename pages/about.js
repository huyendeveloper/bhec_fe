import Head from 'next/head';
import Image from 'next/image';

import {Box, Container, Grid, Icon, useMediaQuery} from '@material-ui/core';

import {makeStyles, useTheme} from '@material-ui/core/styles';

import {Swiper, SwiperSlide} from 'swiper/react';

import {Header} from '../components/Layout/Header';
import {Footer} from '../components/Layout/Footer';
import {ContentBlock} from '../components/ContentBlock';
import {FeatureWidget} from '../components/Widgets/FeatureWidget';
import {StepWidget as ProductArrivalStep} from '../components/Widgets/StepWidget';
import {ProductWidget} from '../components/Widgets/ProductWidget';
import {Button} from '../components/Button';
import {FaqsWidget} from '../components/Widgets/FaqsWidget';

// Import Swiper styles
import 'swiper/swiper.min.css';
import TopBannerWidget from '../components/Widgets/TopBannerWidget/TopBannerWidget';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  supportSystemWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '26.75rem',
      padding: '0',
    },
  },
}));

export default function About() {
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
    {
      productId: 5,
      productName: '『大好評』箱根寄木細工についてご紹介しています。',
      productThumb: '/img/products/product-05.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
      productPrice: 45753,
      productOwner: {
        name: '金指　勝悦',
        avatar: '/img/sellers/seller-05.png',
        introduction: '箱根寄木細工　伝統工芸士',
      },
    },
    {
      productId: 6,
      productName: '『大好評』江戸木版画についてご紹介しています。',
      productThumb: '/img/products/product-06.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}],
      productPrice: 180630,
      productOwner: {
        name: '高橋 由貴子',
        avatar: '/img/sellers/seller-06.png',
        introduction: '三越百貨店 友の会 版画教室主宰',
      },
    },
    {
      productId: 7,
      productName: '『大好評』東京手描友禅についてご紹介しています。',
      productThumb: '/img/products/product-07.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}],
      productPrice: 35700,
      productOwner: {
        name: '岩間 奨',
        avatar: '/img/sellers/seller-07.png',
        introduction: '東京手描友禅･手描部門',
      },
    },
    {
      productId: 8,
      productName: '『大好評』江戸和竿についてご紹介しています。',
      productThumb: '/img/products/product-08.png',
      productUrl: '#',
      productTags: [{name: '送料無料', isFeatured: true}, {name: '農薬節約栽培'}, {name: '期間限定'}],
      productPrice: 89620,
      productOwner: {
        name: '中台泰夫',
        avatar: '/img/sellers/seller-08.png',
        introduction: '竿中',
      },
    },
  ];
  const faqsData = [
    {
      id: 1,
      question: '利用料金はかかりますか？',
      answer: '利用料金は一切かかりません。商品の代金+送料のみでお買い物をお楽しみいただけます。',
    },
    {
      id: 2,
      question: 'どんな生産者さんが登録していますか？',
      answer: '利用料金は一切かかりません。商品の代金+送料のみでお買い物をお楽しみいただけます。',
    },
    {
      id: 3,
      question: '従来の直送サービとの違いはなんですか？',
      answer: '利用料金は一切かかりません。商品の代金+送料のみでお買い物をお楽しみいただけます。',
    },
    {
      id: 4,
      question: 'よくある質問？',
      answer: '利用料金は一切かかりません。商品の代金+送料のみでお買い物をお楽しみいただけます。',
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>{'About - Oshinagaki Store'}</title>
        <meta
          name='description'
          content='Generated by NextJs'
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className='content'>

        <TopBannerWidget
          imgSrc='/img/video-banner.png'
          imgAlt='Oshinagaki Store'
          imgWidth={1366}
          imgHeight={640}
        />

        <ContentBlock
          title='おしながきの特徴'
          description={'生産者から直送！新鮮で厳選された商品をお届けするのは今や当たり前！\n' +
          'おしながきではこんな特徴があります'}
        >
          <Grid
            container={true}
            justify='center'
            spacing={3}
          >
            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <FeatureWidget
                title='見つかる'
                iconSrc='/img/found.png'
              >
                {'自分だけの'} <br/>
                {'こだわり商品を簡単に'} <br/>
                {'見つけることができる！'}
              </FeatureWidget>
            </Grid>
            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <FeatureWidget
                title='知る'
                iconSrc='/img/know.png'
              >
                {'生産者やつくられ方'} <br/>
                {'歴史や文化まで'} <br/>
                {'知ることができる！'}
              </FeatureWidget>
            </Grid>
            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <FeatureWidget
                title='応援する'
                iconSrc='/img/support.png'
              >
                {'商品を購入することで'} <br/>
                {'ふるさとや好きな地域を'} <br/>
                {'応援することができる！'} <br/>
                <span
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: '1.375rem',
                    color: '#444',
                    marginTop: '1rem',
                    display: 'inline-block',
                  }}
                >{'*利益の2%を地方へ還元'}</span>
              </FeatureWidget>
            </Grid>
          </Grid>
        </ContentBlock>

        <ContentBlock
          title='充実のサポート体制'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          <Container>
            <Grid
              container={true}
              justify='center'
              alignItems='center'
            >
              <Box
                py={4}
                className={classes.supportSystemWrapper}
              >
                <Image
                  src='/img/support-system-lifecycle.png'
                  width={692}
                  height={692}
                  alt='Support system lifecycle'
                />
              </Box>
            </Grid>
          </Container>
        </ContentBlock>

        <ContentBlock title='簡単３ステップで商品到着'>
          <Grid
            container={true}
            justify='center'
            spacing={3}
          >
            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <ProductArrivalStep
                title='Step1'
              >
                <Box fontWeight='bold'>
                  {'スマホやPCから'} <br/>
                  {'商品を選択して簡単注文！'}
                </Box>
                <Box
                  textAlign='center'
                  mt={2}
                  mb={-4}
                >
                  <Image
                    width={217}
                    height={207}
                    alt='簡単３ステップで商品到着 - STEP1'
                    src='/img/product-arrival-step-1.png'
                  />
                </Box>
              </ProductArrivalStep>
            </Grid>

            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <ProductArrivalStep
                title='Step2'
              >
                <Box
                  lineHeight='4rem'
                  fontWeight='bold'
                >
                  {'発送を待つだけ'}
                </Box>
                <Box
                  textAlign='center'
                  mt={2}
                  mb={-4}
                >
                  <Image
                    width={217}
                    height={207}
                    alt='簡単３ステップで商品到着 - STEP2'
                    src='/img/product-arrival-step-2.png'
                  />
                </Box>
              </ProductArrivalStep>
            </Grid>

            <Grid
              item={true}
              xs={12}
              sm={4}
            >
              <ProductArrivalStep
                title='Step3'
              >
                <Box
                  lineHeight='4rem'
                  fontWeight='bold'
                >
                  {'お家で受け取り'}
                </Box>
                <Box
                  textAlign='center'
                  mt={2}
                  mb={-4}
                >
                  <Image
                    width={217}
                    height={207}
                    alt='簡単３ステップで商品到着 - STEP3'
                    src='/img/product-arrival-step-3.png'
                  />
                </Box>
              </ProductArrivalStep>
            </Grid>
          </Grid>
        </ContentBlock>

        <ContentBlock
          title='初めての方にオススメ！'
          bgColor='#FAF6EF'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          {isMobile ? (
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
                  key={index}
                >
                  <ProductWidget data={product}/>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Grid
              container={true}
              justify='center'
              spacing={3}
            >
              {recommendProducts.map((product, index) => (
                <Grid
                  key={index}
                  item={true}
                  xs={12}
                  sm={4}
                  md={3}
                >
                  <ProductWidget data={product}/>
                </Grid>
              ))}
            </Grid>
          )}

          <Box
            mt={isMobile ? 3 : 6}
            textAlign='center'
          >
            <Button
              variant='pill'
              customColor='red'
              customSize='extraLarge'
              endIcon={<Icon>{'chevron_right'}</Icon>}
            >
              {'オススメ商品をもっと見る'}
            </Button>
          </Box>
        </ContentBlock>

        <ContentBlock
          title='よくある質問'
        >
          <FaqsWidget data={faqsData}/>
        </ContentBlock>

      </div>

      <Footer/>
    </div>
  );
}
