import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Container, Grid, FormControl, Button, Typography} from '@material-ui/core';
import Image from 'next/image';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';

import firebase from '../../../firebase';

import {Header, Footer} from '~/components';
import {SignInModal, LineLogin, StepLogin} from '~/components/Auth';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem 0',
    fontFamily: theme.font.default,
  },

  muipaper: {
    width: '30rem',
  },

  header: {
    marginTop: '2rem',
    fontFamily: theme.font.default,
    width: '56%',
    margin: '0 22%',
    borderBottom: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '0 5%',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
      marginTop: '1rem',
    },
  },

  content: {
    padding: '0px',
    maxWidth: '100%',
  },

  btnSubmit: {
    fontFamily: theme.font.default,
    background: theme.palette.buttonLogin.default,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '45px',
    width: '100%',
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.buttonLogin.default,
      color: theme.palette.background.default,
    },
  },

  alternativeLabel: {
    color: 'red',
  },

  title: {
    fontFamily: theme.font.default,
    fontSize: '2.3rem',
    lineHeight: '3.4rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },

  note: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
  },

  titleMethod: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  description: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: '1rem',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
  },

  labelStep: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1rem',
    position: 'relative',
  },

  forgotPassText: {
    cursor: 'pointer',
    color: theme.palette.buttonLogin.default,
  },

  titleBox: {
    fontFamily: theme.font.default,
    width: '100%',
  },

  grid: {
    width: '32%',
    margin: '0 34%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 10%',
      width: '80%',
    },
  },

  gridText: {
    fontFamily: theme.font.default,
    width: '60%',
    margin: '0 20%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5%',
      width: '90%',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
    },
  },

  gridTextLogin: {
    fontFamily: theme.font.default,
    width: '56%',
    margin: '0 22%',
    textAlign: 'center',
    borderBottom: '1px solid #d8d8d8',
    [theme.breakpoints.down('sm')]: {
      margin: '0 5%',
      width: '90%',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
    },
  },

  step: {
    background: theme.palette.grey.light,
    marginTop: '1rem',
  },

  boxStep: {
    width: '56%',
    margin: '0 22%',
    background: theme.palette.grey.light,
    textAlign: 'center',
    paddingTop: '1rem',

    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '0 5%',
    },
  },

  loginMethod: {
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.border.default}`,
    boxSizing: 'border-box',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

  labelLogin: {
    fontFamily: theme.font.default,
    marginLeft: '2rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
    position: 'relative',
  },

  divRules: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '4rem',
  },

  filedValue: {
    marginBottom: '1rem',
  },

}));

const initialFormValues = {
  email: '',
  password: '',
};

function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(initialFormValues);
  const [setPayload] = React.useState(null);
  const [setIdToken] = React.useState(null);

  const handleInputValue = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailAuth(values.email);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function emailAuth(value) {
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };
    firebase.auth().sendSignInLinkToEmail(value, actionCodeSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', value);
      handleClose();
    });
  }

  function forgotPass() {
    Router.push({
      pathname: '/auth/forgot',
    });
  }

  function goToRegisterEmail() {
    Router.push({
      pathname: '/auth/register-email',
    });
  }

  function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope(process.env.NEXT_PUBLIC_FIREBASE_SCOPE);
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={false}/>
        <div
          className='content'
          style={{marginBottom: '3rem'}}
        >
          <div className={classes.header}>
            <div>
              <Typography
                variant={'h2'}
                className={classes.title}
              >{'無料会員登録'}</Typography>
            </div>
            <div>
              <Typography
                variant={'h4'}
                className={classes.description}
              >{'まだ会員ではない方はこちら、以下の会員登録をお願いします。'}</Typography>
            </div>
          </div>
          <form
            noValidate={true}
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <Container
              maxWidth='lg'
              className={classes.content}
            >
              <FormControl component='fieldset'/>
              <Grid
                container={true}
                spacing={3}
                justify='center'
              >
                <Grid
                  item={true}
                  xs={12}
                >
                  <StepLogin/>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <LineLogin
                      clientID={process.env.NEXT_PUBLIC_LINE_CLIENT_ID}
                      clientSecret={process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET}
                      state={process.env.NEXT_PUBLIC_LINE_STATE}
                      nonce={process.env.NEXT_PUBLIC_LINE_NONCE}
                      redirectURI={process.env.NEXT_PUBLIC_LINE_REDIRECT_URL}
                      scope={process.env.NEXT_PUBLIC_LINE_SCOPE}
                      setPayload={setPayload}
                      setIdToken={setIdToken}
                    />
                    <div
                      className={classes.loginMethod}
                      onClick={() => googleAuth()}
                    >
                      <Image
                        src='/ic-google.png'
                        width='32'
                        height='32'
                        alt=''
                      />
                      <div
                        className={classes.labelLogin}
                      >{'Google で会員登録'}</div>
                    </div>
                    <div
                      className={classes.loginMethod}
                      onClick={() => goToRegisterEmail()}
                    >
                      <Image
                        src='/ic-gmail.png'
                        width='32'
                        height='32'
                        alt=''
                      />
                      <div
                        className={classes.labelLogin}
                      >{'メールアドレスで会員登録'}</div>
                    </div>
                  </div>

                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.gridText}>
                    <div className={classes.divRules}>
                      <Typography
                        variant={'h2'}
                        className={classes.note}
                      >{'会員登録することで、'}</Typography>
                      <Typography
                        variant={'h2'}
                        className={classes.note}
                      >{'おしながきの利用規約、プライバシーポリシーに同意したものとします。'}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <Box className={classes.titleBox}>
                    <div
                      className={classes.gridTextLogin}
                    >
                      <Typography
                        variant={'h2'}
                        className={classes.title}
                      >{'ログイン'}</Typography>
                      <Typography
                        variant={'h2'}
                        className={classes.description}
                      >{'会員の方はこちらログインお願いします。'}</Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <LineLogin
                      clientID='1656197119'
                      clientSecret='254636639a30aac39e877f52e6c03d9f'
                      state='b41c8fd15b895f0fc28bf3b9d7da89054d931e7s'
                      nonce='d78a51235f6ee189e831q9c68523cfa336917ada'
                      redirectURI='http://localhost:3000/auth/login'
                      scope='profile openid email'
                      setPayload={setPayload}
                      setIdToken={setIdToken}
                    />
                    <div className={classes.loginMethod}>
                      <Image
                        src='/ic-google.png'
                        width='32'
                        height='32'
                        alt=''
                      />
                      <div
                        className={classes.labelLogin}
                        onClick={() => googleAuth()}
                      >{'Google で会員登録'}</div>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.gridText}>
                    <div>
                      <Typography
                        variant={'h2'}
                        className={classes.titleMethod}
                      >{'又は　メールアドレスでログイン'}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <TextField
                      id='email'
                      autoFocus={true}
                      margin='dense'
                      name='email'
                      type='email'
                      variant='outlined'
                      onChange={handleInputValue}
                      placeholder='メールアドレス'
                      fullWidth={true}
                      required={true}
                      className={classes.inputLogin}
                    />
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <TextField
                      autoFocus={true}
                      margin='dense'
                      id='password'
                      name='password'
                      type='password'
                      variant='outlined'
                      onChange={handleInputValue}
                      placeholder='パスワード'
                      fullWidth={true}
                      required={true}
                      className={classes.inputLogin}
                    />
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <Button
                      variant='contained'
                      type='submit'
                      className={classes.btnSubmit}
                    >{'ログイン'}</Button>
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <span
                      className={classes.note}
                    >{'パスワードをお忘れの方は'}
                      <span
                        onClick={() => forgotPass()}
                        className={classes.forgotPassText}
                      >{'こちら'}</span>
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </form>
          {open &&
            <SignInModal
              open={open}
              handleClose={handleClose}
            />
          }
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Login;
