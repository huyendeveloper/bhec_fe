import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Button, Dialog, DialogContent, Link, useMediaQuery} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import {useRouter} from 'next/router';
const useStyles = makeStyles((theme) => ({

  root: {
    '& .MuiDialog-paper': {
      margin: '1rem',
    },
  },
  title: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.black4.main,
    width: '2rem',
    height: '2rem',
  },
  muiPaper: {
    width: '100%',
    textAlign: 'center',
    padding: '2rem',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      marginTop: '1rem',
    },
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
    width: '72%',
    margin: '1rem 0 2rem 0',
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgb(0 0 0 / 15%)',
    borderRadius: '3rem',
    fontSize: '1rem',
    fontWeight: '700',
    height: '3rem',
    '&:hover': {
      background: theme.palette.red.main,
    },
    [theme.breakpoints.down('xs')]: {
      width: '86%',
    },
  },

}));

const ThanksPopup = ({open, handleClose, requestNo}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const logoWidth = isMobile ? 80 : (isTablet ? 80 : 106);
  const logoHeight = isMobile ? 80 : (isTablet ? 80 : 106);
  const router = useRouter();
  const closeModal = () => {
    router.push('/');
    handleClose();
  };

  return (
    <>
      <div className={classes.root}>
        <Dialog
          open={open}
          onClose={closeModal}
          aria-labelledby='form-dialog-title'
          maxWidth='lg'
          className={classes.dialog}
          disableBackdropClick={true}
        >
          <DialogContent
            classes={{
              root: classes.muiPaper,
            }}
          >
            <Image
              src={'/img/icons/ic-success.png'}
              width={logoWidth}
              height={logoHeight}
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
                className={classes.btnSubmit}
              >{'TOPページへ戻る'}</Button>
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
