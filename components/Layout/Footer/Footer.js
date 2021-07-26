import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import {Box, Icon, Link} from '@material-ui/core';

import {SnsWidget} from '../../Widgets/SnsWidget';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  mainContent: {
    borderTop: `1px solid ${theme.footer.borderTopColor}`,
    padding: theme.spacing(6, 6, 5.875, 6),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0, 2, 0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0, 1.875, 0),
    },
  },
  footerLogo: {
    marginBottom: '1.5rem',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1.2rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0.75rem',
    },
  },
  copyRight: {
    padding: theme.spacing(1.875, 0),
    borderTop: `1px solid ${theme.footer.borderTopColor}`,
    fontSize: '0.75rem',
  },
  scrollToTopIcon: {
    backgroundColor: theme.palette.yellow.main,
  },
}), {name: 'MuiScrollBar_InFooter'});

function ScrollTop(props) {
  const {children, window} = props;
  const classes = useStyles();

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // eslint-disable-next-line no-undefined
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    // eslint-disable-next-line no-console
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        className={classes.root}
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Footer = (props) => {
  const theme = useTheme();
  const isTablet = theme.breakpoints.down('sm');
  const isMobile = theme.breakpoints.down('sm');
  const classes = useStyles();
  return (
    <>
      <footer>
        <div className={classes.mainContent}>
          <Container>
            <Box
              textAlign={'center'}
            >
              <Link
                href={'/'}
                className={classes.footerLogo}
              >
                <Image
                  src={'/logo.png'}
                  width={
                    // eslint-disable-next-line no-nested-ternary
                    isMobile ? 163 : (isTablet ? 170 : 218)
                  }
                  height={isTablet ? 48 : 64}
                  alt={'Footer logo'}
                />
              </Link>

              <SnsWidget/>
            </Box>
          </Container>
        </div>
        <div className={classes.copyRight}>
          <Container>
            <Box textAlign={'center'}>
              {'Copyright＠BH  2021.All rights reserved.'}
            </Box>
          </Container>
        </div>
      </footer>

      <ScrollTop {...props}>
        <Fab
          className={classes.scrollToTopIcon}
          color='secondary'
          size='small'
          aria-label='scroll back to top'
        >
          <Icon>{'north'}</Icon>
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Footer;
