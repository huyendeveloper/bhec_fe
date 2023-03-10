import {ErrorMessage} from '@hookform/error-message';
import {Box, Button, Container, FormControl, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import produce from 'immer';
import {signIn, signOut} from 'next-auth/client';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {Controller, useForm} from 'react-hook-form';
import {useSetRecoilState} from 'recoil';

import {AlertMessageForSection, StyledForm} from '~/components';
import {LineLogin, SignInModal, StepLogin} from '~/components/Auth';
import {DefaultLayout} from '~/components/Layouts';
import {rules} from '~/lib/validator';
import {AuthService} from '~/services';
import {cartState} from '~/store/cartState';
import {couponEnableUseState, couponState} from '~/store/couponState';
import {loadingState} from '~/store/loadingState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url("/bg-login.png")',
    backgroundSize: 'auto',
    padding: '1rem 0',
    fontFamily: theme.font.default,
  },

  muiPaper: {
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
      width: 'auto',
      margin: '0 2rem',
      marginTop: '3rem',
    },
  },

  content: {
    padding: '0px',
    maxWidth: '100%',
  },

  btnSubmit: {
    fontFamily: theme.font.default,
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '45px',
    fontWeight: '700',
    width: '100%',
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.background.default,
    },
  },

  alternativeLabel: {
    color: 'red',
  },

  title: {
    fontFamily: theme.font.default,
    fontSize: '2rem',
    lineHeight: '3rem',
    textAlign: 'center',
    fontWeight: '700',
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
    color: theme.palette.black4.main,
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    textAlign: 'center',
    fontWeight: 'normal',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
      lineHeight: '1.2rem',
    },
  },

  titleMethod: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: '700',
  },

  titleNotBold: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
  },

  description: {
    fontFamily: theme.font.default,
    color: theme.palette.black4.main,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: '1.5rem',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.875rem',
    },
  },

  labelStep: {
    fontFamily: theme.font.default,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '1rem',
    position: 'relative',
  },

  forgotPasswordText: {
    cursor: 'pointer',
    color: theme.palette.buttonLogin.default,
  },

  titleBox: {
    fontFamily: theme.font.default,
    width: '100%',
  },

  grid: {
    width: '20%',
    margin: '0 40%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 14%',
      width: '72%',
    },
    [theme.breakpoints.down('md')]: {
      width: '16.9375rem',
      margin: '0 calc((100% - 16.9375rem)/2)',
    },
  },

  gridButton: {
    width: '22.75rem',
    margin: '0 calc((100% - 22.75rem)/2)',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '22.75rem',
      margin: '0 calc((100% - 22.75rem)/2)',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
    },
  },

  gridInput: {
    width: '22.75rem',
    margin: '0 calc((100% - 22.75rem)/2)',
    [theme.breakpoints.down('md')]: {
      margin: '0 calc((100% - 29.5rem)/2)',
      width: '29.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '0 calc((100% - 21.4375rem)/2)',
      width: '21.4375rem',
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
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: '0 5%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 5%',
      width: '90%',
    },
  },

  gridLogin: {
    width: '28%',
    margin: '0 36%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '0 19%',
      width: '62%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 5%',
      width: '90%',
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
    marginBottom: '1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '2.5rem',
  },

  labelLogin: {
    fontFamily: theme.font.default,
    marginLeft: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    textAlign: 'center',
    fontWeight: '700',
    position: 'relative',
  },

  labelGoogle: {
    color: theme.palette.grey.shadow,
  },

  labelEmail: {
    color: theme.palette.black3.main,
  },

  divRules: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '4rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2.25rem',
    },
  },

  filedValue: {
    marginBottom: '1rem',
  },
}));

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [setPayload] = useState(null);
  const [setIdToken] = useState(null);

  const setLoading = useSetRecoilState(loadingState);
  const setCart = useSetRecoilState(cartState);
  const setOrder = useSetRecoilState(orderState);
  const setCoupon = useSetRecoilState(couponState);
  const setCouponEnableUse = useSetRecoilState(couponEnableUseState);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});
  const setUser = useSetRecoilState(userState);

  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    // clear local storage data in logging out
    setCart({items: [], seller: null});
    setOrder();
    setCoupon({items: []});
    setUser({});
    setCouponEnableUse({items: []});
    signOut({redirect: false});
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  function forgotPassword() {
    setLoading(true);
    router.push({
      pathname: '/auth/forgot',
    });
  }

  function goToRegisterEmail() {
    setLoading(true);
    router.push({
      pathname: '/auth/register-email',
    });
  }

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await Auth.loginByEmail({
      user: {
        email: data.email.trim(),
        password: data.password.trim(),
      },
    });
    if (res.id) {
      if (res.is_confirmed) {
        setUser(
          produce((draft) => {
            draft.isAuthenticated = true;
          }),
        );
        await signIn('credentials', {
          data: res,
          token: res.access_token,
          callbackUrl: router?.query?.callbackUrl || `${window.location.origin}`,
        });

        setLoading(false);
      } else {
        setLoading(false);
        router.push({
          pathname: '/auth/account-confirm',
          query: {token: res.access_token},
        });
      }
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '????????????????????????????????????????????????????????????????????????',
      });
    }
  };

  const responseGoogle = async (response) => {
    setLoading(true);
    if (response.tokenId) {
      const res = await Auth.loginBySNS({
        type: 'gg',
        id_token: response.tokenId,
      });
      if (res.id) {
        setUser(
          produce((draft) => {
            draft.isAuthenticated = true;
          }),
        );
        await signIn('credentials', {
          data: res,
          token: res.access_token,
          callbackUrl: `${window.location.origin}`,
        });
        setLoading(false);
      } else {
        setLoading(false);
        setAlerts({
          type: 'error',
          message: '????????????????????????????????????????????????????????????????????????',
        });
      }
    }
  };

  return (
    <DefaultLayout title='????????????'>
      <div className={classes.root}>
        <div className={classes.header}>
          <div>
            <Typography
              variant={'h2'}
              className={classes.title}
            >
              {'??????????????????'}
            </Typography>
          </div>
          <div>
            <Typography
              variant={'h4'}
              className={classes.description}
            >
              {'?????????????????????????????????????????????????????????????????????????????????'}
            </Typography>
          </div>
        </div>
        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          style={{marginTop: '0.8rem'}}
        >
          <Container
            maxWidth='lg'
            className={classes.content}
          >
            <FormControl component='fieldset'/>
            <Grid
              container={true}
              spacing={3}
              justifyContent='center'
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
                    login={false}
                  />
                  <GoogleLogin
                    clientId={process.env.GOOGLE_ID}
                    render={(renderProps) => (
                      <div
                        className={classes.loginMethod}
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src='/ic-google.png'
                          width='32'
                          height='32'
                          alt=''
                        />
                        <div className={classes.labelLogin + ' ' + classes.labelGoogle}>{'Google ???????????????'}</div>
                      </div>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                  />
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
                    <div className={classes.labelLogin + ' ' + classes.labelEmail}>{'????????????????????????????????????'}</div>
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
                    >
                      {'??????????????????????????????'}
                    </Typography>
                    <Typography
                      variant={'h2'}
                      className={classes.note}
                    >
                      {'???????????????????????????????????????????????????????????????????????????????????????????????????'}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <Box className={classes.titleBox}>
                  <div className={classes.gridTextLogin}>
                    <Typography
                      variant={'h2'}
                      className={classes.title}
                    >
                      {'????????????'}
                    </Typography>
                    <Typography
                      variant={'h2'}
                      className={classes.description}
                    >
                      {'??????????????????????????????????????????????????????????????????'}
                    </Typography>
                  </div>
                </Box>
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
                    login={true}
                  />
                  <GoogleLogin
                    clientId={process.env.GOOGLE_ID}
                    render={(renderProps) => (
                      <div
                        className={classes.loginMethod}
                        onClick={renderProps.onClick}
                      >
                        <Image
                          src='/ic-google.png'
                          width='32'
                          height='32'
                          alt=''
                        />
                        <div className={classes.labelLogin + ' ' + classes.labelGoogle}>{'Google ???????????????'}</div>
                      </div>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                  />
                </div>
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <div className={classes.gridText}>
                  <div>
                    <Typography variant={'subtitle1'}>
                      <span className={classes.titleNotBold}>{'??????'}</span>
                      <span className={classes.titleMethod}>{'????????????????????????????????????'}</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <div className={classes.gridInput}>
                  <Controller
                    className={classes.grid}
                    name='email'
                    control={control}
                    rules={{
                      required: '?????????????????????',
                      pattern: rules.isEmail,
                    }}
                    render={({field: {name, value, ref, onChange}}) => (
                      <TextField
                        id='email'
                        maxLength={254}
                        variant='outlined'
                        placeholder='?????????????????????'
                        error={Boolean(errors.email)}
                        InputLabelProps={{shrink: false}}
                        name={name}
                        value={value}
                        inputRef={ref}
                        onChange={onChange}
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 254);
                        }}
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
                <div className={classes.gridInput}>
                  <Controller
                    className={classes.grid}
                    name='password'
                    control={control}
                    rules={{required: '?????????????????????'}}
                    render={({field: {name, value, ref, onChange}}) => (
                      <TextField
                        id='password'
                        variant='outlined'
                        placeholder='???????????????'
                        type='password'
                        maxLength={64}
                        error={Boolean(errors.password)}
                        InputLabelProps={{shrink: false}}
                        name={name}
                        value={value}
                        inputRef={ref}
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 32);
                        }}
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
                <div className={classes.gridButton}>
                  <Button
                    variant='contained'
                    type='submit'
                    className={classes.btnSubmit}
                  >
                    {'????????????'}
                  </Button>
                </div>
              </Grid>
              <Grid
                item={true}
                xs={12}
              >
                <div className={classes.grid}>
                  <span className={classes.note}>
                    {'????????????????????????????????????'}
                    <span
                      onClick={() => forgotPassword()}
                      className={classes.forgotPasswordText}
                    >
                      {'?????????'}
                    </span>
                  </span>
                </div>
              </Grid>
            </Grid>
          </Container>
        </StyledForm>
        {open && (
          <SignInModal
            open={open}
            handleClose={handleClose}
            // eslint-disable-next-line react/jsx-closing-bracket-location
          />
        )}
      </div>
      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
};

export default Login;
