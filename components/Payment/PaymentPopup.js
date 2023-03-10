/* eslint-disable max-lines */
import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography, TextField, Grid, Dialog, IconButton} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {ja as jaLocale} from 'date-fns/locale';
import {useForm, Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {usePaymentInputs} from 'react-payment-inputs';
import Image from 'next/image';
import {nanoid} from 'nanoid';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import Button from '~/components/Button';
import {httpStatus} from '~/constants';
import {PaymentService} from '~/services';
import {checkCreditCardType} from '~/shared/module';
import {AlertMessageForSection, StyledForm} from '~/components';
import {registerPayment} from '~/pages/payment-method';
import {rules} from '~/lib/validator';
import {userState} from '~/store/userState';
import {loadingState} from '~/store/loadingState';
import {isHalfWidth} from '~/lib/text';

const Payment = new PaymentService();

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
      [theme.breakpoints.down('xs')]: {
        width: '90%',
        margin: 0,
      },
    },
    '& .formControlLabel': {
      fontSize: '0.875rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8125rem',
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
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0',
    },
  },

  form: {
    width: '100%',
  },

  formAction: {
    width: '100%',
    margin: '2rem 0',
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

const PaymentPopup = ({open, onClose, onSubmit, widthBtn}) => {
  const [alerts, setAlerts] = useState(null);
  const classes = useStyles();
  const {control, handleSubmit, formState: {errors}, reset} = useForm({criteriaMode: 'all', defaultValues: {}});
  const {getExpiryDateProps, getCVCProps} = usePaymentInputs();
  const user = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);
  const handleSubmitClick = async (data) => {
    setLoading(true);
    const body = {
      card_number: data.card_number.replace(/\s/g, ''),
      token_api_key: process.env.VERITRANS_TOKEN_API,
      lang: 'en',
      security_code: data.security_code,
      card_expire: data.card_expire.replace(/\s/g, ''),
    };
    const res = await registerPayment(body);
    if (res && res.status === httpStatus.SUCCESS) {
      const card = {
        token: res.data.token,
        expiration_date: data.card_expire.replace(/\s/g, ''),
        holder_name: data.card_name,
        req_number: res.data.req_card_number,
        card_number: data.card_number.replace(/\s/g, ''),
        security_code: data.security_code,
        card_type: checkCreditCardType(data.card_number.replace(/\s/g, '')),
      };

      if (user?.isAuthenticated) {
        await addCard(card);
      } else {
        await authorizeCard(card);
      }
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '??????????????????????????????????????????????????????',
      });
    }
  };

  const authorizeCard = async (card) => {
    const response = await Payment.authorize(card);
    if (typeof response === 'undefined') {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '???????????????????????????????????????',
      });
    } else if (response?.success) {
      setLoading(false);
      if (typeof onSubmit === 'function') {
        onSubmit({...card, id: nanoid(8)});
      }
      reset();
      if (typeof onClose === 'function') {
        onClose();
      }
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '???????????????????????????????????????',
      });
    }
  };

  const addCard = async (card) => {
    const response = await Payment.createCard(card);
    if (typeof response === 'undefined') {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '???????????????????????????????????????',
      });
    } else if (response?.card) {
      setLoading(false);
      if (typeof onSubmit === 'function') {
        onSubmit(card);
      }
      reset();
      if (typeof onClose === 'function') {
        onClose();
      }
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '???????????????????????????????????????',
      });
    }
  };

  const goToGuideCard = () => {
    const linkGuideCard = 'https://www.cr.mufg.jp/mycard/relief/20111/index.html';
    window.open(linkGuideCard, '_blank');
  };

  return (
    <>
      <Dialog
        onClose={onClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='lg'
        disableBackdropClick={true}
        classes={{
          root: classes.root,
        }}
      >
        <DialogTitle onClose={onClose}>
          {'??????????????????????????????????????????'}
        </DialogTitle>
        <DialogContent
          classes={{
            root: classes.muiPaper,
          }}
        >
          <StyledForm>
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
                      {'?????????????????? (?????????????????????????????????)'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_name'
                      control={control}
                      defaultValue=''
                      rules={{required: rules.required,
                        validate: {
                          checkHalfWidth: (value) => {
                            return isHalfWidth(value) || '?????????????????????????????????';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='card_name'
                          label='TARO YAMADA'
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
                      {'???????????????'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_number'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: rules.required,
                      }}
                      render={({field: {name, value, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          name={name}
                          value={value}
                          onChange={onChange}
                          placeholder={'???????????????'}
                          onInput={(e) => {
                            e.target.value = e.target.value.slice(0, 19);
                          }}
                          onPaste={(e) => {
                            e.target.value = e.clipboardData.getData('Text').replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
                          }}
                          onKeyPress={(e) => {
                            e.target.value = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
                          }}
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
                    sm={4}
                    md={4}
                    xs={4}
                    className={classes.divPayment}
                  >
                    <label
                      htmlFor='card_expire'
                      className='formControlLabel'
                    >
                      {'????????????'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='card_expire'
                      control={control}
                      defaultValue=''
                      rules={{required: rules.required}}
                      render={({field: {name, value, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          name={name}
                          value={value}
                          onChange={onChange}
                          {...getExpiryDateProps({onChange})}
                          placeholder={'???/???'}
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
                    sm={4}
                    md={4}
                    xs={8}
                    className={classes.divPayment}
                  >
                    <label
                      htmlFor='security_code'
                      className='formControlLabel'
                    >
                      {'??????????????????????????????'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='security_code'
                      control={control}
                      defaultValue=''
                      rules={{
                        required: rules.required,
                      }}
                      render={({field: {name, value, onChange}}) => (
                        <input
                          className={classes.inputPayment}
                          name={name}
                          value={value}
                          onChange={onChange}
                          {...getCVCProps({onChange, type: 'password'})}
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
                    sm={4}
                    md={4}
                    xs={12}
                    className={classes.gridNote}
                  >
                    <span
                      className={classes.note}
                      onClick={goToGuideCard}
                    >{'????????????????????????????????????'}</span>
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
                  className={classes.formAction}
                  justifyContent='center'
                >
                  {/* <Button
                    autoFocus={true}
                    color='primary'
                    className={classes.submitButton}
                    onClick={handleSubmit(handleSubmitClick)}
                  >
                    {'????????????'}
                  </Button> */}
                  <Button
                    customColor='red'
                    customSize='small'
                    onClick={handleSubmit(handleSubmitClick)}
                    customStyle={{borderRadius: '45px', width: widthBtn}}
                    // eslint-disable-next-line
                  >
                    {'????????????'}
                  </Button>
                </Grid>
              </>
            </MuiPickersUtilsProvider>
          </StyledForm>
        </DialogContent>
      </Dialog>

      <AlertMessageForSection
        alert={alerts}
        handleCloseAlert={() => setAlerts(null)}
      />
    </>
  );
};

PaymentPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  widthBtn: PropTypes.string,
};
export default PaymentPopup;
