import {Avatar, Badge, Input} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {userState} from '~/store/userState';

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
    color: theme.palette.pink.light,
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
  uploadInput: {
    left: '0',
    outline: '0',
    opacity: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const user = useRecoilValue(userState);
  const [changeNameStatus, setchangeNameStatus] = useState(false);
  const [username, setUsername] = useState();
  const [imagePreview, setImagePreview] = useState();
  const router = useRouter();

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

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    const newImage = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(newImage);

    // eslint-disable-next-line no-warning-comments
    // TODO: send new image to API for updating avatar
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      setUsername(user?.profile?.nickname ?? user?.profile?.email);
      setImagePreview(user?.profile?.avatar_url);
    } else {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className={classes.root}>
      <Badge
        overlap='circular'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.badge}
        badgeContent={
          <>
            {/* eslint-disable-next-line no-warning-comments */}
            {/* TODO: not ready yet */}
            {/* <Avatar
              alt={'アバター変更'}
              src={'/img/icons/camera.png'}
              className={classes.changeAvatarBtn}
            />

            <input
              type='file'
              accept='image/*'
              id='image'
              onChange={handleChange}
              className={classes.uploadInput}
            /> */}
          </>
        }
      >
        <Avatar
          className={classes.avatar}
          src={imagePreview}
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

              // eslint-disable-next-line no-warning-comments
              // TODO: update nickname
              disabled={true}
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
