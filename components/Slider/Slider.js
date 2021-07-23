import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 4000, min: 3000},
    items: 5,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 1,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
};

const Slider = ({data}) => {
  return (
    <>
      <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={true}
        showDots={true}
        autoPlay={true}
        infinite={true}
        removeArrowOnDeviceType={['mobile', 'tablet']}
      >
        {data && data.length > 0 ? data.map((slider) => (
          <Image
            key={slider.id}
            src={slider.img}
            alt='banner top'
            layout='responsive'
            width='1366'
            height='600'
          />
        )) : null}
      </Carousel>
    </>
  );
};

Slider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Slider;
