import {useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropzone: {
    width: '10rem',
    height: '10rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    background: theme.palette.white.main,
    marginRight: '1.5rem',
    border: '1px dashed ' + theme.palette.gray.dark,
    borderRadius: '0.25rem',
    [theme.breakpoints.down('sm')]: {
      width: '8rem',
      height: '8rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '6rem',
      height: '6rem',
    },
    '& input': {
      left: '0',
      outline: '0',
      opacity: '0',
      position: 'absolute',
      top: '0',
      width: '100%',
      height: '100%',
    },
  },
  imageUpLoad: {
    width: '12.5rem',
    height: '12.5rem',
    objectFit: 'cover',
    borderRadius: '0.25rem',
  },
  errorMessage: {
    color: 'red',
    marginTop: '0.625rem',
  },
  closeButton: {
    position: 'absolute',
    top: '-0.625rem',
    right: '-0.625rem',
  },
  imageUpLoaded: {
    border: 'none',
  },
}));

const ImageDropzone = ({index, image, setImages, removeImage}) => {
  const classes = useStyles();
  const [haveError, setHaveError] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(null);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onload = () => {
        setHaveError(false);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const handleChange = (e) => {
    const newImage = e.target.files[0];
    if (!newImage) {
      return;
    }
    if (newImage.size >= 5000000) {
      setHaveError(true);
    } else {
      setHaveError(false);
      setImages(index, newImage);
    }
  };

  const handleRemove = () => {
    removeImage(index);
  };

  return (
    <div className={classes.root}>
      <div className={clsx({[classes.dropzone]: true, [classes.imageUpLoaded]: imagePreview})}>
        {imagePreview ? (
          <>
            <Image
              className={classes.imageUpLoad}
              src={imagePreview}
              width={200}
              height={200}
              alt={'image preview'}
            />

            <div className={classes.closeButton}>
              <Image
                src={'/img/icons/close.svg'}
                width={24}
                height={24}
                onClick={handleRemove}
                alt={'remove image'}
              />
            </div>

            <input
              type='file'
              accept='image/*'
              id='image'
              onChange={handleChange}
              style={{height: 'calc(100% - 0.625rem)', top: '0.625rem'}}
            />
          </>
        ) : (
          <>
            <Image
              src={'/img/icons/add.svg'}
              width={
                isMobile ? 48 : (isTablet ? 64 : 80)
              }
              height={
                isMobile ? 48 : (isTablet ? 64 : 80)
              }
              alt={'add'}
            />

            <input
              type='file'
              accept='image/*'
              id='image'
              onChange={handleChange}
            />
          </>
        )}
      </div>

      <div className={classes.errorMessage}>{haveError ? '5MB未満' : null}</div>
    </div>
  );
};

ImageDropzone.propTypes = {
  index: PropTypes.number,
  image: PropTypes.any,
  setImages: PropTypes.func,
  removeImage: PropTypes.func,
};

export default ImageDropzone;
