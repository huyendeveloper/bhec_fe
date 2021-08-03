import React from 'react';
import {Avatar, Container, Grid, Table, TableBody, TableContainer, TableRow, TableCell, Typography, useMediaQuery, Chip, Box} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

import {Header} from '../../../components/Layout/Header';
import {Footer} from '../../../components/Layout/Footer';
import {CategoryBlock} from '../../../components/CategoryBlock';
import {ProductWidget} from '../../../components/Widgets/ProductWidget';
import 'swiper/swiper.min.css';
import {Search} from '../../../components/Search';
import {ProductGallery} from '../../../components/ProductGallery';
import {RatingWidget} from '../../../components/Widgets/RatingWidget';
import {SelectBox} from '../../../components/SelectBox';
import {Breadcrumbs} from '../../../components/Breadcrumbs';
import {Button} from '../../../components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundImage: 'url("/img/noise.png")',
  },
  breadcrumbs: {
    padding: '4rem 0 0',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0 0',
    },
  },
  topContainer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  productName: {
    '& h2': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
      paddingBottom: '1rem',
    },
    [theme.breakpoints.down('md')]: {
      '& h2': {
        fontSize: '1.25rem',
        lineHeight: '1.875rem',
      },
    },
  },
  tag: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'normal',
    [theme.breakpoints.down('lg')]: {
      padding: '2rem 0 0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '2rem 0',
    },
    '& .MuiChip-root': {
      backgroundColor: '#FAF6EF',
      marginRight: '0.5rem',
      height: '2rem',
    },
  },
  productDetail: {
    [theme.breakpoints.down('lg')]: {
      padding: '1rem 0rem 1rem 1rem',
    },
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },

    '& .rate': {
      marginBottom: '0.5rem',
      '& span.noRating': {
        position: 'absolute',
        paddingTop: '3px',
        textDecoration: 'underline',
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
      },
    },
    '& span.price': {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 'bold',
    },
    '& .table': {
      maxWidth: 350,
      '& .MuiTableCell-root': {
        borderBottom: 'none !important',
        paddingLeft: 0,
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
      '& .MuiTableCell-root:first-child': {
        fontWeight: 'bold',
      },
    },
    '& div.add': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 0',
    },
  },
  description: {
    backgroundColor: '#F8F8F8',
    border: '1px solid #DBDBDB',
    borderRadius: '4px',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    [theme.breakpoints.down('lg')]: {
      margin: '3rem 0',
    },
  },
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
      },
      '& .name': {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: 'bold',
      },
      '& .profileLink': {
        fontSize: '0.875rem',
        lineHeight: '1.313rem',
        marginTop: '3px',
        fontWeight: 'normal',
      },
    },
    '& .action': {
      display: 'flex',

      [theme.breakpoints.down('lg')]: {
        justifyContent: 'flex-end',
        '& button:first-child': {
          marginRight: '1.5rem',
        },
      },
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between',
      },
    },
    '& .description': {
      padding: '2rem 0 3rem',
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
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
  banner: {
    padding: '2rem 0',
  },
}));

