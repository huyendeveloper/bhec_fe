import {Backdrop, CircularProgress, ClickAwayListener, Link, useMediaQuery} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useSession} from 'next-auth/client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useRecoilState} from 'recoil';

import {Footer, Header} from '~/components';
import {loadingState} from '~/store/loadingState';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    '& .next-link': {
      textDecoration: 'none',
    },
  },
  backdrop: {
    zIndex: 9999,
    color: theme.palette.white.main,
  },

  nav: {
    flexBasis: '15.5rem',
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '48px 40px',
    boxShadow: 'inset -2px 0px 4px rgb(0 0 0 / 10%)',
  },
  main: {
    position: 'relative',
    flexGrow: 1,
  },

  naviLink: {
    fontSize: '0.8125rem',
    lineHeight: '1.5rem',
    marginBottom: '2rem',
    color: theme.palette.black3.main,
    textDecoration: 'none',
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
    name: '特集',
    url: '/articles',
  },

  // eslint-disable-next-line no-warning-comments
  // TODO: not implemented yet
  // {
  //   name: 'お買い物ガイド',
  //   url: '/',
  // },
];

const DefaultLayout = ({title, metaDescription, children}) => {
  const classes = useStyles();
  const [loading, setLoading] = useRecoilState(loadingState);
  const [, loadingPage] = useSession();
  const [openNav, setOpenNav] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  React.useEffect(() => {
    setLoading(loadingPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPage]);

  const clickOutSide = () => {
    if (openNav) {
      setOpenNav(false);
    }
  };

  return (
    <div className={classes.root}>
      <Head>
        <title className={classes.root}>{title}</title>
        <meta
          name='description'
          content={metaDescription}
        />
      </Head>
      {openNav && (isTablet || isMobile) &&
        <ClickAwayListener onClickAway={() => clickOutSide()}>
          <div className={classes.nav}>
            {listNavigation.map((nav) =>
              (
                <Link
                  href={nav.url}
                  key={nav.name}
                  style={{marginBottom: '2rem'}}
                >
                  <a className={classes.naviLink}>
                    {nav.name}
                  </a>
                </Link>
              ),
            )}
          </div>
        </ClickAwayListener>
      }
      <div
        className={classes.main}
        style={{width: openNav ? 'width: calc(100% - 15.5rem)' : '100%'}}
      >
        <Header
          showMainMenu={false}
          setOpenNav={setOpenNav}
          openNav={openNav}
        />

        <div className='content'>
          {children}
        </div>

        <Footer/>
      </div>
      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
        <CircularProgress color={'inherit'}/>
      </Backdrop>
    </div>
  );
};

DefaultLayout.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  children: PropTypes.any,
};

export default DefaultLayout;
