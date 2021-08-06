/* eslint-disable no-useless-escape */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Container, Grid, FormControl, Button, Typography} from '@material-ui/core';
import Image from 'next/image';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import {signIn} from 'next-auth/client';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';

import firebase from '../../../firebase';

import {SignInModal, LineLogin, StepLogin} from '~/components/Auth';
import {Header, Footer, StyledForm} from '~/components';

import {AuthService} from '~/services/auth.services';

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
      marginTop: '3.5rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
      marginTop: '3rem',
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

function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [setPayload] = React.useState(null);
  const [setIdToken] = React.useState(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const handleClose = () => {
    setOpen(false);
  };

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

  const onSubmit = async (data) => {
    const result = await AuthService.loginByEmail({user: {
      email: data.email,
      password: data.password,
    }});
    if (result.status === 200) {
      await signIn('credentials',
        {
          data: result.data,
          token: result.data.access_token,
          callbackUrl: `${window.location.origin}`,
        },
      );
    }
  };

  function googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope(process.env.NEXT_PUBLIC_FIREBASE_SCOPE);
    firebase.auth().signInWithPopup(provider).then(async (result) => {
      const credential = result.credential;
      if (credential.idToken) {
        const res = await AuthService.loginByGmail({
          id_token: credential.idToken,
        });
        if (res.status === 200) {
          await signIn('credentials',
            {
              data: res.data,
              token: res.data.access_token,
              callbackUrl: `${window.location.origin}`,
            },
          );
        }
      }
    });
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
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
                    <Controller
                      className={classes.grid}
                      name='email'
                      control={control}
                      defaultValue={'user+1@example.com'}
                      rules={{
                        required: 'この入力は必須です。',
                        pattern: {
                          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'メールアドレスが無効です。',
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='email'
                          variant='outlined'
                          placeholder='メールアドレス'
                          error={Boolean(errors.email)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          className={classes.inputLogin}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='email'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </div>
                </Grid>
                <Grid
                  item={true}
                  xs={12}
                >
                  <div className={classes.grid}>
                    <Controller
                      className={classes.grid}
                      name='password'
                      control={control}
                      rules={{required: 'この入力は必須です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='password'
                          variant='outlined'
                          placeholder='パスワード'
                          type='password'
                          error={Boolean(errors.password)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          className={classes.inputLogin}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='password'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            {message}
                          </p>
                        )) : null;
                      }}
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
          </StyledForm>
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