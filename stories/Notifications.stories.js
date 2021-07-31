import React from 'react';

import {Notifications} from '../components/MyPage/Notifications';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Notifications',
  component: Notifications,
};

const notifications = [
  {
    id: 1,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU',
    content: '通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１通知１'
  },
  {
    id: 2,
    avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/118120348_138608691012295_3368598954552758954_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=zobvna6cH4YAX-FOnPX&_nc_ht=scontent.fhan2-4.fna&oh=cdf46431b979d70a5d9403da1b3cddf5&oe=60E9A842',
    content: '通知2テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    id: 3,
    avatar: 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/118130438_138609147678916_8546854673126917569_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=730e14&_nc_ohc=vCMWa0geYcAAX_VjvEN&_nc_ht=scontent.fhan2-2.fna&oh=d9ebfff6e94fb6b426f6351c1d17a22d&oe=60EAEF92',
    content: '通知3テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    id: 4,
    avatar: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/118244407_138609421012222_1365876984576339345_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=GPZdtK7YOsYAX8mV13x&_nc_ht=scontent.fhan2-3.fna&oh=3cd3b2007bbc36fc9636745a26c8986a&oe=60EB2525',
    content: '通知4テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  },
  {
    id: 5,
    avatar: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/118085458_138609757678855_3178253792016555066_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=uTc-LurerLkAX-p3nNl&tn=wtS0TAaRxk8Ec1Xq&_nc_ht=scontent.fhan2-4.fna&oh=86b48a7cdd7f1c95f1045277501d918e&oe=60EAD108',
    content: '通知5テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
  }
]

export const NotificationsDefault = () => (
  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <Notifications notifications={notifications} />
  </div>
);
