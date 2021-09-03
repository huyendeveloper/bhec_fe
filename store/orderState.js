import {atom} from 'recoil';

import persistAtom from './persistAtom';

export const orderState = atom({
  key: 'orderState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
