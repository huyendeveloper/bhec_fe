import {makeStyles} from '@material-ui/core/styles';
import {React, useState} from 'react';
import {Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {ImageDropzone} from '../ImageDropzone';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2.813rem',
    '& h3': {
      fontSize: '1.125rem',
      margin: '0rem',
      color: theme.palette.black.main,
    },
  },
  productName: {
    fontSize: '1.5rem',
    lineHeight: '2.188rem',
    color: theme.palette.black.main,
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.938rem',
    '& span': {
      marginLeft: '1.75rem',
      fontSize: '0.75rem',
      color: theme.palette.grey.main,
    },
  },
  star: {
    width: '2.063rem',
    height: '2.063rem',
  },
  reviewComment: {
    width: '100%',
    border: '1px solid #D8D8D8',
    outline: 'none',
    height: '10.625rem',
    padding: '0.75rem 1.625rem',
    fontSize: '0.875rem',
    lineHeight: '2.188rem',
    '&::placeholder': {
      color: '#D8D8D8',
      fontSize: '0.875rem',
      lineHeight: '2.188rem',
    },
  },
  guide: {
    fontSize: '0.875rem',
    lineHeight: '2.188rem',
    color: theme.palette.black.main,
    fontWeight: '500',
    marginBottom: '3.938rem',
  },
  imageProduct: {
    '& img': {
      marginBottom: '2.875rem !important',
    },
  },
  dropzoneImage: {
    display: 'flex',
  },
}));

const stars = [1, 2, 3, 4, 5];

const ReviewProduct = ({product}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);

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
          md={3}
          className={classes.imageProduct}
        >
          <Image
            src={product.productThumb}
            width={177}
            height={140}
            alt={product.productName}
          />
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <h2 className={classes.productName}>
            {product.productName}
          </h2>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h3>{'商品レビュー'}</h3>
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <div className={classes.stars}>
            {stars.map((item) => (
              <StarBorderIcon
                key={item}
                className={classes.star}
              />
            ))
            }

            <span>{'星をクリックして入力してください'}</span>
          </div>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h3>{'レビュー内容'}</h3>
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <textarea
            placeholder={'気に入ったこと/気に入らなかったことは何ですか？この製品をどのように使いましたか？'}
            rows={2}
            className={classes.reviewComment}
          />

          <p className={classes.guide}>
            {'案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。案内文章が入ります。'}
          </p>
        </Grid>

        <Grid
          item={true}
          md={3}
        >
          <h3>{'画像アップロード（任意）'}</h3>
        </Grid>
        <Grid
          item={true}
          md={9}
          className={classes.buttonList}
        >
          <p
            className={classes.guide}
            style={{fontSize: '1rem', margin: '0 0 1.625rem'}}
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
