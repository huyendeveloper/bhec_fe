import {useMediaQuery, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';
import SwiperCore, {
  Navigation, Thumbs,
} from 'swiper/core';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/swiper.min.css';
import {productState} from '~/store/productState';

SwiperCore.use([Navigation, Thumbs]);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px',
    '& img': {
      borderRadius: '0.25rem !important',
    },
  },
  thumbnail: {
    paddingBottom: '1rem',
  },
  preview: {
    borderRadius: '0.25rem',
    '& div.swiper-slide': {
      opacity: 1,
      borderRadius: '0.25rem',
      width: '6.188rem !important',
      height: '4rem',
      [theme.breakpoints.down('xs')]: {
        width: '3.875rem !important',
        height: '2.5rem',
      },
    },
    '& div.swiper-slide img': {
      borderRadius: '0.25rem',
    },
    '& div.swiper-slide-thumb-active': {
      opacity: 0.4,
      border: '1px solid #BA2636',
    },
    [theme.breakpoints.down('sm')]: {
      '& .swiper-wrapper': {
        justifyContent: 'center',
      },
    },
  },
  bgImg: {
    backgroundColor: theme.palette.gray.main,
    padding: '10% !important',
    objectFit: 'scale-down !important',
    borderRadius: '0.25rem',
  },
  productThumb: {
    borderRadius: '0.25rem',
  },
}));

const ProductGallery = () => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const images = product?.productDetail?.image_urls || [];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <Swiper
        style={{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}}
        loop={false}
        spaceBetween={10}
        navigation={false}
        thumbs={{swiper: thumbsSwiper}}
        className={classes.thumbnail}
      >
        {images?.map((img, idx) => (
          <SwiperSlide key={`slide_${idx}`}>
            <Image
              src={img || '/logo.png'}
              alt='banner top'
              width='558'
              height='368'
              objectFit='cover'
              // eslint-disable-next-line no-undefined
              layout={isTablet ? 'responsive' : undefined}
            />
          </SwiperSlide>
        ))}
        {images?.length === 0 &&
          <Image
            src={'/logo.png'}
            alt='banner top'
            width='558'
            height='368'
            // eslint-disable-next-line no-undefined
            layout={isTablet ? 'responsive' : undefined}
            className={classes.bgImg}
          />
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={12}
        slidesPerView={5}
        freeMode={true}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
        className={classes.preview}
      >
        {images?.map((img, idx) => (
          <SwiperSlide key={`slide_${idx}`}>
            <Image
              src={img || '/logo.png'}
              alt='banner top'
              layout='responsive'
              width='99'
              height='64'
              objectFit='cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
