import {Grid, Typography, Button, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect, useState} from 'react';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';
import moment from 'moment';

import {DefaultLayout} from '~/components/Layouts';
import {ContentBlock} from '~/components';
import {AuthService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  block: {
    width: '100%',
    display: 'flex',
    padding: '1.25rem 0',
    borderBottom: `1px solid ${theme.border.default}`,
    fontSize: '1rem',
    lineHeight: '2.188rem',
    color: 'black',
    '& h4': {
      margin: '0rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.3125rem',
    },
  },

  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.3125rem',
    },
  },

  textDisable: {
    color: theme.textDisable.default,
  },
  btnSubmit: {
    width: '22.75rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '3rem',
    color: theme.palette.background.default,
    padding: '0.5rem 3rem',
    height: '64px',
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.background.default,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      height: '40px',
      lineHeight: '1.3125rem',
      width: '14rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  divAction: {
    marginTop: '3.5rem',
  },
}));

export default function BasicInformation() {
  const classes = useStyles();
  const router = useRouter();

  const [user, setUser] = useState({});
  const [province, setProvince] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoading = useSetRecoilState(loadingState);
  const [userCredential, setUserCredential] = useRecoilState(userState);

  useEffect(() => {
    if (userCredential?.isAuthenticated) {
      setIsAuthenticated(userCredential?.isAuthenticated);
      getDetailUser();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUserCredential({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const getDetailUser = async () => {
    setLoading(true);
    const res = await Auth.getInfoUser();
    if (res.user) {
      setLoading(false);
      setUser(res.user);
    } else {
      setLoading(false);
    }
    if (res.province) {
      setProvince(res.province);
    } else {
      setProvince();
    }
  };

  const formatDob = (dob) => {
    return moment(dob).format('yyyy/MM/DD');
  };

  const genderTemplate = (gender) => {
    const genderList = {
      0: '男性',
      1: '女性',
      2: '他',
    };
    return <span>{genderList[gender]}</span>;
  };

  function updateInfo() {
    setLoading(true);
    router.push({
      pathname: '/basic-information/update',
    });
  }

  return (
    <DefaultLayout title='基本情報'>
      {isAuthenticated && (
        <div className='content'>
          <ContentBlock title={'基本情報'}>
            <Grid
              container={true}
              spacing={3}
              style={{padding: '0 1rem'}}
            >
              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'ニックネーム'}
                  </Typography>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user && user.nickname ? (
                    <span>{user.nickname}</span>
                  ) : (
                    <span className={classes.textDisable}>{'はなこ'}</span>
                  )}
                </Grid>
              </div>

              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'ログインID'}
                  </Typography>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user && user.email ? (
                    <span>{user.email}</span>
                  ) : (
                    <span className={classes.textDisable}>{'はなこ'}</span>
                  )}
                </Grid>
              </div>

              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'氏名'}
                  </Typography>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user && user.name ? (
                    <span>{user.name}</span>
                  ) : (
                    <span className={classes.textDisable}>{'はなこ'}</span>
                  )}
                </Grid>
              </div>

              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'ひらがな'}
                  </Typography>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user && user.name_kana ? (
                    <span>{user.name_kana}</span>
                  ) : (
                    <span className={classes.textDisable}>{'未登録'}</span>
                  )}
                </Grid>
              </div>

              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'性別'}
                  </Typography>
                </Grid>

                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user ? genderTemplate(user.gender) : <span className={classes.textDisable}>{'はなこ'}</span>}
                </Grid>
              </div>
              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'生年月日'}
                  </Typography>
                </Grid>

                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user && user.dob ? (
                    <span>{formatDob(user.dob)}</span>
                  ) : (
                    <span className={classes.textDisable}>{'はなこ'}</span>
                  )}
                </Grid>
              </div>
              <div className={classes.block}>
                <Grid
                  item={true}
                  xs={12}
                  sm={4}
                  md={4}
                >
                  <Typography
                    variant={'h4'}
                    className={classes.title}
                  >
                    {'住所'}
                  </Typography>
                </Grid>

                <Grid
                  item={true}
                  xs={12}
                  sm={8}
                  md={8}
                >
                  {user.zipcode || user.city || user.district || user.phone_no || user.office_room || province ? (
                    <>
                      {user?.name} <br/>
                      {`〒${user?.zipcode}`} <br/>
                      {province?.name}{user?.city}{user?.office_room}<br/>
                      {user?.apartment_number} {user?.apartment_number && <br/>}
                      {user?.phone_no}
                    </>
                  ) : (
                    <span className={classes.textDisable}>{'未登録'}</span>
                  )}
                </Grid>
              </div>
            </Grid>
            <Box
              textAlign='center'
              mt={5}
              className={classes.divAction}
            >
              <Button
                variant='contained'
                type='submit'
                className={classes.btnSubmit}
                onClick={() => updateInfo()}
              >
                {'基本情報を編集'}
              </Button>
            </Box>
          </ContentBlock>
        </div>
      )}
    </DefaultLayout>
  );
}
