import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import produce from 'immer';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {useSetRecoilState} from 'recoil';

import {NotificationService} from '~/services';
import {userState} from '~/store/userState';

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

const Notification = ({notification, fetchNotify}) => {
  const classes = useStyles();
  const setUser = useSetRecoilState(userState);

  const handleRead = async () => {
    if (!notification?.read) {
      const res = await NotificationService.markReaded({id: notification?.id});
      if (res?.noti_unread) {
        setUser(produce((draft) => {
          draft.noti_unread = res?.noti_unread;
        }));
        fetchNotify();
      }
    }
  };

  return (
    <Link href={`/${notification?.type === 1 ? 'product' : 'articles'}/${notification?.notiable_id}`}>
      <a
        target='_blank'
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
      </a>
    </Link>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
  fetchNotify: PropTypes.func,
};

export default Notification;
