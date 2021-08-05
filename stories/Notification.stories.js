import React from 'react';

import {Notification} from '~/components';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Notification',
  component: Notification,
};

const item = {
  id: 1,
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
  content: '通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１',
};

export const NotificationDefault = () => (
  <Notification notification={item}/>
);
