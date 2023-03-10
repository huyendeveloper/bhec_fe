import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';

import {DefaultLayout} from '~/components/Layouts';
import {userState} from '~/store/userState';
import {httpStatus} from '~/constants';
import {loadingState} from '~/store/loadingState';
import {AuthService} from '~/services';
const Auth = new AuthService();

import {StyledForm, ContentBlock, AlertMessageForSection, Button} from '~/components';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem 0',
    fontFamily: theme.font.default,
    '& button': {
      fontSize: '1rem',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },

  header: {
    width: '90%',
    marginLeft: '5%',
  },

  title: {
    fontFamily: theme.font.default,
    fontSize: '2rem',
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

  link: {
    color: theme.palette.buttonLogin.default,
    textDecoration: 'underline',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },

  container: {
    width: '40%',
    margin: '0 30%',
    [theme.breakpoints.down('md')]: {
      width: '60%',
      margin: '0 20%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '94%',
      margin: '0 3%',
    },
  },

  content: {
    width: '100%',
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },

  note: {
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    textAlign: 'center',
    margin: '2rem 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },

  grid: {
    marginBottom: '1.5rem',
  },

  required: {
    color: theme.palette.buttonLogin.default,
  },
}));

function ChangePassword() {
  const classes = useStyles();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({criteriaMode: 'all'});

  const setLoading = useSetRecoilState(loadingState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setAlerts(null);
    const res = await Auth.changePassword(data);
    if (res.status === httpStatus.SUCCESS) {
      setLoading(false);
      setAlerts({
        type: 'success',
        message: '???????????????????????????????????????',
      });
      setTimeout(() => {
        router.push({
          pathname: '/mypage',
        });
      }, 1000);
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: res,
      });
    }
  };

  return (
    <DefaultLayout title='?????????????????????'>
      {isAuthenticated && (
        <div className={classes.root}>
          <div className='content'>
            <ContentBlock title='??????????????????????????????'>
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Container
                  maxWidth='lg'
                  className={classes.container}
                >
                  <FormControl component='fieldset'/>
                  <Grid
                    container={true}
                    spacing={3}
                    justifyContent='center'
                  >
                    <div className={classes.content}>
                      <Grid
                        item={true}
                        xs={12}
                        className={classes.grid}
                      >
                        <label
                          htmlFor='current_password'
                          className='formControlLabel'
                        >
                          {'???????????????????????? '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='current_password'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: '?????????????????????',
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='current_password'
                              variant='outlined'
                              error={Boolean(errors.current_password)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              type='password'
                              inputRef={ref}
                              placeholder='????????????????????????????????????????????????'
                              onChange={onChange}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='current_password'
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
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                        className={classes.grid}
                      >
                        <label
                          htmlFor='password'
                          className='formControlLabel'
                        >
                          {'???????????????????????? '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='password'
                          control={control}
                          defaultValue=''
                          rules={{
                            validate: {
                              checkLengthPasswrod: () => {
                                const {password} = getValues();
                                if (!password) {
                                  return '?????????????????????';
                                }
                                return password.length >= 8 || '??????????????????8?????????????????????????????????????????????';
                              },
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='password'
                              variant='outlined'
                              error={Boolean(errors.password)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              type='password'
                              inputRef={ref}
                              placeholder='?????????????????????????????????????????????????????????'
                              onChange={onChange}
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
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                        className={classes.grid}
                      >
                        <label
                          htmlFor='password_confirm'
                          className='formControlLabel'
                        >
                          {'???????????????????????????????????? '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='password_confirm'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: '?????????????????????',
                            validate: {
                              matchesPreviousPassword: (value) => {
                                const {password} = getValues();
                                return password === value || '??????????????????????????????????????????????????????';
                              },
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='password_confirm'
                              variant='outlined'
                              error={Boolean(errors.password_confirm)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              type='password'
                              inputRef={ref}
                              onChange={onChange}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='password_confirm'
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
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                        className={classes.grid}
                        style={{textAlign: 'center'}}
                      >
                        <Button
                          variant='pill'
                          type='submit'
                          customSize='extraLarge'
                          customColor='red'
                        >
                          {'????????????'}
                        </Button>
                      </Grid>
                    </div>
                  </Grid>
                </Container>
              </StyledForm>
            </ContentBlock>
          </div>
        </div>
      )}
      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </DefaultLayout>
  );
}

export default ChangePassword;
