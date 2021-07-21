import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '1.438rem 0.75rem',
    borderRadius: '1.25rem',
    textDecoration: 'none',
    '&:hover': {
      background: 'white',
    },
    '& .MuiAvatar-root': {
      width: '3.25rem',
      height: '3.25rem',
      marginRight: '1.188rem',
    },
  },
  content: {
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.875rem',
    color: theme.palette.black.main,
  },
}));

const Notification = ({notification}) => {
  const classes = useStyles();

  return (
    <Link href='/product'>
      <a className={classes.root}>
        <Avatar src={notification.avatar}/>

        <div className={classes.content}>{notification.content}</div>
      </a>
    </Link>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
