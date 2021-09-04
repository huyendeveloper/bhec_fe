import {Avatar, Box, Container, Grid, makeStyles, Typography, useMediaQuery, useTheme} from '@material-ui/core';
import {Swiper, SwiperSlide} from 'swiper/react';
import React from 'react';
import {useRecoilValue} from 'recoil';

import CategoryBlock from '../CategoryBlock';
import {ProductWidget} from '../Widgets';

import {productState} from '~/store/productState';

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
  },
  introduction: {
    padding: '2rem 0 3rem',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
  },
  description: {
    padding: '2rem 0 3rem',
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
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
  },
}));

const SellerInfo = () => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const sellerInfo = product?.sellerInfo;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const renderProductItems = (items) => {
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
          {items.map((item, index) => (
            <SwiperSlide
              style={{width: '70%'}}
              key={String(index)}
            >
              <ProductWidget
                data={item}
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
          {items.map((item, index) => (
            <SwiperSlide
              style={{width: '90%'}}
              key={String(index)}
            >
              <ProductWidget
                data={item}
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
        {items.map((item, index) => (
          <Grid
            key={String(index)}
            item={true}
            xs={12}
            sm={4}
            md={4}
          >
            <ProductWidget
              data={item}
              heart={true}
            />
          </Grid>
        ))}
      </Grid>
    );
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

          {/* eslint-disable-next-line no-warning-comments */}
          {/* TODO: not implemented yet: follow seller + goto seller profile */}
          {/* <Grid
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
                {'フォローする'}
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
          </Grid> */}

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

      <div className={classes.categoryBlock}>
        <CategoryBlock
          category='この生産者の商品'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          {renderProductItems(product?.sellerProduct)}
        </CategoryBlock>
      </div>

      <div className={classes.categoryBlock}>
        <CategoryBlock
          category='オススメ商品'
          bgImage='/img/noise.png'
          bgRepeat='repeat'
          mixBlendMode='multiply'
        >
          {renderProductItems(product?.recommendProduct)}
        </CategoryBlock>
      </div>
    </>
  ) : <></>;
};

export default SellerInfo;
