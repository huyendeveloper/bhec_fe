import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import EmailIcon from '@material-ui/icons/Email';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  Hidden,
  IconButton, useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image';
import {useSession} from 'next-auth/client';

import {SelectBox} from '~/components';

function HideOnScroll(props) {
  const {children, window} = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  // eslint-disable-next-line no-undefined
  const trigger = useScrollTrigger({target: window ? window() : undefined});

  return (
    <Slide
      appear={false}
      direction='down'
      in={!trigger}
    >
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,

  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: theme.palette.text.primary,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  toolBar: {
    backgroundColor: '#fff',
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      minHeight: 48,
    },
    [theme.breakpoints.up('md')]: {
      height: 80,
    },
  },
  toolBarPlaceholder: {
    [theme.breakpoints.up('xs')]: {
      minHeight: 48,
      height: 48,
    },
    [theme.breakpoints.up('md')]: {
      height: 80,
    },
  },
  toolBarPersonal: {
    width: '100%',
    background: theme.palette.pink.light,
    padding: 0,
  },
  logoLink: {
    display: 'flex',
  },
  personalAction: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.pink.light,
    height: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      marginRight: 0,
      padding: '0.5rem 0',
      height: '64',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginRight: 0,
      padding: '0.5rem',
    },
    [theme.breakpoints.up('md')]: {
      width: 'max-content',
      marginRight: '1.5rem',
      padding: '0.5rem',
    },
    '.MuiLink-underlineHover:hover': {
      textDecoration: 'none',
    },
  },
  personalItem: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.8rem',
    lineHeight: '1.2rem',
    color: theme.palette.black.light,
    borderRight: `2px solid ${theme.border.default}`,
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '7.5rem',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      width: '33%',
      fontSize: '0.7rem',
    },
    [theme.breakpoints.up('xs')]: {
      width: '33%',
      fontSize: '0.7rem',
    },

    '&:last-child': {
      border: 'none',
    },
  },

  lastItem: {
    border: 'none',
  },
  iconWrapper: {
    display: 'flex',
    flexGrow: 1,
    '& button': {
      marginRight: '0.5rem',
    },
  },
}));

const Header = (props) => {
  const [session, loading] = useSession();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const logoWidth = isMobile ? 110 : (isTablet ? 138 : 162);
  const logoHeight = isMobile ? 32 : (isTablet ? 40 : 48);

  const displaySameRow = isMobile ? false : (!isTablet);

  const classes = useStyles();
  const {showMainMenu} = props;

  let isDev = process.env.NODE_ENV === 'development';
  const stagingHost = process.env.STG_HOST;
  if (typeof window !== 'undefined') {
    if (stagingHost.includes(window.location.host)) {
      isDev = true;
    }
  }

  useEffect(() => {
    if (session?.accessToken) {
      setAuthenticated(true);
    }
  }, [loading, session]);

  return (
    <>
      <div id='back-to-top-anchor'/>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.iconWrapper}>
              {showMainMenu ? (
                <Hidden lgUp={true}>
                  <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                  >
                    <MenuIcon/>
                  </IconButton>
                </Hidden>
              ) : null}
              <Link
                href={'/about'}
                className={classes.logoLink}
              >
                <a className='next-link'>
                  <Image
                    src='/logo.png'
                    alt='BH_EC Logo'
                    width={logoWidth}
                    height={logoHeight}
                  />
                </a>
              </Link>
            </div>
            {displaySameRow && isDev && <div className={classes.personalAction}>
              {isAuthenticated && <div className={classes.personalItem}>
                <PersonPinIcon/>
                {'マイページ'}
              </div>}
              {!isAuthenticated &&
              <Link href={'/auth/login'}>
                <a className='next-link'>
                  <div className={classes.personalItem} >
                    <PersonPinIcon/>
                    {'登録・ログイン'}
                  </div>
                </a>
              </Link>}
              <div className={classes.personalItem}>
                <EmailIcon/>
                {'お問い合わせ'}
              </div>
              <div className={`${classes.personalItem} ${classes.lastItem}`}>
                <ShoppingCartIcon/>
                {'カート'}
              </div>
            </div>}
            <div className={classes.languageSwitcher}>
              <SelectBox
                options={[
                  {name: '日本語', value: 'jp'},

                  // {name: 'ENG', value: 'en'},
                ]}
              />
            </div>
          </Toolbar>
          {!displaySameRow && isDev && <Toolbar className={classes.toolBarPersonal}>
            <div className={classes.personalAction}>
              {isAuthenticated && <div className={classes.personalItem}>
                <PersonPinIcon/>
                {'マイページ'}
              </div>}
              {!isAuthenticated &&
              <Link href={'/auth/login'}>
                <a className='next-link'>
                  <div className={classes.personalItem} >
                    <PersonPinIcon/>
                    {'登録・ログイン'}
                  </div>
                </a>
              </Link>}
              <div className={classes.personalItem}>
                <EmailIcon/>
                {'お問い合わせ'}
              </div>
              <div className={classes.personalItem}>
                <ShoppingCartIcon/>
                {'カート'}
              </div>
            </div>
          </Toolbar>}
        </AppBar>
      </HideOnScroll>
      <Toolbar
        className={classes.toolBarPlaceholder}
        style={{
          height: !displaySameRow && isDev ? '112px' : '80px',
        }}
      />
    </>
  );
};

Header.propTypes = {
  showMainMenu: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  showMainMenu: true,
};

export default Header;
