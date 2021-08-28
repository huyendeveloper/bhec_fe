import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import {Box, Icon, Link, Grid, Divider} from '@material-ui/core';

import {SnsWidget} from './Widgets';

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
  boxLink: {
    marginTop: '3.4rem',
  },

  parentLabel: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: '700',
    color: theme.palette.black3.main,
    marginBottom: '1.5rem',
  },

  childLabel: {
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    color: theme.palette.black4.main,
    marginBottom: '0.6875rem',
  },

  grid: {
    textAlign: 'left',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '14.2%',
      flexBasis: '14.2%',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '25%',
      flexBasis: '25%',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '50%',
      flexBasis: '50%',
    },
  },

  lastGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.black3.main,
    fontSize: '0.875rem',
  },

  divider: {
    height: '1rem',
    margin: '0 1rem',
    backgroundColor: theme.palette.black4.main,
  },
}), {name: 'MuiScrollBar_InFooter'});

const linkFooter = [
  {
    label: '伝統の逸品',
    url: '/',
    linkChild: [
      {label: '漆器・漆工芸', url: '/'},
      {label: '陶磁器', url: '/'},
      {label: '染め物', url: '/'},
      {label: '織物', url: '/'},
      {label: '木工品', url: '/'},
      {label: '金工品', url: '/'},
      {label: 'ガラス工芸', url: '/'},
      {label: '人形', url: '/'},
      {label: 'その他', url: '/'},
    ],
  },
  {
    label: '食品・飲料',
    url: '/',
    linkChild: [
      {label: '農産物', url: '/'},
      {label: '水産物', url: '/'},
      {label: '畜産物', url: '/'},
      {label: '加工食品', url: '/'},
    ],
  },
  {
    label: 'ライフスタイル',
    url: '/',
    linkChild: [
      {label: 'キッチン', url: '/'},
      {label: '文具・玩具', url: '/'},
      {label: 'ファッション', url: '/'},
      {label: 'ヘルス・ビューティー', url: '/'},
    ],
  },
  {
    label: 'ブログ',
    url: '/',
    linkChild: [],
  },
  {
    label: 'お買い物ガイド',
    url: '/',
    linkChild: [
      {label: '注文', url: '/'},
      {label: 'お支払い', url: '/'},
      {label: '配送', url: '/'},
      {label: 'クーポン', url: '/'},
      {label: '会員登録・ログイン', url: '/'},
      {label: 'その他', url: '/'},
      {label: 'よくある質問', url: '/'},
    ],
  },
  {
    label: '会員登録',
    url: '/',
    linkChild: [
      {label: '新規会員登録', url: '/'},
      {label: 'ログイン', url: '/'},
      {label: 'マイページ', url: '/'},
    ],
  },
  {
    label: '出品者応募',
    url: '/',
    linkChild: [
      {label: '出品者応募フォーム', url: '/'},
      {label: '出品者ログイン', url: '/'},
    ],
  },
];

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
                    isMobile ? 163 : (isTablet ? 170 : 218)
                  }
                  height={isTablet ? 48 : 64}
                  alt={'Footer logo'}
                />
              </Link>

              <SnsWidget/>
              <Grid
                container={true}
                spacing={3}
                className={classes.boxLink}
              >
                {linkFooter && linkFooter.length > 0 ? linkFooter.map((link, index) => {
                  return (
                    <>
                      <Grid
                        item={true}
                        lg={2}
                        md={6}
                        xs={3}
                        key={`${link.label}-${String(index)}`}
                        className={classes.grid}
                      >
                        <span
                          className={classes.parentLabel}
                        >
                          {link.label}
                        </span>
                        <Grid
                          container={true}
                          className={classes.gridChildLabel}
                          style={{marginTop: '1.5rem'}}
                        >
                          {link.linkChild && link.linkChild.length > 0 ? link.linkChild.map((c, i) => {
                            return (
                              <>
                                <Grid
                                  item={true}
                                  xs={12}
                                  key={`${link.label}-${c.label}-${String(i)}`}
                                  style={{textAlign: 'left', marginBottom: '0.6875rem'}}
                                >
                                  <span
                                    className={classes.childLabel}
                                  >
                                    {c.label}
                                  </span>
                                </Grid>
                              </>
                            );
                          }) : null}
                        </Grid>
                      </Grid>
                    </>
                  );
                }) : null}
              </Grid>
              <Grid
                container={true}
                spacing={3}
              >
                <Grid
                  item={true}
                  xs={12}
                  className={classes.lastGrid}
                >
                  <span>{'会社概要'}</span>
                  <Divider
                    orientation='vertical'
                    className={classes.divider}
                  />
                  <span>{'プライバシーポリシー'}</span>
                </Grid>
              </Grid>
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
