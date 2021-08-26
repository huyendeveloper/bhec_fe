/* eslint-disable no-useless-escape */
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {ErrorMessage} from '@hookform/error-message';
import {Controller, useForm} from 'react-hook-form';

import {httpStatus} from '~/constants';

import {AuthService} from '~/services';
const Auth = new AuthService();

import {AlertMessageForSection, Header, Footer, ContentBlock, StyledForm} from '~/components';

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
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    fontSize: '0.875rem',
    lineHeight: '1.4rem',
    textAlign: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
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
  },

  gridNote: {
    padding: '0',
    margin: '2rem 0',
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

function ForgotPassword() {
  const [alerts, setAlerts] = useState(null);
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const onSubmit = async (data) => {
    const res = await Auth.forgotPassword(data);
    if (res.status === httpStatus.SUCCESS) {
      setAlerts({
        type: 'success',
        message: res.success,
      });
    } else {
      setAlerts({
        type: 'error',
        message: res,
      });
    }
  };

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
                            error={Boolean(errors.email)}
                            InputLabelProps={{shrink: false}}
                            name={name}
                            value={value}
                            inputRef={ref}
                            placeholder='oshinagaki@gmail.com'
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
                      <div className={classes.note}>{'ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。 '}</div>
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
                <AlertMessageForSection
                  alert={alerts}
                  handleCloseAlert={() => setAlerts(null)}
                />
              </Container>
            </StyledForm>
          </ContentBlock>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default ForgotPassword;
