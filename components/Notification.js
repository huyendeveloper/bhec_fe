import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import produce from 'immer';
import {signOut} from 'next-auth/client';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useSetRecoilState} from 'recoil';

import {AuthService, NotificationService} from '~/services';
import {userState} from '~/store/userState';

const AuthServiceInstance = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    marginBottom: '1rem',
    backgroundColor: theme.palette.gray.light,
    border: '1px solid ' + theme.palette.white.main,
    minHeight: '6rem',
    '&:hover': {
      background: theme.palette.white.main,
      border: '1px solid ' + theme.palette.orange.light,
      boxShadow: '0 0.125rem 0.25rem ' + theme.notifications.boxShadow,
    },
    '& .MuiAvatar-root': {
      width: '3rem',
      height: '3rem',
      marginRight: '1rem',
      background: theme.palette.yellow.main,
      '& img': {
        width: '1.75rem',
        height: '1.75rem',
      },
    },
  },
  content: {
    fontSize: '0.813rem',
    lineHeight: '1.188rem',
    color: theme.palette.black.default,
    marginBottom: '0.25rem',
  },
  readed: {
    '& .MuiAvatar-root': {
      background: theme.palette.orange.light,
    },
  },
  dateTime: {
    fontSize: '0.688rem',
    lineHeight: '1rem',
    color: theme.palette.gray.dark,
  },
}));

const Notification = ({notification, readedNotify}) => {
  const classes = useStyles();
  const setUser = useSetRecoilState(userState);
  const url = `/${notification?.type === 1 ? 'articles' : 'product'}/${notification?.notiable_id}`;
  const router = useRouter();

  const handleRead = async () => {
    if (!notification?.read) {
      const res = await NotificationService.markReaded({id: notification?.id});
      if (res?.noti_unread >= 0) {
        fetchUserInfo();
        readedNotify(notification?.id);
      }
    }
    window.open(url, '_blank');
  };

  const fetchUserInfo = async () => {
    const response = await AuthServiceInstance.getInfoUser();
    if (!response?.user) {
      setUser({});
      signOut({redirect: false});
      router.push({pathname: '/auth/login'});
      return;
    }

    setUser(
      produce((draft) => {
        draft.profile = response?.user;
        draft.noti_unread = response?.noti_unread;
      }),
    );
  };

  return (
    <div
      className={clsx({[classes.root]: true, [classes.readed]: notification.read})}
      onClick={handleRead}
    >
      <Avatar
        src={notification.read ? '/img/icons/mail_opened.png' : '/img/icons/new_email.png'}
      />

      <div>
        <div className={classes.content}>{notification.content}</div>
        <span className={classes.dateTime}>{notification.created_at}</span>
      </div>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
  readedNotify: PropTypes.func,
};

export default Notification;
