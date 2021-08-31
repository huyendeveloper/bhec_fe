/* eslint-disable no-process-env,no-undef */

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line no-undef
const {withSentryConfig} = require('@sentry/nextjs');

/*
* "reactStrictMode: true" is reason that make styled component lost styles when refresh page.
* It shows a warning in client likes: "Warning: Prop `className` did not match. Server: "MuiBox-root MuiBox-root-12" Client: "MuiBox-root MuiBox-root-13""
* and make all components render below it - with no styles
* */

const moduleExports = {
  reactStrictMode: false,
  env: {
    VERITRANS_TOKEN_SERVER_ENDPOINT: process.env.VERITRANS_TOKEN_SERVER_ENDPOINT,
    VERITRANS_TOKEN_API: process.env.VERITRANS_TOKEN_API,
    API_DEFAULT_ENDPOINT: process.env.API_DEFAULT_ENDPOINT,
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

const SentryWebpackPluginOptions = {

  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// eslint-disable-next-line no-undef
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
