import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Input, Badge} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {useState} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '7rem',
    height: '7rem',
  },
  changeAvatarBtn: {
    background: theme.palette.white.main,
    border: '1px solid ' + theme.palette.grey.dark,
    width: '2rem',
    height: '2rem',
    '& img': {
      width: '1.25rem',
      height: '1.25rem',
    },
  },
  badge: {
    '& .MuiBadge-badge': {
      padding: '0',
      height: 'auto',
    },
  },
  username: {
    position: 'relative',
    marginLeft: '1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: theme.palette.black.default,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: '1rem',
    color: theme.palette.black.light,
    cursor: 'pointer',
    width: '1.5rem',
    height: '1.5rem',
  },
  confirmIcon: {
    marginLeft: '1rem',
    color: theme.palette.green.main,
    cursor: 'pointer',
    width: '1.5rem',
    height: '1.5rem',
  },
  inputUsername: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: theme.palette.black.default,
    maxWidth: '12.5rem',
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const [changeNameStatus, setchangeNameStatus] = useState(false);
  const [username, setUsername] = useState('Kurokawa Yoshio');

  const handleUpdateStatus = () => {
    setchangeNameStatus(!changeNameStatus);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setchangeNameStatus(!changeNameStatus);
    }
  };

  return (
    <div className={classes.root}>
      <Badge
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.badge}
        badgeContent={
          <Avatar
            alt='Remy Sharp'
            src='/img/icons/camera.png'
            className={classes.changeAvatarBtn}
          />
        }
      >
        <Avatar
          className={classes.avatar}
          src={'/img/sellers/avatar.png'}
        />
      </Badge>

      <div className={classes.username}>
        {changeNameStatus ? (
          <>
            <Input
              value={username}
              onChange={handleChangeUsername}
              onBlur={handleUpdateStatus}
              onKeyDown={handleKeyDown}
              autoFocus={true}
              className={classes.inputUsername}
              inputProps={{
                'aria-label': 'username',
              }}
            />

            <DoneOutlineIcon className={classes.confirmIcon}/>
          </>
        ) : (
          <>
            {username}
            <CreateIcon
              onClick={handleUpdateStatus}
              className={classes.editIcon}
            />
          </>)}
      </div>
    </div>
  );
};

export default UserAccount;
