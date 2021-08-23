import React from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {Avatar, Container, Grid, Table, TableBody, TableContainer, TableRow, TableCell, Typography, useMediaQuery, Chip, Box} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

import {Header, Footer, Button, CategoryBlock, Search, ProductGallery, SelectBox, Breadcrumbs} from '~/components';
import {ProductWidget, RatingWidget} from '~/components/Widgets';
import 'swiper/swiper.min.css';
import {ProductService} from '~/services';
const Product = new ProductService();
import {cookieUtil} from '~/modules/cookieUtil';

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
function ProductDetail({productDetail, sellerInfo, sellerProduct, recommendProduct}) {
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

  const generateSelectQuantity = () => {
    const arrQuantity = [{name: '選択する', value: '0'}];
    for (let i = 1; i <= productDetail.maximum_quantity; i++) {
      arrQuantity.push({name: i, value: i});
    }
    return (
      arrQuantity
    );
  };

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const currency = new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'});
  const router = useRouter();

  const renderProduct = (productData) => {
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
          {productData.map((product, index) => (
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
          slidesPerView={3}
          spaceBetween={24}
          pagination={{
            clickable: true,
          }}
          className='productSwiper'
        >
          {productData.map((product, index) => (
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
        justifyContent='center'
        spacing={3}
      >
        {productData.map((product, index) => (
          <Grid
            key={String(index)}
            item={true}
            xs={12}
            sm={4}
            md={4}
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

  const handleAddCart = () => {
    const dataAdd = {
      product_id: productDetail.id,
      name: productDetail.name,
      price: productDetail.price,
      quantity: productDetail.maximum_quantity,
      quantity_user: 1,
      thumbnail: productDetail.images.length > 0 ? productDetail.images[0] : '',
      seller_id: sellerInfo.id,
    };

    const cartItems = cookieUtil.getCookie('cartItems') ? JSON.parse(cookieUtil.getCookie('cartItems')) : [];

    //console.log(cartItems);
    if (!cartItems.length > 0) {
      cartItems.push(dataAdd);
      cookieUtil.setCookie('cartItems', JSON.stringify(cartItems));
      router.push('/cart');//redirect to cart page
      return;
    }

    //If the same seller -> add to cart and redirect to cart page
    const sameSeller = cartItems.find((item) => item.seller_id === sellerInfo.id);
    if (sameSeller) {
      const existItem = cartItems.find((item) => item.id === productDetail.id);
      if (existItem) {
        router.push('/cart');
        return;
      }

      cartItems.push(dataAdd);
      cookieUtil.setCookie('cartItems', JSON.stringify(cartItems));
      router.push('/cart');
    } else {
      // eslint-disable-next-line no-alert
      window.alert('cannot add other seller');
    }
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
        <Grid
          key={productDetail.id}
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
              <Typography variant={'h2'}>{productDetail.name}</Typography>
            </div>
          </Grid>
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={6}
          >
            <ProductGallery images={productDetail.images}/>
            <Box
              component='div'
              className={classes.tag}
            >
              {productDetail.tags.map((tag) => (
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
                rating={productDetail.rating}
              />
              <span className={'noRating'}>{productDetail.no_rating}{'個の評価'}</span>
            </Box>

            <Box
              component='div'
            >
              <span className={'price'}>{currency.format(productDetail.price)}</span>
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
                          options={generateSelectQuantity()}
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
                      <TableCell align='left'>{productDetail.shipping_type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {'発送'}
                      </TableCell>
                      <TableCell align='left'>{productDetail.shipping_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component='th'
                        scope='row'
                      >
                        {'発送日数'}
                      </TableCell>
                      <TableCell align='left'>{productDetail.shipping_days}</TableCell>
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
                onClick={handleAddCart}
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
              dangerouslySetInnerHTML={{__html: `${productDetail.description}`}}
            />

          </Grid>
        </Grid>

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
              alt={sellerInfo.name}
              src={sellerInfo.avatar_url}
              className={'avatar'}
            />
            <Box
              component='div'
            >
              <Typography
                component={'h5'}
                className={'name'}
              >
                {sellerInfo.name}
              </Typography>
              <Typography
                component={'p'}
                className={'profileLink'}
              >
                {sellerInfo.catch_phrase}
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
              dangerouslySetInnerHTML={{__html: `${sellerInfo.introduction}`}}
            />
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
          <Box
            component='div'
            dangerouslySetInnerHTML={{__html: `${sellerInfo.description}`}}
          />
        </Grid>
      </Container>

      {/* Seller Product*/}
      <CategoryBlock
        category='この生産者の商品'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct(sellerProduct)}
      </CategoryBlock>

      {/* Recommend Product*/}
      <CategoryBlock
        category='オススメ商品'
        bgImage='/img/noise.png'
        bgRepeat='repeat'
        mixBlendMode='multiply'
      >
        {renderProduct(recommendProduct)}
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

export async function getServerSideProps({params}) {
  const {id} = params;
  const res = id ? await Product.getProductDetail(id) : null;
  if (!res?.product_detail?.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productDetail: res.product_detail,
      sellerInfo: res.seller_info,
      sellerProduct: res.seller_products,
      recommendProduct: res.recommend_products,
    },
  };
}
ProductDetail.propTypes = {
  productDetail: PropTypes.object,
  sellerInfo: PropTypes.object,
  sellerProduct: PropTypes.array,
  recommendProduct: PropTypes.array,
};

export default ProductDetail;
