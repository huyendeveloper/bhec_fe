import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

import firebase from '../../firebase';

const useStyles = makeStyles(() => ({
  root: {
  },

  muiPaper: {
    width: '30rem',
  },

  filedValue: {
    marginBottom: '1rem',
  },

}));

const initialFormValues = {
  fullName: '',
  email: '',
  password: '',
};

const SignInModal = ({open, handleClose}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState(initialFormValues);
  const [isSignUp, setIsSignUp] = React.useState(false);

  const handleInputValue = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      signUpEmail(values);
    } else {
      firebase.auth().fetchSignInMethodsForEmail(values.email).then((signInMethods) => {
        if (signInMethods.length) {
          emailAuth(values.email);
        } else {
          setIsSignUp(true);
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    }
  };

  const signUpEmail = (data) => {
    const {email, password} = data;
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  function emailAuth(value) {
    var actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };
    firebase.auth().sendSignInLinkToEmail(value, actionCodeSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', value);
      handleClose();
    });
  }

  return (
    <>
      <div className={classes.root}>
        <form
          className={classes.form}
          noValidate={true}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
            maxWidth='lg'
          >
            <DialogTitle id='form-dialog-title'>{isSignUp ? 'Sign up' : 'Sign in'}</DialogTitle>
            <DialogContent
              classes={{
                root: classes.muiPaper,
              }}
            >

              <TextField
                autoFocus={true}
                margin='dense'
                id='email'
                label='Email'
                name='email'
                type='email'
                onChange={handleInputValue}
                fullWidth={true}
                className={classes.filedValue}
              />

              {isSignUp &&
                <>
                  <TextField
                    autoFocus={true}
                    margin='dense'
                    id='fullName'
                    label='Full Name'
                    name='fullName'
                    type='text'
                    onChange={handleInputValue}
                    fullWidth={true}
                    className={classes.filedValue}
                  />

                  <TextField
                    autoFocus={true}
                    margin='dense'
                    id='password'
                    label='Password'
                    name='password'
                    type='password'
                    onChange={handleInputValue}
                    fullWidth={true}
                    className={classes.filedValue}
                  />
                </>
              }

            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
              >{'Cancel'}</Button>
              <Button
                color='primary'
                type='submit'
                variant='contained'
                onClick={handleSubmit}
              >{'Next'}</Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </>
  );
};

SignInModal.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.any,
};

export default SignInModal;