export default function ProductDetail() {
  const productDetail = [
    {
      id: 1,
      name: '何個もパクパク「種ごと丸ごときんかん」ミニサイズ計2kg',
      rating: 3.5,
      noRating: 203,
      price: 1950,
      description: 'ハナウタカジツのきんかんは、温室ハウスで大切に育てており、完熟収穫しています。',
      images: [
        {
          id: 1,
          src: '/img/product-details/product-detail.png',
        },
        {
          id: 2,
          src: '/img/product-details/product-detail1.png',
        },
        {
          id: 3,
          src: '/img/product-details/product-detail2.png',
        },
        {
          id: 4,
          src: '/img/product-details/product-detail3.png',
        },
        {
          id: 5,
          src: '/img/product-details/product-detail4.png',
        },
      ],
      tags: [
        {
          id: 1,
          name: '野菜',
        },
        {
          id: 2,
          name: '果物',
        },
        {
          id: 3,
          name: '慣行栽培',
        },
        {
          id: 4,
          name: '期間限定',
        },
      ],
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
      favoriteProduct: false,
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
      favoriteProduct: false,
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
      favoriteProduct: false,
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
      favoriteProduct: false,
      productOwner: {
        name: '松崎光正',
        avatar: '/img/sellers/seller-04.png',
        introduction: '松崎人形',
      },
    },
  ];
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
    },
  ];

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});

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
              <ProductWidget
                data={product}
                heart={true}
              />
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
              <ProductWidget
                data={product}
                heart={true}
              />
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
            <ProductWidget
              data={product}
              heart={true}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
  /* eslint-disable max-lines */

  return (
    <div className={classes.root}>
      <Head>
        <title>{'Product Detail - BH_EC'}</title>
        <meta
          name='description'
          content='Generated by NextJs'
        />
      </Head>
      <Header showMainMenu={false}/>

      {/* Breadcrumbs */}
      <Container
        maxWidth='lg'
      >
        <Grid
          container={true}
          spacing={0}
          className={classes.breadcrumbs}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
          >
            <Breadcrumbs linkProps={linkProps}/>
          </Grid>
        </Grid>
      </Container>
      {/* Search */}
      <Container
        maxWidth='lg'
        className={classes.topContainer}
      >
        <Search/>
      </Container>

      {/* Product details */}
      <Container maxWidth='lg'>
        {productDetail.map((product) => (
          <Grid
            key={product.id}
            container={true}
            spacing={0}
          >
            <Grid
              item={true}
              xs={12}
              md={12}
              lg={12}
            >
              <div className={classes.productName}>
                <Typography variant={'h2'}>{product.name}</Typography>
              </div>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={12}
              lg={6}
            >
              <ProductGallery images={product.images}/>
              <Box
                component='div'
                className={classes.tag}
              >
                {product.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    size='small'
                    label={`#${tag.name}`}
                  />
                ))
                }
              </Box>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={12}
              lg={6}
              className={classes.productDetail}
            >
              <Box
                component='div'
                className={'rate'}
              >
                <RatingWidget
                  readOnly={true}
                  rating={product.rating}
                />
                <span className={'noRating'}>{product.noRating}{'個の評価'}</span>
              </Box>

              <Box
                component='div'
              >
                <span className={'price'}>{currency.format(product.price)}</span>
                <span>{'（税込 / 送料別）'}</span>
              </Box>

              <Box
                component='div'
              >
                <TableContainer>
                  <Table className={'table'}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          component='th'
                          scope='row'
                        >
                          {'数量'}
                        </TableCell>
                        <TableCell align='left'>
                          <SelectBox
                            options={[
                              {name: '選択する', value: '0'},
                              {name: '1', value: '1'},
                            ]}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component='th'
                          scope='row'
                        >
                          {'配送'}
                        </TableCell>
                        <TableCell align='left'>{'常温便'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component='th'
                          scope='row'
                        >
                          {'発送'}
                        </TableCell>
                        <TableCell align='left'>{'月曜日　火曜日　水曜日'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component='th'
                          scope='row'
                        >
                          {'発送日数'}
                        </TableCell>
                        <TableCell align='left'>{'3-5日間'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box
                component='div'
                className={'add'}
              >
                <Button
                  variant='contained'
                  customColor='green'
                  customSize='medium'
                  startIcon={
                    <Image
                      src={'/img/icons/cart.svg'}
                      width={24}
                      height={24}
                      alt={'cart'}
                    />}
                >
                  {'カートに入れる'}
                </Button>
                <Button
                  variant='contained'
                  customColor='whiteRed'
                  customSize='medium'
                  customBorder='bdRed'
                  startIcon={
                    <Image
                      src={'/img/icons/heart_line.svg'}
                      width={24}
                      height={24}
                      alt={'heart'}
                    />}
                >
                  {'お気に入り'}
                </Button>
              </Box>

              <Box
                component='div'
              >
                <Button
                  customColor='red'
                  customSize='medium'
                  customWidth='fullwidth'
                  startIcon={
                    <Image
                      src={'/img/icons/click.svg'}
                      width={24}
                      height={26}
                      alt={'touch'}
                    />}
                >
                  {'今すぐ購入する'}
                </Button>
              </Box>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={12}
              lg={12}
              className={classes.description}
            >
              <Box
                component='div'
                m={4}
              >
                {/* {product.description} from API */}
                {'ハナウタカジツのきんかんは、温室ハウスで大切に育てており、完熟収穫しています。'} <br/>
                <br/>
                {'今回のきんかんは、小玉だけを集めたものです。'} <br/>
                {'小さくてポイっと食べれてオススメです。'} <br/>
                {'5円玉くらいの大きさで、みなさんにご縁が訪れたらと♪'} <br/>
                <br/>
                {'きんかんの皮の表面にある小さなブツブツは油胞(ゆほう)と呼ばれ、その油胞が出てくると完熟の合図。'} <br/>
                {'ただ、この油胞は傷付きやすく タイミングをのがすとつぶれて痛んでしまったように見えてしまいます。'} <br/>
                {'ハナウタカジツでは完熟で収穫しながらも、箱詰めする際には十分に選別しお届けさせていただいています。'} <br/>
                {'産直で直接お客さまにお届けできるからこそ、ギリギリまで樹に実らせておくことができます。'} <br/>
                <br/>
                {'よく庭木のきんかんと比べられることがあります。'} <br/>
                {'きんかんの皮の柔らかさは成長するときの気温がポイントです。'} <br/>
                {'庭木のきんかんは霜がおりると実を守ろうとして固くなってしまいます。'} <br/>
                {'ハナウタカジツのきんかんは温室ハウスで育てているため、温度や水分を調整することで実が柔らかく酸味も少なく種まで食べることができます。'}
              </Box>

            </Grid>
          </Grid>
        ))
        }
      </Container>

      {/* Seller */}
      <Container maxWidth='lg'>
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
              alt={'小田原漆器'}
              src={'/img/sellers/seller-01.png'}
              className={'avatar'}
            />
            <Box
              component='div'
            >
              <Typography
                component={'h5'}
                className={'name'}
              >
                {'小田原漆器'}
              </Typography>
              <Typography
                component={'p'}
                className={'profileLink'}
              >
                {'木地部門　伝統工芸士'}
              </Typography>
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
              <Button
                variant='contained'
                customColor='yellow'
                customSize='small'
              >
                {'プロフィール'}
              </Button>
              <Button
                variant='contained'
                customSize='small'
                customColor='white'
                customBorder='bdGray'
              >
                {'プロフィールを見る'}
              </Button>
            </Box>
          </Grid>
          <Grid
            item={true}
            xs={12}
            md={12}
            className={'description'}
          >
            <Box
              component='div'
            >
              {'私たちは、美しい水と緑に恵まれた熊本市北区植木町でおいしい果実を育てています。栽培しているのは、桃やすもも、どすこい！！横綱みかん、キンカン、はるかなど。温室栽培と完熟収穫というスタイルは、安定的においしい果実をお届けするための、私たちのこだわりです。'} <br/>
              <br/>
              {'旬の果実のみずみずしさやはじける香りと味わいで、ひとりでも多くの日常に“ハナウタ”な気分を届けたい。そんな想いを胸に、私たちは今日も家族そろって、ハナウタな果実をつくり続けています。'}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* This get from API editor */}
      <Container maxWidth='lg'>
        <div className={classes.sellerPost}>
          <Typography variant={'h5'}>{'生産者のこだわり'}</Typography>
        </div>
        <Grid
          container={true}
          spacing={3}
        >
          <Grid
            item={true}
            xs={12}
            md={4}
          >
            <Image
              src={'/img/sellers/pr1.png'}
              alt='seller post'
              layout={'intrinsic'}
              width={'267px'}
              height={'267px'}
            />
          </Grid>
          <Grid
            item={true}
            xs={12}
            md={8}
          >
            <Typography variant={'h5'}>{'会話が弾む、ハナウタな果実たち'}</Typography>
            <div>
              {'私たちにとって“ハナウタ”とは、毎日のなかにあるちいさなしあわせを表し、これをわかちあうための合い言葉でもあります。'}  <br/>
              {'みずみずしさと華やかな香りと味が際立つ白桃「はなよめ」や、皮まで甘い「種ごと丸ごとキンカン」、両国国技館前でも販売された「どすこい！！横綱みかん」など、私たちは四季折々の果実を栽培・収穫しています。'}
            </div>
          </Grid>

          <Grid
            item={true}
            xs={12}
            md={8}
          >
            <Typography variant={'h5'}>{'会話が弾む、ハナウタな果実たち'}</Typography>
            <div>
              {'私たちにとって“ハナウタ”とは、毎日のなかにあるちいさなしあわせを表し、これをわかちあうための合い言葉でもあります。'}  <br/>
              {'みずみずしさと華やかな香りと味が際立つ白桃「はなよめ」や、皮まで甘い「種ごと丸ごとキンカン」、両国国技館前でも販売された「どすこい！！横綱みかん」など、私たちは四季折々の果実を栽培・収穫しています。'}
            </div>
          </Grid>
          <Grid
            item={true}
            xs={12}
            md={4}
          >
            <Image
              src={'/img/sellers/pr2.png'}
              alt='seller post'
              layout={'intrinsic'}
              width={'267px'}
              height={'267px'}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Product by category*/}
      <CategoryBlock
        category='この生産者の商品'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct()}
      </CategoryBlock>
      <CategoryBlock
        category='オススメ商品'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct()}
      </CategoryBlock>

      {/* Banner */}
      <Container maxWidth='lg'>
        <Grid
          container={true}
          className={classes.banner}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
          >
            <Image
              src={'/img/banner-botton.png'}
              alt='banner bottom'
              layout={'responsive'}
              width={'1140'}
              height={'192'}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </div >
  );
}
