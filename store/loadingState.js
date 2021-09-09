import {atom} from 'recoil';

import persistAtom from './persistAtom';

export const loadingState = atom({
  key: 'loadingState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
