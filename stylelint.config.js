module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended',
  ],

  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  plugins: [],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'string-quotes': 'single',
    'color-hex-length': 'long',
  },
};
