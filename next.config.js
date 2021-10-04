// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// eslint-disable-next-line no-undef
const {withSentryConfig} = require('@sentry/nextjs');

const moduleExports = {
  reactStrictMode: false,
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    VERITRANS_TOKEN_SERVER_ENDPOINT: process.env.VERITRANS_TOKEN_SERVER_ENDPOINT,
    VERITRANS_TOKEN_API: process.env.VERITRANS_TOKEN_API,
    API_DEFAULT_ENDPOINT: process.env.API_DEFAULT_ENDPOINT,
    APP_ENV: process.env.APP_ENV,
  },

  images: {
    domains: process.env.IMAGE_DOMAIN_NAME.split(','),
  },
};

const SentryWebpackPluginOptions = {

  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// eslint-disable-next-line no-undef
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
