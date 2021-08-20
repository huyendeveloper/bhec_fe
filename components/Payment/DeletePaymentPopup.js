import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Typography, Grid, IconButton, Dialog} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import {Close} from '@material-ui/icons';
import Image from 'next/image';

import {PaymentService} from '~/services';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiDialog-paperWidthLg': {
      width: '54%',
      maxWidth: '90%',
      [theme.breakpoints.down('md')]: {
        width: '80%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
  },
  muiPaper: {
    width: '100%',
    textAlign: 'center',
  },

  filedValue: {
    marginBottom: '1rem',
  },

  actionRoot: {
    justifyContent: 'center',
  },

  submitButton: {
    background: theme.palette.white.main,
    borderRadius: '3rem',
    width: '48%',
    margin: '2rem 0',
    color: theme.palette.black.main,
    border: `1px solid ${theme.palette.solidBlack.default}`,
    boxSizing: 'border-box',
    '&:hover': {
      background: theme.palette.white.main,
      color: theme.palette.black.main,
    },
    [theme.breakpoints.down('md')]: {
      width: '43%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '66%',
    },
  },

  gridNote: {
    marginTop: '3rem',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      justifyContent: 'flex-end',
    },
  },

  form: {
    width: '100%',
  },

  note: {
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.7rem',
    lineHeight: '1rem',
    display: 'flex',
    alignItems: 'center',
    textDecorationLine: 'underline',
    color: theme.selectBox.borderColor,
    marginRight: '0.5rem',
    cursor: 'pointer',
  },

  description: {
    width: '60%',
    margin: '0 20%',
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.8rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
    color: theme.palette.solidBlack.default,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `inset 0px -1px 0px ${theme.cardPayment.borderColor}`,
    borderRadius: '4px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    textAlign: 'center',
    fontFamily: theme.font.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: theme.palette.solidBlack.default,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...others} = props;
  return (
    <MuiDialogTitle
      disableTypography={true}
      className={classes.root}
      {...others}
    >
      <Typography
        variant='h6'
        className={classes.title}
      >{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DeletePaymentPopup = ({open, handleClose, idRemove, actionFinish}) => {
  const classes = useStyles();

  const onSubmit = async () => {
    if (idRemove) {
      const res = await PaymentService.deleteCard(idRemove);
      if (res.status === 200) {
        actionFinish('success');
        handleClose();
      } else {
        actionFinish('fail');
      }
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='lg'
        classes={{
          root: classes.root,
        }}
      >
        <DialogTitle onClose={handleClose}>
          {'クレジットカードを削除'}
        </DialogTitle>
        <DialogContent
          classes={{
            root: classes.muiPaper,
          }}
        >
          <Grid
            container={true}
            spacing={3}
            justifyContent='center'
          >
            <Grid
              item={true}
              xs={12}
              style={{marginTop: '2rem'}}
            >
              <Image
                src={'/card.png'}
                width={68}
                height={50}
                alt={'Card'}
              />
            </Grid>
            <Grid
              item={true}
              xs={12}
            >
              <div className={classes.description}>
                {'クレジットカードを削除しても、'} <br/>
                {'このクレジットカードを使用する未発送の注文はキャンセルされません。削除しますか？'}
              </div>
            </Grid>
          </Grid>
          <Grid
            container={true}
            spacing={3}
            justifyContent='center'
          >
            <Button
              autoFocus={true}
              type='submit'
              className={classes.submitButton}
              onClick={() => onSubmit()}
            >
              {'削除する'}
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

DeletePaymentPopup.propTypes = {
  idRemove: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.any,
  actionFinish: PropTypes.func,
};

export default DeletePaymentPopup;
