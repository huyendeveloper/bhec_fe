import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {makeStyles} from '@material-ui/core/styles';
import {Icon} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative', //borderRadius: '1rem',
    '& div.react-multi-carousel-list': {
      position: 'unset',

      '& .arrow': {
        position: 'absolute',
        outline: 0,
        transition: 'all 0.5s',
        borderRadius: '35px',
        zIndex: 1000,
        background: '#ffff',
        border: '1px solid #DBDBDB',
        boxSizing: 'border-box',
        minWidth: '53px',
        minHeight: '53px',
        opacity: 1,
        cursor: 'pointer',
        '&:hover': {
          background: '#E6B422',
          color: '#fff',
          border: 0,
        },
      },
      '& .left': {
        left: '-1.5rem',
      },
      '& .right': {
        right: '-1.5rem',
      },
      '& .react-multi-carousel-dot button': {
        borderColor: '#E6B422',
      },
      '& .react-multi-carousel-dot--active button': {
        background: '#E6B422',
      },
      '& .react-multi-carousel-item div': {
        borderRadius: '4px',
      },
      '& .react-multi-carousel-dot-list': {
        bottom: '-2rem',
      },
    },
  },
}));

const responsive = {
  superLargeDesktop: {
    breakpoint: {max: 4000, min: 3000},
    items: 2,
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

// eslint-disable-next-line react/prop-types
const CustomRight = ({onClick}) => (
  <button
    className={'arrow right'}
    onClick={onClick}
  >
    <Icon>{'east'}</Icon>
  </button>
);

// eslint-disable-next-line react/prop-types
const CustomLeft = ({onClick}) => (
  <button
    className={'arrow left'}
    onClick={onClick}
  >
    <Icon>{'west'}</Icon>
  </button>
);

const Slider = ({data}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Carousel
          swipeable={true}
          draggable={false}
          responsive={responsive}
          ssr={true}
          showDots={true}
          autoPlay={true}
          infinite={true}
          removeArrowOnDeviceType={['mobile', 'tablet']}
          customRightArrow={<CustomRight/>}
          customLeftArrow={<CustomLeft/>}
        >
          {data && data.length > 0 ? data.map((slider) => (
            <Image
              key={slider.id}
              src={slider.img}
              alt='banner top'
              layout='responsive'
              width='1600'
              height='900'
            />
          )) : null}
        </Carousel>
      </div>
    </>
  );
};

Slider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Slider;
