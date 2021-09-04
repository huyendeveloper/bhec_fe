export const rules = {
  required: {
    value: true,
    message: '必須項目です。',
  },
  isEmail: {
    // eslint-disable-next-line no-useless-escape
    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '無効なメールアドレスです。',
  },
  isPhoneNumber: {
    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    message: '無効な電話番号。',
  },
  minLength: (length) => ({
    message: `${length}文字以上で入力してください。`,
  }),
};
