import {Grid, TextareaAutosize, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {React} from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilValue} from 'recoil';

import {ConnectForm, ImageDropzone} from '~/components';
import {ErrorMessageWidget, RatingWidget} from '~/components/Widgets';
import {productState} from '~/store/productState';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '1rem',
    },
    '& h3': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      margin: '0rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.188rem',
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.75rem',
      },
    },
  },
  productName: {
    fontSize: '1.25rem',
    lineHeight: '1.875rem',
    color: theme.palette.black.default,
    margin: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingBox: {
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  guideRating: {
    marginLeft: '1rem',
    fontSize: '0.875rem',
    color: theme.palette.gray.dark,
    lineHeight: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.688rem',
    },
  },
  star: {
    width: '2.063rem',
    height: '2.063rem',
  },
  reviewComment: {
    width: '100%',
    border: '1px solid ' + theme.palette.grey.dark,
    outline: 'none',
    height: '10.625rem !important',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    borderRadius: '0.25rem',
    fontFamily: theme.font.default,
    marginBottom: '2.25rem',
    '&:focus': {
      border: '2px solid #3f51b5',
    },
    [theme.breakpoints.down('sm')]: {
      height: '7rem !important',
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
      marginBottom: '0.75rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '8rem !important',
      marginBottom: '1.5rem',
    },
    '&::placeholder': {
      color: theme.palette.grey.dark,
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
  },
  guide: {
    fontSize: '0.875rem',
    lineHeight: '1.375rem',
    color: theme.palette.black.default,
    margin: '1rem 0 2.25rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0.75rem',
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
    },
  },
  dropzoneImage: {
    display: 'flex',
  },
  imageProduct: {
    marginBottom: '2.125rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.625rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem',
    },
  },
  productThumb: {
    borderRadius: '0.25rem',
  },
  bgImg: {
    backgroundColor: theme.palette.gray.main,
    padding: '10% !important',
    objectFit: 'scale-down !important',
    borderRadius: '0.25rem',
  },
}));

const ReviewProduct = ({images, addImage, removeImage}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const product = useRecoilValue(productState);
  const productDetail = product?.productDetail;

  return (
    <ConnectForm>
      {({control, errors}) => {
        return (
          <div className={classes.root}>
            {productDetail &&
              <Grid
                container={true}
                spacing={0}
                className={classes.container}
              >
                <Grid
                  item={true}
                  md={2}
                  sm={3}
                  xs={4}
                  className={classes.imageProduct}
                  style={{paddingRight: isMobile ? '1rem' : '1.5rem'}}
                >
                  <Image
                    src={productDetail.image_urls[0] || '/logo.png'}
                    width={
                      isMobile ? 121 : (isTablet ? 145 : 170)
                    }
                    height={
                      isMobile ? 80 : (isTablet ? 96 : 112)
                    }
                    layout={'responsive'}
                    alt={productDetail.name}
                    className={clsx(classes.productThumb, productDetail.image_urls[0] ? '' : classes.bgImg)}
                  />
                </Grid>
                <Grid
                  item={true}
                  md={10}
                  sm={9}
                  xs={8}
                >
                  <h2 className={classes.productName}>
                    {productDetail.name}
                  </h2>
                </Grid>

                <Grid
                  item={true}
                  md={2}
                  sm={3}
                  xs={12}
                >
                  <h3>{'????????????'}</h3>
                </Grid>
                <Grid
                  item={true}
                  md={10}
                  sm={9}
                  xs={12}
                  className={classes.ratingBox}
                >
                  <div className={classes.stars}>
                    <RatingWidget
                      readOnly={false}
                      nameRating={'rating_product'}
                    />

                    <span className={classes.guideRating}>{'????????????????????????????????????????????????'}</span>

                  </div>

                  <ErrorMessageWidget
                    errors={errors}
                    name='rating_product'
                  />
                </Grid>

                <Grid
                  item={true}
                  md={2}
                  sm={3}
                  xs={12}
                >
                  <h3>{'??????????????????'}</h3>
                </Grid>
                <Grid
                  item={true}
                  md={10}
                  sm={9}
                  xs={12}
                >
                  <Controller
                    name='content_review_product'
                    control={control}
                    defaultValue={''}
                    render={({field: {name, value, onChange}}) => (
                      <TextareaAutosize
                        variant='outlined'
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={'?????????????????????/???????????????????????????????????????????????????????????????????????????????????????????????????'}
                        className={classes.reviewComment}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item={true}
                  md={2}
                  sm={3}
                >
                  <h3>{'????????????????????????????????????'}</h3>
                </Grid>
                <Grid
                  item={true}
                  md={10}
                  sm={9}
                >
                  <p
                    className={classes.guide}
                    style={{color: '#333333', margin: (isMobile ? '0 0 1.5rem' : (isTablet ? '0 0 1.25rem' : '0 0 1.688rem'))}}
                  >
                    {'5MB???????????????(jpg, png)???3?????????????????????????????????????????????????????????'}
                  </p>

                  <div className={classes.dropzoneImage}>
                    {images.map((item, index) => (
                      <ImageDropzone
                        key={String(index)}
                        index={index}
                        image={item}
                        setImages={addImage}
                        removeImage={removeImage}
                      />
                    ))}

                    {images.length < 3 &&
                      <ImageDropzone
                        index={images.length}
                        image={null}
                        setImages={addImage}
                        removeImage={removeImage}
                      />
                    }
                  </div>
                </Grid>
              </Grid>
            }
          </div>
        );
      }}
    </ConnectForm>
  );
};

ReviewProduct.propTypes = {
  images: PropTypes.array,
  addImage: PropTypes.func,
  removeImage: PropTypes.func,
};

ReviewProduct.defaultProps = {

};

export default ReviewProduct;
