import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Fade, Popper, List, Badge, Avatar} from '@material-ui/core';

import {Notification} from '../Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  notificationsBox: {
    width: '24.25rem',
    height: '30rem',
    backgroundColor: theme.palette.white.main,
    padding: '1rem 1.5rem',
    overflow: 'auto',
    border: '0.063rem solid ' + theme.notifications.borderColor,
    boxShadow: '0 0.125rem 0.25rem ' + theme.notifications.boxShadow,
    borderRadius: '0.5rem',
    '&::-webkit-scrollbar': {
      width: '0.375rem',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '0.313rem',
      backgroundColor: theme.notifications.scrollColor,
    },
  },
  noNotifications: {
    padding: '1.375rem 0',
  },
  btnNotifications: {
    width: '3rem',
    height: '3rem',
    backgroundColor: theme.palette.pink.light,
    cursor: 'pointer',
    '& img': {
      width: '1.688rem',
      height: '1.688rem',
    },
  },
  notificationsNumber: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    fontSize: '0.625rem',
    background: theme.palette.red.main,
    minWidth: '1.25rem',
    minHeight: '1.25rem',
    borderRadius: '50%',
    border: '0.125rem solid ' + theme.palette.white.main,
    color: theme.palette.white.main,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: '0 3px',
  },
  hoverStatus: {
    background: theme.palette.orange.light,
  },
  badge: {
    '& .MuiBadge-badge': {
      padding: '0',
    },
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
      <Badge
        overlap='circle'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.badge}
        badgeContent={
          <div className={classes.notificationsNumber}>{20}</div>
        }
      >
        <Avatar
          className={clsx({[classes.btnNotifications]: true, [classes.hoverStatus]: open})}
          src={'/img/icons/bell.svg'}
          onMouseEnter={showNotification}
        />
      </Badge>

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
