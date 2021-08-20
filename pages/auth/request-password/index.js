/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button, Snackbar} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';
import MuiAlert from '@material-ui/lab/Alert';

import {AuthService} from '~/services';
const Auth = new AuthService();

import {StyledForm, ContentBlock, Header, Footer} from '~/components';

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

function RequestPassword() {
  const classes = useStyles();
  const [messageResponse, setMessage] = useState();
  const [openMess, setOpenMess] = useState(false);
  const [typeMess, setTypeMess] = useState('success');
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({criteriaMode: 'all'});

  const onSubmit = async (data) => {
    const res = await Auth.resetPassword(data);
    if (res.data.status === 200) {
      Router.push({
        pathname: '/auth/login',
      });
    } else {
      setTypeMess('error');
      setOpenMess(true);
      setMessage(res.data.message);
    }
  };

  const handleCloseMess = () => {
    setOpenMess(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={false}/>
        <div
          className='content'
        >
          <ContentBlock
            title='新しいパスワードを登録'
          >
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
                        htmlFor='reset_password_token'
                        className='formControlLabel'
                      >
                        {'検証コード '}
                        <span className='formControlRequired'>{'*'}</span>
                      </label>
                      <Controller
                        name='reset_password_token'
                        control={control}
                        defaultValue=''
                        rules={{
                          required: 'この入力は必須です。',
                        }}
                        render={({field: {name, value, ref, onChange}}) => (
                          <TextField
                            id='reset_password_token'
                            variant='outlined'
                            error={Boolean(errors.reset_password_token)}
                            InputLabelProps={{shrink: false}}
                            name={name}
                            value={value}
                            inputRef={ref}
                            placeholder='検証コードをご記入ください。'
                            onChange={onChange}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name='reset_password_token'
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
                          required: 'この入力は必須です。',
                          validate: {
                            checkLengthPasswrod: () => {
                              const {password} = getValues();
                              return password.length >= 8 || 'パスワードは8文字以上でなければなりません！';
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
                        htmlFor='password_confirm'
                        className='formControlLabel'
                      >
                        {'パスワード '}
                        <span className='formControlRequired'>{'*'}</span>
                      </label>
                      <Controller
                        name='password_confirm'
                        control={control}
                        defaultValue=''
                        rules={{
                          required: 'この入力は必須です。',
                          validate: {
                            matchesPreviousPassword: (value) => {
                              const {password} = getValues();
                              return password === value || 'パスワードは一致する必要があります！';
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
                            type='password'
                            value={value}
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
                        variant='contained'
                        type='submit'
                        className={classes.btnSubmit}
                      >{'送信する'}</Button>
                    </Grid>
                  </div>
                </Grid>
              </Container>
            </StyledForm>
          </ContentBlock>
        </div>
        <Footer/>
      </div>
      <Snackbar
        open={openMess}
        autoHideDuration={6000}
        onClose={handleCloseMess}
        elevation={6}
        variant='filled'
      >
        <MuiAlert
          onClose={handleCloseMess}
          severity={typeMess}
        >
          {messageResponse}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default RequestPassword;
