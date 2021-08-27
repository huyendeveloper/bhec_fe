import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Dialog, DialogContent, Link} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  muiPaper: {
    width: '100%',
    textAlign: 'center',
    padding: '2rem',
    marginTop: '2rem',
  },

  filedValue: {
    marginBottom: '1rem',
  },

  icon: {
    marginTop: '3rem',
  },

  note: {
    fontSize: '1rem',
    margin: '2rem 0',
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '1.5rem',
    color: theme.palette.black.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      lineHeight: '1.2rem',
    },
  },

  btnSubmit: {
    width: '66%',
    margin: '1rem 0 2rem 0',
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgb(0 0 0 / 15%)',
    borderRadius: '3rem',
    height: '3rem',
    '&:hover': {
      background: theme.palette.red.main,
    },
  },

}));

const ThanksPopup = ({open, handleClose, requestNo}) => {
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
              root: classes.muiPaper,
            }}
          >
            <Image
              src={'/img/icons/ic-success.png'}
              width={100}
              height={100}
              alt={'Icon Success'}
              className={classes.icon}
            />
            <div className={classes.note}>
              {'お問い合わせありがとうございます。'}<br/>
              {requestNo}{'番号で受け付けました。'}
            </div>
            <Link
              href='/'
            >
              <Button
                color='primary'
                type='submit'
                variant='contained'
                onClick={handleSubmit}
                className={classes.btnSubmit}
              >{'ホームページに戻る'}</Button>
            </Link>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

ThanksPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  requestNo: PropTypes.string,
};

export default ThanksPopup;
