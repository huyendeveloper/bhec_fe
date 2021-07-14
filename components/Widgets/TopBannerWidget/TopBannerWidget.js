import PropTypes from 'prop-types';
import Image from 'next/image';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      height: '65vh',
      width: '100%',
      position: 'relative',
    },
  },
}));

const TopBannerWidget = ({isMobile, imgSrc, imgAlt, imgWidth, imgHeight}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
    </div>
  );
};

TopBannerWidget.propTypes = {
  isMobile: PropTypes.bool,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  imgHeight: PropTypes.number.isRequired,
};

TopBannerWidget.defaultProps = {
  isMobile: false,
  imgSrc: '',
  imgAlt: '',
  imgWidth: 1366,
  imgHeight: 640,
};

export default TopBannerWidget;
