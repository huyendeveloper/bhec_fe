import {Avatar, Badge, Input} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import produce from 'immer';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {AuthService, CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '7rem',
    height: '7rem',
    [theme.breakpoints.down('sm')]: {
      width: '5rem',
      height: '5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '4rem',
      height: '4rem',
    },
  },
  changeAvatarBtn: {
    background: theme.palette.white.main,
    border: '1px solid ' + theme.palette.grey.dark,
    width: '2rem',
    height: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '1.5rem',
      height: '1.5rem',
    },
    '& img': {
      width: '1.25rem',
      height: '1.25rem',
      [theme.breakpoints.down('sm')]: {
        width: '0.938rem',
        height: '0.938rem',
      },
    },
  },
  badge: {
    '& .MuiBadge-badge': {
      padding: '0',
      height: 'auto',
      zIndex: '0',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginLeft: '1.125rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0.5rem',
    },
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
  const [changeNameStatus, setchangeNameStatus] = useState(false);
  const [username, setUsername] = useState();
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);

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
  const handleChange = async (e) => {
    setLoading(true);
    const newImages = e.target.files[0];
    if (newImages) {
      const bodyFormData = new FormData();
      bodyFormData.append('images[]', newImages);
      const result = await CommonService.uploadFile(bodyFormData);
      if (result && result.urls && result.urls.length) {
        const res = await Auth.updateAvatarUser({avatar: result.urls[0]});
        if (res) {
          setUser(produce((draft) => {
            draft.profile = {...user?.profile, avatar: res?.user?.avatar};
          }));
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      setUsername(user?.profile?.nickname ?? user?.profile?.email);
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
            <Avatar
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
            />
          </>
        }
      >
        <Avatar
          className={classes.avatar}
          src={user?.profile?.avatar}
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
          </>)}
      </div>
    </div>
  );
};

export default UserAccount;
