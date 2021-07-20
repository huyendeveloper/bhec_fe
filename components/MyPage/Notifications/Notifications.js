import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Fade, Popper, List} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {Notification} from '../Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      width: '4.688rem',
      height: '4.688rem',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: theme.palette.grey.main,
      position: 'relative',
      cursor: 'pointer',
      '& .notificationsNumber': {
        position: 'absolute',
        top: '0',
        right: '0',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '500',
        fontSize: '1.5rem',
      },
    },
    '& .MuiSvgIcon-root': {
      width: '1.875rem',
      height: '1.875rem',
      color: theme.palette.grey.light,
    },
  },
  notificationsBox: {
    width: '42.313rem',
    backgroundColor: theme.palette.grey.light,
    padding: '1.438rem 2.25rem',
    height: '29.25rem',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.75rem',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '0.625rem',
      backgroundColor: theme.palette.grey.main,
    },
  },
  noNotifications: {
    padding: '22px 0',
  },
}));

const Notifications = ({notifications}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const showNotification = (e) => {
    if (e.type === 'mouseenter') {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  return (
    <div
      className={classes.root}
      onMouseLeave={showNotification}
    >
      <button onMouseEnter={showNotification}>
        <NotificationsIcon/>

        <div className='notificationsNumber'>{2}</div>
      </button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={'top-end'}
        transition={true}
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps}>
            <List className={classes.notificationsBox}>
              {notifications.length > 0 &&
              notifications.map((item) => (
                <Notification
                  key={item.id}
                  notification={item}
                />
              ))}

              {(!notifications || notifications.length < 1) &&
              <div className={classes.noNotifications}>
                {'You have no notifications'}
              </div>}
            </List>
          </Fade>
        )}
      </Popper>
    </div >
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array,
};

export default Notifications;
