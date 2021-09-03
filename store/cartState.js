import {atom, selector} from 'recoil';

import persistAtom from './persistAtom';

export const cartState = atom({
  key: 'cartState',
  default: {
    items: [],
    seller: null,
  },
  effects_UNSTABLE: [
    persistAtom,

    // reset if cart empty
    ({resetSelf, onSet}) => {
      onSet((newValue) => {
        if (!newValue.items?.length) {
          resetSelf();
        }
      });
    },
  ],
});

export const billState = selector({
  key: 'billState',
  get: ({get}) => {
    const {items} = get(cartState);
    const subTotal = items.reduce((total, item) => total + (parseInt(item.productDetail.price, 10) * item.quantity), 0);
    const shippingFee = items.reduce((total, item) => total + (parseInt(item.productDetail.shipping_fee ?? 0, 10) * item.quantity), 0);

    return {subTotal, shippingFee};
  },
});
