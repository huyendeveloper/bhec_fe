import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Button, Typography, TextField, Grid, Dialog, IconButton, Snackbar} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {jaLocale} from 'date-fns';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {usePaymentInputs} from 'react-payment-inputs';
import MuiAlert from '@material-ui/lab/Alert';
import Image from 'next/image';

import {httpStatus} from '~/constants';
import {PaymentService} from '~/services';

import {checkCreditCardType} from '~/shared/module';

import {StyledForm} from '~/components';

import {registerPayment} from '~/pages/payment-method';

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
    '& .Mui-focused': {
      outline: 'none',
      border: 'none',
    },
  },
  muiPaper: {
    width: '100%',
  },

  filedValue: {
    marginBottom: '1rem',
  },

  actionRoot: {
    justifyContent: 'center',
  },

  submitButton: {
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgb(0 0 0 / 15%)',
    borderRadius: '3rem',
    width: '48%',
    margin: '2rem 0',
    color: theme.palette.white.main,
    '&:hover': {
      background: theme.palette.red.main,
      color: theme.palette.white.main,
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

  divPayment: {
    display: 'flex',
    flexDirection: 'column',
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

  inputPayment: {
    font: 'inherit',
    margin: 0,
    minWidth: 0,
    background: 'none',
    boxSizing: 'content-box',
    animationName: 'mui-auto-fill-cancel',
    letterSpacing: 'inherit',
    animationDuration: '10ms',
    padding: '0.5rem',
    fontSize: '0.875rem',
    border: '1px solid #bebebe',
    height: '2rem',
    borderRadius: '4px',
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
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle
      disableTypography={true}
      className={classes.root}
      {...other}
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
          <CloseIcon/>
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

const PaymentPopup = ({open, handleClose, createPaymentSuccess, dataUpdate}) => {
  const [errMessage, setErrMessage] = useState();
  const [openMess, setOpenMess] = useState(false);
  const [typeMess, setTypeMess] = useState('success');
  const classes = useStyles();
  const {control, handleSubmit, formState: {errors}} = useForm({criteriaMode: 'all'});
  const {getCardNumberProps, getExpiryDateProps, getCVCProps} = usePaymentInputs();
  const onSubmit = async (data) => {
    const body = {
      card_number: data.card_number.replace(/\s/g, ''),
      token_api_key: process.env.VERITRANS_TOKEN_API,
      lang: 'en',
      security_code: data.security_code,
      card_expire: data.card_expire.replace(/\s/g, ''),
    };
    const res = await registerPayment(body);
    if (res && res.status === httpStatus.SUCCESS) {
      const bodyCreate = {
        holder_name: data.card_name,
        req_number: res.data.req_card_number,
        token: res.data.token,
        expiration_date: data.card_expire.replace(/\s/g, ''),
        card_type: checkCreditCardType(data.card_number.replace(/\s/g, '')),
      };
      const result = await PaymentService.createCard(bodyCreate);
      if (result.status === 201) {
        createPaymentSuccess();
        handleClose();
      } else {
        setTypeMess('error');
        setOpenMess(true);
        setErrMessage('続行する前に、サインインまたはサインアップする必要があります。!');
      }
    } else {
      setTypeMess('error');
      setOpenMess(true);
      setErrMessage(res.data.message);
    }
  };

  const handleCloseMess = () => {
    setOpenMess(false);
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
          {'新しいクレジットカードを追加'}
        </DialogTitle>
        <DialogContent
          classes={{
            root: classes.muiPaper,
          }}
        >
          <StyledForm
            onSubmit={handleSubmit(onSubmit)}
          >
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={jaLocale}
            >
              <>
                <Grid
                  container={true}
                  spacing={3}
                  className={classes.form}
                >
                  <Grid
                    item={true}
                    xs={12}
                  >
                    <label
                      htmlFor='card_name'
                      className='formControlLabel'
                    >
                      {'カードの名義 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_name'
                      control={control}
                      defaultValue=''
                      rules={{required: '必須雨'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='card_name'
                          label='SUZUKI HANAKO'
                          variant='outlined'
                          error={Boolean(errors.card_name)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='card_name'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{`${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    className={classes.divPayment}
                  >
                    <label
                      htmlFor='card_number'
                      className='formControlLabel'
                    >
                      {'カード番号'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_number'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: '必須項目',
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          variant='outlined'
                          placeholder={'0000 - 0000 - 0000 - 0000'}
                          error={Boolean(errors.card_number)}
                          InputLabelProps={{shrink: true}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          {...getCardNumberProps({onChange})}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='card_number'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{` ${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  spacing={3}
                  className={classes.form}
                  alignItems='flex-start'
                >
                  <Grid
                    item={true}
                    xs={12}
                    md={4}
                    className={classes.divPayment}
                  >
                    <label
                      htmlFor='card_expire'
                      className='formControlLabel'
                    >
                      {'有効期限'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_expire'
                      control={control}
                      defaultValue=''
                      rules={{required: '必須項目です'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          variant='outlined'
                          label={'MM/YY'}
                          error={Boolean(errors.card_expire)}
                          InputLabelProps={{shrink: true}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          {...getExpiryDateProps({onChange})}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='card_expire'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{` ${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    md={4}
                    className={classes.divPayment}
                  >
                    <label
                      htmlFor='security_code'
                      className='formControlLabel'
                    >
                      {'セキュリティーコード'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='security_code'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: '必須項目です。',
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          variant='outlined'
                          label={'セキュリティーコード'}
                          error={Boolean(errors.security_code)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          {...getCVCProps({onChange})}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='security_code'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >{` ${message}`}</p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  <Grid
                    item={true}
                    xs={12}
                    md={4}
                    className={classes.gridNote}
                  >
                    <span className={classes.note}>{'セキュリティーコードとは'}</span>
                    <Image
                      src={'/ic-question.png'}
                      width={14}
                      height={14}
                      alt={'Image question'}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container={true}
                  spacing={3}
                  className={classes.form}
                  justifyContent='center'
                >
                  <Button
                    autoFocus={true}
                    type='submit'
                    color='primary'
                    className={classes.submitButton}
                  >
                    {'保存する'}
                  </Button>
                </Grid>
              </>
            </MuiPickersUtilsProvider>
          </StyledForm>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openMess}
        autoHideDuration={3000}
        onClose={handleCloseMess}
        elevation={6}
        variant='filled'
      >
        <MuiAlert
          onClose={handleCloseMess}
          severity={typeMess}
        >
          {errMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

PaymentPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  createPaymentSuccess: PropTypes.func,
  dataUpdate: PropTypes.object,
};
export default PaymentPopup;
