import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {
  useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
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
    height: '80px',
    minHeight: '48px',
    [theme.breakpoints.down('md')]: {
      height: '64px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '48px',
    },
  },
  toolBarPlaceholder: {
    height: 80,
    [theme.breakpoints.down('sm')]: {
      height: 130,
    },
    [theme.breakpoints.down('xs')]: {
      height: 96,
    },
  },
  toolBarPersonal: {
    width: '100%',
    background: theme.palette.pink.light,
    padding: 0,
    minHeight: '48px',
  },
  logoLink: {
    display: 'flex',
  },
  personalAction: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.pink.light,
    height: '100%',
    marginRight: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
      padding: '0.5rem 0',
      height: '64px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0,
      padding: '0.5rem 0',
      height: '48px',
    },
    '.MuiLink-underlineHover:hover': {
      textDecoration: 'none',
    },
  },
  personalItem: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75',
    lineHeight: '1.2rem',
    color: theme.palette.black.light,
    borderRight: `1px solid ${theme.border.default}`,
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '6.3rem',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      width: '33%',
      fontSize: '0.75rem',
    },
    [theme.breakpoints.up('xs')]: {
      width: '33%',
      fontSize: '0.75rem',
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
    alignItems: 'center',
    '& button': {
      marginRight: '0.5rem',
    },
  },

  linkPersonal: {
    textDecoration: 'none',
    borderRight: `1px solid ${theme.border.default}`,
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    '&:last-child': {
      border: 'none',
    },
  },

  navigation: {
    margin: '0 2.5rem',
  },

  naviLink: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    margin: '0 1rem',
    color: theme.palette.black3.main,
    textDecoration: 'none',
  },

  icNav: {
    marginRight: '1rem',
  },

  languageSwitcher: {
    width: '100px',
    [theme.breakpoints.down('md')]: {
      width: '95px',
    },

    '& .MuiNativeSelect-root': {
      fontSize: '0.875rem',
    },
  },
}));

const listNavigation = [
  {
    name: '伝統工芸品',
    url: '/products?category=traditional_craft',
  },
  {
    name: '食品・飲料',
    url: '/products?category=food_and_beverage',
  },
  {
    name: 'ライフスタイル',
    url: '/products?category=lifestyle',
  },
  {
    name: 'ブログ',
    url: '/articles',
  },

  // eslint-disable-next-line no-warning-comments
  // TODO: not implemented yet
  // {
  //   name: 'お買い物ガイド',
  //   url: '/',
  // },
];

const Header = (props) => {
  const [session, loading] = useSession();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const logoWidth = isMobile ? 110 : (isTablet ? 138 : 162);
  const logoHeight = isMobile ? 32 : (isTablet ? 40 : 48);
  const {changeToggleNav} = props;

  const displaySameRow = isMobile ? false : (!isTablet);

  const classes = useStyles();

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
              {!displaySameRow && (
                <div
                  className={classes.icNav}
                  onClick={changeToggleNav}
                >
                  <Image
                    src='/menu.png'
                    alt='おしながき'
                    width={24}
                    height={24}
                  />
                </div>
              )}
              <Link
                href={'/'}
                className={classes.logoLink}
              >
                <a className='next-link'>
                  <Image
                    src='/logo.png'
                    alt='おしながき'
                    width={logoWidth}
                    height={logoHeight}
                  />
                </a>
              </Link>
            </div>
            {!isTablet && !isMobile && <div className={classes.navigation}>
              {listNavigation.map((nav, index) =>
                (
                  <Link
                    href={nav.url}
                    key={index}
                  >
                    <a className={classes.naviLink}>
                      {nav.name}
                    </a>
                  </Link>
                ),
              )}
            </div>}
            {displaySameRow && <div className={classes.personalAction}>
              {isAuthenticated &&
              <Link href={'/mypage'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem}>
                    <Image
                      src='/img/icons/ic-user.png'
                      alt='user icon'
                      width={24}
                      height={24}
                    />
                    {'マイページ'}
                  </div>
                </a>
              </Link>
              }
              {!isAuthenticated &&
              <Link href={'/auth/login'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem} >
                    <Image
                      src='/img/icons/ic-user.png'
                      alt='user icon'
                      width={24}
                      height={24}
                    />
                    {'登録・ログイン'}
                  </div>
                </a>
              </Link>}
              <Link href={'/contact'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem} >
                    <Image
                      src='/img/icons/ic-mail.png'
                      alt='mail icon'
                      width={24}
                      height={24}
                    />
                    {'お問い合わせ'}
                  </div>
                </a>
              </Link>
              <Link href={'/cart'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem}>
                    <Image
                      src='/img/icons/ic-cart.png'
                      alt='cart icon'
                      width={24}
                      height={24}
                    />
                    {'カート'}
                  </div>
                </a>
              </Link>
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
          {!displaySameRow && <Toolbar className={classes.toolBarPersonal}>
            <div className={classes.personalAction}>
              {isAuthenticated &&
              <Link href={'/mypage'}>
                <div className={classes.personalItem}>
                  <Image
                    src='/img/icons/ic-user.png'
                    alt='user icon'
                    width={24}
                    height={24}
                  />
                  {'マイページ'}
                </div>
              </Link>
              }
              {!isAuthenticated &&
              <Link href={'/auth/login'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem} >
                    <Image
                      src='/img/icons/ic-user.png'
                      alt='user icon'
                      width={24}
                      height={24}
                    />
                    {'登録・ログイン'}
                  </div>
                </a>
              </Link>}
              <Link href={'/contact'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem} >
                    <Image
                      src='/img/icons/ic-mail.png'
                      alt='mail icon'
                      width={24}
                      height={24}
                    />
                    {'お問い合わせ'}
                  </div>
                </a>
              </Link>
              <Link href={'/cart'}>
                <a className={classes.linkPersonal}>
                  <div className={classes.personalItem}>
                    <Image
                      src='/img/icons/ic-cart.png'
                      alt='cart icon'
                      width={24}
                      height={24}
                    />
                    {'カート'}
                  </div>
                </a>
              </Link>
            </div>
          </Toolbar>}
        </AppBar>
      </HideOnScroll>
      <Toolbar
        className={classes.toolBarPlaceholder}
      />
    </>
  );
};

Header.propTypes = {
  showMainMenu: PropTypes.bool.isRequired,
  changeToggleNav: PropTypes.func,
};

Header.defaultProps = {
  showMainMenu: true,
};

export default Header;
