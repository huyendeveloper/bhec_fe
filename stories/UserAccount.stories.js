import React from 'react';

import {UserAccount} from '../components/MyPage/UserAccount';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'UserAccount',
  component: UserAccount,
};

export const UserAccountDefault = () => (
  <UserAccount />
);
