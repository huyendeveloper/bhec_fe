import PropTypes from 'prop-types';
import Image from 'next/image';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: '68.5vh',
      width: '100%',
      position: 'relative',
    },
  },
  titleBanner: {
    [theme.breakpoints.down('xs')]: {
      height: '10rem',
    },
  },
  pageTitle: {
    fontSize: '2.5rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: theme.topBanner.textColor,
    zIndex: 10,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}));

const TopBannerWidget = ({variant, title, imgSrc, imgAlt, imgWidth, imgHeight}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const rootClass = clsx(classes.root, classes[variant]);

  return (
    <div className={rootClass}>
      {isMobile ? (
        <Image
          src={imgSrc}
          layout={'fill'}
          objectFit={'cover'}
          alt={imgAlt}
        />
      ) : (
        <Image
          src={imgSrc}
          layout='responsive'
          width={imgWidth}
          height={imgHeight}
          alt={imgAlt}
        />
      )}
      {variant === 'titleBanner' ? (
        <Typography
          component='h2'
          variant='h4'
          className={classes.pageTitle}
        >
          {title}
        </Typography>
      ) : null}
    </div>
  );
};

TopBannerWidget.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
};

TopBannerWidget.defaultProps = {
  variant: 'default',
  title: '',
  imgSrc: '',
  imgAlt: '',
  imgWidth: 1366,
  imgHeight: 640,
};

export default TopBannerWidget;
