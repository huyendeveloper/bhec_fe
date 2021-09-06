import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Provider} from 'next-auth/client';
import NextNprogress from 'nextjs-progressbar';
import {RecoilRoot} from 'recoil';

import theme from '../theme';
import './../styles/globals.css';

import DebugObserver from '~/store/debugObserver';

const MyApp = (props) => {
  const {Component, pageProps} = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider session={pageProps.session}>
      <>
        <Head>
          <title>{'Oshinagaki'}</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
          <link
            rel='icon'
            href='/favicon.ico'
          />
          <link
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
            rel='stylesheet'
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline/>
          <NextNprogress
            color={theme.progressBar.color}
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <RecoilRoot>
            <Component {...pageProps}/>

            {/* eslint-disable-next-line no-warning-comments */}
            {/* TODO: off this feature before publishing */}
            <DebugObserver/>
          </RecoilRoot>
        </ThemeProvider>
      </>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
