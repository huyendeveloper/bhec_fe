import {makeStyles, useTheme} from '@material-ui/core/styles';
import {React, useState} from 'react';
import {Grid, useMediaQuery, TextareaAutosize as Textarea} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';

import {RatingWidget} from '~/components/Widgets';
import {ImageDropzone} from '~/components';

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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      height: '7rem !important',
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '8rem !important',
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
    [theme.breakpoints.down('sm')]: {
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
}));

const ReviewProduct = ({product}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleSetImages = (index, newImage) => {
    if ((index + 1) > images.length) {
      setImages([...images, newImage]);
    } else {
      const newImages = [...images];
      newImages[index] = newImage;
      setImages(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className={classes.root}>
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
            src={product.productThumb}
            width={
              /* eslint-disable-next-line no-nested-ternary */
              isMobile ? 121 : (isTablet ? 145 : 170)
            }
            height={
              /* eslint-disable-next-line no-nested-ternary */
              isMobile ? 80 : (isTablet ? 96 : 112)
            }
            layout={'responsive'}
            alt={product.productName}
            className={classes.productThumb}
          />
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
          xs={8}
        >
          <h2 className={classes.productName}>
            {product.productName}
          </h2>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
          xs={12}
        >
          <h3>{'注文番号'}</h3>
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
          xs={12}
        >
          <div className={classes.stars}>
            <RatingWidget readOnly={false}/>

            <span className={classes.guideRating}>{'星をクリックして入力してください'}</span>
          </div>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
          xs={12}
        >
          <h3>{'レビュー内容'}</h3>
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
          xs={12}
        >
          <Textarea
            placeholder={'気に入ったこと/気に入らなかったことは何ですか？この製品をどのように使いましたか？'}
            maxRows={6}
            className={classes.reviewComment}
          />

          <p className={classes.guide}>
            {'案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。'}
          </p>
        </Grid>

        <Grid
          item={true}
          md={2}
          sm={3}
        >
          <h3>{'画像アップロード（任意）'}</h3>
        </Grid>
        <Grid
          item={true}
          md={10}
          sm={9}
        >
          <p
            className={classes.guide}
            /* eslint-disable-next-line no-nested-ternary */
            style={{color: '#333333', margin: (isMobile ? '0 0 1.5rem' : (isTablet ? '0 0 1.25rem' : '0 0 1.688rem'))}}
          >
            {'5MB未満の画像(jpg, png)を3枚までアップロードすることができます。'}
          </p>

          <div className={classes.dropzoneImage}>
            {images.map((item, index) => (
              <ImageDropzone
                key={String(index)}
                index={index}
                image={item}
                setImages={handleSetImages}
                removeImage={handleRemoveImage}
              />
            ))}

            {images.length < 3 &&
              <ImageDropzone
                index={images.length}
                image={null}
                setImages={handleSetImages}
                removeImage={handleRemoveImage}
              />
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ReviewProduct.propTypes = {
  product: PropTypes.object,
};

ReviewProduct.defaultProps = {

};

export default ReviewProduct;
