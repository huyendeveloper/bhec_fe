import React from 'react';
import PropTypes from 'prop-types';
import {Grid, useMediaQuery, useTheme} from '@material-ui/core';
import {Swiper, SwiperSlide} from 'swiper/react';

import {ProductWidget} from './Widgets';

const ProductSwiper = ({items}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={24}
        pagination={{
          clickable: true,
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide
            style={{width: '70%', height: 'auto'}}
            key={String(index)}
          >
            <ProductWidget
              data={item}
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
      >
        {items?.map((item, index) => (
          <SwiperSlide
            style={{width: '90%', height: 'auto'}}
            key={String(index)}
          >
            <ProductWidget
              data={item}
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
      {items?.map((item, index) => (
        <Grid
          key={String(index)}
          item={true}
          xs={12}
          sm={4}
          md={3}
        >
          <ProductWidget
            data={item}
          />
        </Grid>
      ))}
    </Grid>
  );
};

ProductSwiper.propTypes = {
  items: PropTypes.array,
};

export default ProductSwiper;