import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {Box, useMediaQuery, useTheme} from '@material-ui/core';

const AdsWidget = ({imgSrc, imgAlt, imgWidth, imgHeight}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box textAlign='center'>
        {isTablet ? (
          <Image
            src={imgSrc}
            alt={imgAlt}
            layout={'responsive'}
            width={imgWidth}
            height={imgHeight}
          />
        ) : (
          <Image
            src={imgSrc}
            alt={imgAlt}
            layout={'intrinsic'}
            width={imgWidth}
            height={imgHeight}
          />
        )}
      </Box>
    </>
  );
};

AdsWidget.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  imgWidth: PropTypes.string.isRequired,
  imgHeight: PropTypes.string.isRequired,
};

AdsWidget.defaultProps = {
  imgAlt: 'ad',
};

export default AdsWidget;
