import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist({
  key: 'oshinagaki',
});

export default persistAtom;
