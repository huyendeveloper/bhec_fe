/* eslint-disable no-alert */
/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button, Link} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';

import {AuthService} from '~/services';
const Auth = new AuthService();

import {AlertMessageForSection, StyledForm, ContentBlock, Header, Footer, CompleteConfirmation} from '~/components';

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

  content: {
    width: '100%',
  },

  btnSubmit: {
    fontSize: '1rem',
    fontWeight: '700',
    width: '22.75rem',
    height: '3rem',
    fontFamily: theme.font.default,
    background: theme.palette.buttonLogin.default,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '45px',
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.buttonLogin.default,
      color: theme.palette.background.default,
    },
    [theme.breakpoints.down('md')]: {
      width: '14rem',
      height: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      height: '2.5rem',
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
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },

  grid: {
    marginBottom: '1.5rem',
    width: '34.875rem',
    margin: '0 calc((100% - 34.875rem)/2)',
    [theme.breakpoints.down('md')]: {
      width: '29.5rem',
      margin: '0 calc((100% - 29.5rem)/2)',
      marginBottom: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
      marginBottom: '1rem',
    },
  },

  gridNote: {
    textAlign: 'center',
    fontSize: '0.875rem',
    marginBottom: '2.75rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8125rem',
    },
  },

  required: {
    color: theme.palette.buttonLogin.default,
  },

}));

function RegisterEmail() {
  const classes = useStyles();
  const [alerts, setAlerts] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({criteriaMode: 'all'});

  const onSubmit = async (data) => {
    const res = await Auth.registerEmail({
      user: {
        ...data,
      },
    });
    if (res.id) {
      setSuccess(true);
    } else {
      setAlerts({
        type: 'error',
        message: '無効なメールアドレス/パスワードの組み合わせです。',
      });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={true}/>
        <div
          className='content'
        >
          {isSuccess ? <CompleteConfirmation type='register'/> : (
            <ContentBlock
              title='メールアドレスで会員登録'
            >
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Container
                  maxWidth='lg'
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
                          htmlFor='email'
                          className='formControlLabel'
                        >
                          {'メールアドレス '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='email'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: '必須項目です。',
                            pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: '無効なメールアドレスです。',
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='email'
                              variant='outlined'
                              placeholder='oshinagaki@gmail.com'
                              error={Boolean(errors.email)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              maxLength={254}
                              onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 254);
                              }}
                              value={value}
                              inputRef={ref}
                              onChange={onChange}
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
                          {'パスワード '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='password'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: '必須項目です。',
                            validate: {
                              checkLengthPasswrod: () => {
                                const {password} = getValues();
                                return password.length >= 8 || '8文字以上で入力してください。';
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
                              type='password'
                              maxLength={32}
                              onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 32);
                              }}
                              value={value}
                              inputRef={ref}
                              placeholder='パスワードを８文字以上ご記入ください。'
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
                          htmlFor='password_confirmation'
                          className='formControlLabel'
                        >
                          {'パスワード（確認）'}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='password_confirmation'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: '必須項目です。',
                            validate: {
                              matchesPreviousPassword: (value) => {
                                const {password} = getValues();
                                return password === value || 'パスワードが一致しません';
                              },
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='password_confirmation'
                              variant='outlined'
                              error={Boolean(errors.password_confirmation)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              type='password'
                              value={value}
                              inputRef={ref}
                              onChange={onChange}
                              placeholder='確認用パスワードをご記入ください。'
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='password_confirmation'
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
                        className={classes.gridNote + ' ' + classes.grid}
                      >
                        <span className={classes.note}>{'おしながきの'}</span>
                        <Link href={'/guide'}>
                          <span className={classes.link}>{'利用規約'}</span>
                        </Link>
                        <span>{'、'}</span>
                        <Link href={'/policy'}>
                          <span className={classes.link}>{'個人情報保護方針'}</span>
                        </Link>
                        <span>{'、'}</span>
                        <span className={classes.link}>{'特定商取引法'}</span>
                        <span>{'に同意の上、'}</span>
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                        className={classes.grid}
                        style={{textAlign: 'center'}}
                      >
                        <Button
                          variant='contained'
                          type='submit'
                          className={classes.btnSubmit}
                        >{'登録する'}</Button>
                      </Grid>
                    </div>
                  </Grid>
                </Container>
              </StyledForm>
            </ContentBlock>)}
        </div>
        <Footer/>
      </div>
      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </>
  );
}

export default RegisterEmail;
