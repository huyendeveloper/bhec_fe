import React from 'react';

import {ButtonLink} from '../components/MyPage/ButtonLink';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ButtonLink',
  component: ButtonLink,
};

export const ButtonLinkDefault = () => (
  <ButtonLink linkLabel={'基本情報'} />
);
