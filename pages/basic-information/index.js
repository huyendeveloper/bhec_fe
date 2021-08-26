import {Grid, Typography, Button, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Router from 'next/router';
import {useEffect, useState} from 'react';

import {ContentBlock, Header, Footer} from '~/components';
import {AuthService, CommonServices} from '~/services';
const Auth = new AuthService();
const CommonService = new CommonServices();
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
  },

  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '2.5rem',
  },

  textDisable: {
    color: theme.textDisable.default,
  },
  btnSubmit: {
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '3rem',
    color: theme.palette.background.default,
    padding: '0.5rem 3rem',
    fontSize: '1rem',
    '&:hover': {
      background: theme.palette.red.main,
      color: theme.palette.background.default,
    },
  },
}));

export default function BasicInformation() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [listCity, setListCity] = useState([]);

  useEffect(() => {
    getListCity();
    getDetailUser();
  }, []);

  const getDetailUser = async () => {
    const res = await Auth.getInfoUser();
    if (res.user) {
      setUser(res.user);
    }
  };

  const getListCity = async () => {
    const res = await CommonService.getCities();
    if (res && res.length) {
      setListCity(res);
    }
  };

  const genderTemplate = (gender) => {
    const genderList = {
      0: '男性',
      1: '女性',
      2: '他',
    };
    return (
      <span>{genderList[gender]}</span>
    );
  };

  function updateInfo() {
    Router.push({
      pathname: '/basic-information/update',
    });
  }

  return (
    <>
      <Header showMainMenu={false}/>

      <div className='content'>
        <ContentBlock
          title={'基本情報'}
        >
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
                >{'ニックネーム'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {user && user.nickname ? <span>{user.nickname}</span> : <span className={classes.textDisable}>{'はなこ'}</span>}
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
                >{'ログインID'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {user && user.email ? <span>{user.email}</span> : <span className={classes.textDisable}>{'はなこ'}</span>}
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
                >{'氏名'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {user && user.name ? <span>{user.name}</span> : <span className={classes.textDisable}>{'はなこ'}</span>}
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
                >{'ひらがな'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                { user.name_kana ? <span>{user.name_kana}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
                >{'性別'}</Typography>
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
                >{'生年月日'}</Typography>
              </Grid>

              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {user && user.dob ? <span>{user.dob}</span> : <span className={classes.textDisable}>{'はなこ'}</span>}
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
                >{'住所'}</Typography>
              </Grid>

              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                { user.zipcode || user.city || user.district ? <>
                  <span>{user.zipcode}</span>
                  <br/>
                  {user.city && listCity ? <span>{listCity.find((item) => item.id === parseInt(user.city, 10)).name}</span> : ''}
                  <br/>
                  <span>{user.district}</span>
                  <br/>
                </> : <span className={classes.textDisable}>{'未登録'}</span>
                }
              </Grid>
            </div>
          </Grid>
          <Box
            textAlign='center'
            mt={5}
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

      <Footer/>
    </>
  );
}
