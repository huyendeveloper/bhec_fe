import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogContent, Typography, IconButton, makeStyles} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const classes = useStyles();
  const {children, onClose, ...other} = props;

  return (
    <MuiDialogTitle
      disableTypography={true}
      className={classes.root}
      {...other}
    >
      <Typography
        variant='h4'
        className={classes.title}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogWidget = (props) => {
  const {children, open, handleClose, size, title} = props;

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth={size}
        disableBackdropClick={true}
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {title}
        </DialogTitle>
        <DialogContent dividers={true}>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

DialogWidget.propTypes = {
  children: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

DialogWidget.defaultProps = {

};

DialogTitle.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogWidget;
