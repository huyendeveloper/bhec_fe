import {atom} from 'recoil';

import persistAtom from './persistAtom';

export const userState = atom({
  key: 'userState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
