import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, FormControl, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {ContentBlock, Header, Footer} from '~/components';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.font.default,
    margin: '2rem 0',
  },

  header: {
    width: '90%',
    marginLeft: '5%',
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

  label: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
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

  grid: {
    marginTop: '2rem',
    '&:last-child': {
      marginTop: '3rem',
      textAlign: 'center',
    },
  },

  required: {
    color: theme.palette.buttonLogin.default,
  },

}));

function Login() {
  const classes = useStyles();

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
                    <span className={classes.label}>{'新しいパスワード'}
                      <span className={classes.required}>{'＊'}</span>
                    </span>
                    <TextField
                      id='password'
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
                    <span className={classes.label}>{'新しいパスワード（確認）'}
                      <span className={classes.required}>{'＊'}</span>
                    </span>
                    <TextField
                      id='re-password'
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
                    <Button
                      variant='contained'
                      className={classes.btnSubmit}
                    >{'登録する'}</Button>
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
