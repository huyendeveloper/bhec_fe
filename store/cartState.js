import {atom} from 'recoil';

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

export const billState = atom({
  key: 'billState',
  default: {
    net_amount: 0,
    total_shipping_fee: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
