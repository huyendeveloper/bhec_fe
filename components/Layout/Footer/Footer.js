import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {makeStyles} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import {Box, Link} from '@material-ui/core';

import {SnsWidget} from '../../Widgets/SnsWidget';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  mainContent: {
    borderTop: '1px solid #e3e3e3',
    padding: theme.spacing(8),
  },
  footerLogo: {
    marginBottom: '1.5rem',
    display: 'inline-block',
  },
  copyRight: {
    padding: theme.spacing(3, 0),
    borderTop: '1px solid #e3e3e3',
    fontSize: '0.75rem',
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
                  width={224}
                  height={64}
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
          color='secondary'
          size='small'
          aria-label='scroll back to top'
        >
          <KeyboardArrowUpIcon/>
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Footer;
