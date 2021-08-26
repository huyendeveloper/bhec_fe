
// source validate creditcard
// https://developer.globalpay.com/resources/test-card-numbers#card-type-string

const isAmexCardnumber = (inputtxt) => {
  const cardno = /^(?:3[47][0-9]{13})$/;
  return cardno.test(inputtxt);
};

const isVisaCardnumber = (inputtxt) => {
  const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return cardno.test(inputtxt);
};

const isMasterCardnumber = (inputtxt) => {
  const cardno = /^(?:5[1-5][0-9]{14})$/;
  return cardno.test(inputtxt);
};

const isDiscoverCardnumber = (inputtxt) => {
  const cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  return cardno.test(inputtxt);
};

const isDinerClubCardnumber = (inputtxt) => {
  const cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
  return cardno.test(inputtxt);
};

const isJCBCardnumber = (inputtxt) => {
  const cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
  return cardno.test(inputtxt);
};

export const serialize = (obj) => {
  var str = [];
  for (var p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(p + '=' + obj[p]);
    }
  }
  return str.join('&');
};

export const clean = (obj) => {
  for (var propName in obj) {
    // eslint-disable-next-line no-undefined
    if (!obj[propName] || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export const checkCreditCardType = (cardNumber) => {
  let cardType = null;
  if (isVisaCardnumber(cardNumber)) {
    cardType = 'VISA';
  } else if (isMasterCardnumber(cardNumber)) {
    cardType = 'MC';
  } else if (isAmexCardnumber(cardNumber)) {
    cardType = 'AMEX';
  } else if (isDiscoverCardnumber(cardNumber)) {
    cardType = 'DISCOVER';
  } else if (isDinerClubCardnumber(cardNumber)) {
    cardType = 'DINERS';
  } else if (isJCBCardnumber(cardNumber)) {
    cardType = 'JCB';
  }
  return cardType;
};
