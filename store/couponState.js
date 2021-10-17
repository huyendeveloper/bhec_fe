import {atom} from 'recoil';

import persistAtom from './persistAtom';

export const couponState = atom({
  key: 'couponState',
  default: {
    items: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const couponEnableUseState = atom({
  key: 'couponEnableUse',
  default: {
    items: [],
  },
  effects_UNSTABLE: [persistAtom],
});
