const formatters = {
  default: new Intl.NumberFormat('ja-JP'),
  frac1: new Intl.NumberFormat('ja-JP', {
    style: 'decimal',
    minimumFractionDigits: 1,
  }),
  frac2: new Intl.NumberFormat('ja-JP', {
    style: 'decimal',
    minimumFractionDigits: 2,
  }),
  currency: new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }),
  percent: new Intl.NumberFormat('ja-JP', {style: 'percent'}),
};

const format = (value, options = null, locales = null) => {
  if (locales == null) {
    if (options == null) {
      return formatters.default.format(value);
    }

    if (typeof options === 'string' && options in formatters) {
      return formatters[options].format(value);
    }

    // eslint-disable-next-line no-param-reassign
    locales = 'ja-JP';
  }

  return new Intl.NumberFormat(locales, options).format(value);
};

export default format;
