import React, {useState} from 'react';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/thumbs/thumbs.min.css';

// import Swiper core and required modules
import SwiperCore, {
  Navigation, Thumbs,
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);
import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {useRecoilValue} from 'recoil';

import {productState} from '~/store/productState';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0px',
  },
  thumbnail: {
    borderRadius: 4,
    paddingBottom: '1rem',
  },
  preview: {
    borderRadius: 4,
    '& div.swiper-slide': {
      opacity: 0.4,
    },
    '& div.swiper-slide-thumb-active': {
      opacity: 1,
      border: '1px solid #BA2636',
    },
  },
}));

const ProductGallery = () => {
  const classes = useStyles();
  const product = useRecoilValue(productState);
  const images = product?.productDetail?.images || [];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className={classes.root}>
        <Swiper
          style={{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}}
          loop={true}
          spaceBetween={10}
          navigation={false}
          thumbs={{swiper: thumbsSwiper}}
          className={classes.thumbnail}
        >
          {images && images.length > 0 ? images.map((img) => (
            <SwiperSlide key={img.id}>
              <Image
                src={img.src}
                alt='banner top'
                layout='responsive'
                width='558'
                height='368'
                objectFit='contain'
              />
            </SwiperSlide>
          )) : null}
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
          {images && images.length ? images.map((img) => (
            <SwiperSlide key={img.id}>
              <Image
                src={img.src}
                alt='banner top'
                layout='responsive'
                width='99'
                height='64'
                objectFit='contain'
              />
            </SwiperSlide>
          )) : null}
        </Swiper>
      </div>
    </>
  );
};

export default ProductGallery;
