import {Grid, Typography, Button, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Router from 'next/router';

import {Footer} from '../../components/Layout/Footer';
import {Header} from '../../components/Layout/Header';
import {ContentBlock} from '../../components/ContentBlock';

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

const info = {
  username: 'はなこ',
  email: 'bh@gmail.com',
  password: '＊＊＊＊＊＊＊＊',
  fullName: '',
  alphabet: '',
  gender: '',
  birthday: '',
  address: '',
};

export default function BasicInformation() {
  const classes = useStyles();

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
                >{'注文ニックネーム番号'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {info.username}
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
                {info.email}
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
                >{'パスワード'}</Typography>
              </Grid>
              <Grid
                item={true}
                xs={12}
                sm={8}
                md={8}
              >
                {info.password}
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
                { info.fullName ? <span>{info.fullName}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
                { info.alphabet ? <span>{info.alphabet}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
                { info.gender ? <span>{info.gender}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
                { info.birthday ? <span>{info.birthday}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
                { info.address ? <span>{info.address}</span> : <span className={classes.textDisable}>{'未登録'}</span>}
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
