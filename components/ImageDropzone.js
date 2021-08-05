import {makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dropzone: {
    width: '12.5rem',
    height: '12.5rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    background: '#D8D8D8',
    marginRight: '1.25rem',
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
  },
  errorMessage: {
    color: 'red',
    marginTop: '0.625rem',
  },
  closeButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    color: theme.palette.white.main,
  },
}));

const ImageDropzone = ({index, image, setImages, removeImage}) => {
  const classes = useStyles();
  const [haveError, setHaveError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
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
      <div className={classes.dropzone}>
        {imagePreview ? (
          <>
            <Image
              className={classes.imageUpLoad}
              src={imagePreview}
              width={200}
              height={200}
              alt={'image preview'}
            />

            <HighlightOffIcon
              className={classes.closeButton}
              onClick={handleRemove}
            />

            <input
              type='file'
              accept='image/*'
              id='image'
              onChange={handleChange}
              style={{height: 'calc(100% - 2rem)', top: '2rem'}}
            />
          </>
        ) : (
          <>
            <Image
              src={'/img/icons/add.svg'}
              width={50}
              height={50}
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
