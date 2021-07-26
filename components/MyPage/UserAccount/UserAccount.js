import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Input} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {useState} from 'react';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      width: '10rem',
      height: '10rem',
    },
    '& .username': {
      position: 'relative',
      marginLeft: '1.375rem',
      fontWeight: 'bold',
      fontSize: '1.875rem',
      color: theme.palette.black.main,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    '& #iconTop': {
      position: 'absolute',
      top: '-2.5rem',
      left: '0',
      color: theme.palette.grey.main,
    },
    '& #editIcon': {
      marginLeft: '1.875rem',
      color: theme.palette.grey.main,
      cursor: 'pointer',
      '& path': {
        width: '1.125rem',
        height: '1.125rem',
      },
    },
    '& .MuiInputBase-root': {
      fontWeight: 'bold',
      fontSize: '1.875rem',
      color: theme.palette.black.main,
      maxWidth: '12.5rem',
    },
  },
}));

const UserAccount = () => {
  const classes = useStyles();
  const [changeNameStatus, setchangeNameStatus] = useState(false);
  const [username, setUsername] = useState('username1');

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
      <Avatar src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMo03l8HKKj-8SUhLfwJ9qGXw4TvyKWNcLlA&usqp=CAU'}/>

      <div className='username'>
        {/* <PlayArrowIcon /> */}
        <div id='iconTop'>
          <Image
            src={'/img/icons/polygon.svg'}
            width={40}
            height={34}
            alt={'polygon'}
          />
        </div>

        {changeNameStatus ? (
          <Input
            value={username}
            onChange={handleChangeUsername}
            onBlur={handleUpdateStatus}
            onKeyDown={handleKeyDown}
            autoFocus={true}
            inputProps={{
              'aria-label': 'username',
            }}
          />
        ) : (
          <>
            {username}
            <CreateIcon
              id={'editIcon'}
              onClick={handleUpdateStatus}
            />
          </>)}
      </div>
    </div>
  );
};

export default UserAccount;
