import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';

import {ContentBlock} from '../../../components/ContentBlock';
import {Header} from '../../../components/Layout/Header';
import {Footer} from '../../../components/Layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem 0',
    fontFamily: theme.font.default,
  },

  header: {
    width: '90%',
    marginLeft: '5%',
  },

  title: {
    fontFamily: theme.font.default,
    fontSize: '2.3rem',
    lineHeight: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
    position: 'relative',
    '&::after': {
      position: 'absolute',
      content: '""',
      width: '3.5rem',
      height: '2px',
      left: 0,
      right: 0,
      margin: '0 auto',
      backgroundColor: theme.palette.red.main,
      bottom: '-0.875rem',
    },
  },

  btnSubmit: {
    fontFamily: theme.font.default,
    background: theme.palette.buttonLogin.default,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '45px',
    width: '60%',
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.buttonLogin.default,
      color: theme.palette.background.default,
    },
  },

  label: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },

  note: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    margin: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },

  content: {
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  titleStyle: {
    margin: '0',
    textAlign: 'center',
  },
  grid: {
    padding: '0',
    margin: '1rem 0',
    textAlign: 'center',
  },

  gridHeader: {
    display: 'flex',
    marginBottom: '0.5rem',
    padding: '0 0 1rem 0',
    borderBottom: '1px solid rgba(33, 33, 33, 0.08)',
  },

  step: {
    background: '#F2F2F2',
    marginTop: '1rem',
  },

  required: {
    color: theme.palette.buttonLogin.default,
  },

  stepLabel: {
    color: 'rgba(0, 0, 0, 0.38)',
  },

  boxStep: {
    background: theme.boxStep.background,
    textAlign: 'center',
    paddingTop: '1rem',
  },

  loginMethod: {
    background: theme.palette.background.default,
    border: theme.blockContact.borderColor,
    boxSizing: 'border-box',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  divLoginMethod: {
    display: 'flex',
    flexDirection: 'column',
  },

  labelLogin: {
    marginLeft: '1rem',
  },

  divRules: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },

  labelRules: {
    width: '40%',
    textAlign: 'center',
  },

  inputLogin: {
    width: '40%',
  },

}));

function Login() {
  const classes = useStyles();

  function requestPass() {
    Router.push({
      pathname: '/auth/request-password',
    });
  }

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={false}/>
        <div
          className='content'
        >
          <ContentBlock
            title='パスワードをお忘れの方'
          >
            <Container
              maxWidth='lg'
            >
              <FormControl component='fieldset'/>
              <Grid
                container={true}
                spacing={3}
                justify='center'
              >
                <div className={classes.content}>
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <span className={classes.label}>{'新しいパスワード'}
                      <span className={classes.required}>{'＊'}</span>
                    </span>
                    <TextField
                      id='email'
                      variant='outlined'
                      placeholder='oshinagaki@gmail.com'
                      fullWidth={true}
                      required={true}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    className={classes.grid}
                  >
                    <span className={classes.note}>{'ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。'}</span>
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    className={classes.grid}
                  >
                    <Button
                      variant='contained'
                      className={classes.btnSubmit}
                      onClick={() => requestPass()}
                    >{'送信する'}</Button>
                  </Grid>
                </div>
              </Grid>
            </Container>
          </ContentBlock>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Login;