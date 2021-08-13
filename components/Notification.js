import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    marginBottom: '1rem',
    backgroundColor: theme.notification.backgroundColor,
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

const Notification = ({notification}) => {
  const classes = useStyles();

  return (
    <Link href='/product'>
      <a className={clsx({[classes.root]: true, [classes.readed]: notification.readed})}>
        <Avatar
          src={notification.readed ? '/img/icons/mail_opened.png' : '/img/icons/new_email.png'}
        />

        <div>
          <div className={classes.content}>{notification.content}</div>
          <span className={classes.dateTime}>{notification.dateTime}</span>
        </div>
      </a>
    </Link>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
