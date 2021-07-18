/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
  },

  muipaper: {
    width: '30rem',
    textAlign: 'center',
  },

  filedValue: {
    marginBottom: '1rem',
  },

  note: {
    fontSize: '1rem',
    margin: '1rem 0',
  },

  btnSubmit: {
    width: '66%',
    margin: '1rem 0 3rem 0',
    background: theme.palette.black.default,
    '&:hover': {
      background: theme.palette.black.default,
    },
  },

}));

const ThanksPopup = ({open, handleClose}) => {
  const classes = useStyles();

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <div className={classes.root}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          maxWidth='lg'
        >
          <DialogContent
            classes={{
              root: classes.muipaper,
            }}
          >
            <Image
              src={'/img/icons/ic-success.png'}
              width={100}
              height={100}
              alt={'Icon Success'}
            />
            <div className={classes.note}>
              {'お問い合わせありがとうございます。'}<br/>
              {'11204350286番号で受け付けました。'}
            </div>
            <Button
              color='primary'
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              className={classes.btnSubmit}
            >{'ホームページに戻る'}</Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

ThanksPopup.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.any,
};

export default ThanksPopup;