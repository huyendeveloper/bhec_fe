import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';

import firebase from '../../../firebase';

import {ContentBlock, Header, Footer} from '~/components';

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
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },

  grid: {
    marginBottom: '1.5rem',
  },

  required: {
    color: theme.palette.buttonLogin.default,
  },

}));

const initialFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

function RegisterEmail() {
  const classes = useStyles();
  const [values, setValues] = React.useState(initialFormValues);

  const handleInputValue = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpEmail(values);
  };

  const signUpEmail = (data) => {
    const {email, password} = data;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      Router.push({
        pathname: '/auth/login',
      });
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Header showMainMenu={false}/>
        <div
          className='content'
        >
          <ContentBlock
            title='メールアドレスで会員登録'
          >
            <form
              noValidate={true}
              autoComplete='off'
              onSubmit={handleSubmit}
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
                      className={classes.grid}
                    >
                      <span className={classes.label}>{'メールアドレス'}
                        <span className={classes.required}>{'＊'}</span>
                      </span>
                      <TextField
                        placeholder='oshinagaki@gmail.com'
                        autoFocus={true}
                        margin='dense'
                        id='email'
                        name='email'
                        type='email'
                        onChange={handleInputValue}
                        fullWidth={true}
                        variant='outlined'
                      />
                    </Grid>
                    <Grid
                      item={true}
                      xs={12}
                      className={classes.grid}
                    >
                      <span className={classes.label}>{'パスワード'}
                        <span className={classes.required}>{'＊'}</span>
                      </span>
                      <TextField
                        autoFocus={true}
                        margin='dense'
                        id='password'
                        name='password'
                        type='password'
                        onChange={handleInputValue}
                        fullWidth={true}
                        variant='outlined'
                        placeholder='パスワードを８文字以上ご記入ください。'
                      />
                    </Grid>
                    <Grid
                      item={true}
                      xs={12}
                      className={classes.grid}
                    >
                      <span className={classes.label}>{'パスワード（確認）'}
                        <span className={classes.required}>{'＊'}</span>
                      </span>
                      <TextField
                        autoFocus={true}
                        margin='dense'
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        onChange={handleInputValue}
                        fullWidth={true}
                        variant='outlined'
                      />
                    </Grid>
                    <Grid
                      item={true}
                      xs={12}
                      className={classes.grid}
                    >
                      <span className={classes.note}>{'食べチョクの'}</span><span className={classes.link}>{'利用規約'}</span><span>{'、'}</span><span className={classes.link}>{'個人情報保護方針'}</span><span>{'、'}</span><span className={classes.link}>{'特定商取引法'}</span><span>{'に同意の上、'}</span>
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
            </form>
          </ContentBlock>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default RegisterEmail;
