/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button, Snackbar} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';

import Router, {useRouter} from 'next/router';

import {httpStatus} from '~/constants';

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

function AccountConfirm() {
  const classes = useStyles();
  const [messageResponse, setMessage] = useState();
  const [openMess, setOpenMess] = useState(false);
  const [typeMess, setTypeMess] = useState('success');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});
  const router = useRouter();

  const onSubmit = async (data) => {
    const headers = {
      Authorization: `Bearer ${router.query.token}`,
    };
    const res = await Auth.confirmAccount(data, headers);
    if (res.status === httpStatus.SUCCESS) {
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
            title='アカウントの確認'
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
                        htmlFor='confirmation_token'
                        className='formControlLabel'
                      >
                        {'検証コード '}
                        <span className='formControlRequired'>{'*'}</span>
                      </label>
                      <Controller
                        name='confirmation_token'
                        control={control}
                        defaultValue=''
                        rules={{
                          required: 'この入力は必須です。',
                        }}
                        render={({field: {name, value, ref, onChange}}) => (
                          <TextField
                            id='confirmation_token'
                            variant='outlined'
                            error={Boolean(errors.confirmation_token)}
                            InputLabelProps={{shrink: false}}
                            name={name}
                            value={value}
                            inputRef={ref}
                            placeholder='検証コードご記入ください。'
                            onChange={onChange}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name='confirmation_token'
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
                      <span className={classes.note}>{'検証コードを受け取りませんでしたか？ '}<span className={classes.link}>{'検証コードを再送'}</span></span>
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

export default AccountConfirm;
