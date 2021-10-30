import {Avatar, Badge, CircularProgress, Fade, List, Popper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {useEffect, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {Notification} from '~/components';
import {NotificationService} from '~/services';
import {userState} from '~/store/userState';

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
    border: '0.063rem solid ' + theme.border.default,
    boxShadow: '0 0.125rem 0.25rem ' + theme.notifications.boxShadow,
    borderRadius: '0.5rem',
    '&::-webkit-scrollbar': {
      width: '0.375rem',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '0.313rem',
      backgroundColor: theme.palette.gray.main,
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
    [theme.breakpoints.down('xs')]: {
      width: '2.5rem',
      height: '2.5rem',
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

const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useRecoilValue(userState);
  const [unread, setUnread] = useState(0);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState({});
  const listInnerRef = useRef();
  const [loading, setLoading] = useState(true);

  const showNotification = (e) => {
    if (e.type === 'mouseenter') {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const onScroll = () => {
    if (loading || notifications?.page === notifications?.pages) {
      return;
    }
    const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
    if (scrollTop + clientHeight > (scrollHeight - 50)) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  const fetchNotify = async () => {
    const payload = {
      page,
      per_page: 10,
    };
    const res = await NotificationService.getNotification(payload);
    if (res) {
      const oldNotifications = notifications?.notifications || [];
      const newNotifications = res.notifications;
      setNotifications({...res, notifications: oldNotifications.concat(newNotifications)});
      setLoading(false);
    }
  };

  const readedNotify = (id) => {
    const oldNotifications = notifications?.notifications || [];
    const newNotifications = oldNotifications.map((obj) => ((obj.id === id) ? {...obj, read: true} : obj));
    setNotifications({...notifications, notifications: newNotifications});
  };

  useEffect(() => {
    if (user?.noti_unread) {
      setUnread(user?.noti_unread);
    }
  }, [user]);

  useEffect(() => {
    fetchNotify();
  }, [page]);

  return (
    <div
      className={classes.root}
      onMouseLeave={showNotification}
    >
      <Badge
        overlap='circular'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.badge}
        badgeContent={
          <div className={classes.notificationsNumber}>{unread}</div>
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
            <List
              className={classes.notificationsBox}
              onScroll={() => onScroll()}
              ref={listInnerRef}
            >
              {notifications?.notifications?.length > 0 ? (
                notifications?.notifications.map((item) => (
                  <Notification
                    key={item.id}
                    notification={item}
                    readedNotify={readedNotify}
                  />
                ))
              ) : (
                <div className={classes.noNotifications}>
                  {'通知はありません。'}
                </div>
              )}
              {loading &&
                <div style={{textAlign: 'center'}}>
                  <CircularProgress color={'inherit'}/>
                </div>
              }
            </List>
          </Fade>
        )}
      </Popper>
    </div >
  );
};

Notifications.propTypes = {
};

export default Notifications;
