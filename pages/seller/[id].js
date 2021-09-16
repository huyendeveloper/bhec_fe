import React from 'react';
import {Container, Grid, Breadcrumbs as MuiBreadcrumbs, Link, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';

import {DefaultLayout} from '~/components/Layouts';
import {SellerInfo, Search, CategoryBlock, ProductSwiper} from '~/components';
import 'swiper/swiper.min.css';
import {ProductService} from '~/services';

const ProductServiceInstance = new ProductService();

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
    marginTop: '2rem',
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

export default function TopPage({traditional_craft, food_and_beverage}) {
  const classes = useStyles();
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
          {traditional_craft[2]?.seller_info &&
            <SellerInfo
              sellerInfo={traditional_craft[2]?.seller_info}
            />
          }
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
}

export const getServerSideProps = async () => {
  //traditional_craft
  const lstProduct1 = await ProductServiceInstance.getProducts({category: 'traditional_craft'});
  const traditional_craft = lstProduct1?.products?.length ? lstProduct1.products : [];

  //food_and_beverage
  const lstProduct2 = await ProductServiceInstance.getProducts({category: 'food_and_beverage'});
  const food_and_beverage = lstProduct2?.products?.length ? lstProduct2.products : [];

  return {
    props: {
      traditional_craft,
      food_and_beverage,
    },
  };
};

TopPage.propTypes = {
  traditional_craft: PropTypes.array,
  food_and_beverage: PropTypes.array,
  lifestyle: PropTypes.array,
  articles: PropTypes.array,
};
