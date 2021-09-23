import {ErrorMessage} from '@hookform/error-message';
import {Checkbox, FormControlLabel, Grid, makeStyles, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilValue} from 'recoil';

import {BlockForm, ConnectForm} from '~/components';
import {orderState} from '~/store/orderState';

const useStyles = makeStyles((theme) => ({
  paragraph: {
    lineHeight: '1.375rem',
    marginBottom: '1.563rem',
    color: theme.palette.black.default,
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.25rem',
    },
    '& a': {
      color: theme.palette.red.main,
    },
  },
  checkBox: {
    '& .MuiFormControlLabel-label': {
      lineHeight: '1.375rem',
      fontSize: '0.875rem',
      color: theme.palette.black.light,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.813rem',
        lineHeight: '1.25rem',
      },
    },
    '& .Mui-checked': {
      color: theme.palette.red.main,
    },
  },
}));

const FormInvoice = ({isReadonly, isConfirm}) => {
  const classes = useStyles();
  const order = useRecoilValue(orderState);
  const [invoice_flag, setInvoice_flag] = React.useState(false);

  React.useEffect(() => {
    setInvoice_flag(order?.invoice_flag === 0);
  }, []);

  return (
    <>
      <ConnectForm>
        {({control, formState: {errors}, getValues}) => {
          return (
            <BlockForm
              themeStyle={'gray'}
              title={'領収書'}
            >
              {!isConfirm &&
              <>
                <div className={classes.checkBox}>
                  <Controller
                    name='invoice_flag'
                    control={control}
                    defaultValue={0}
                    render={({field: {onChange, value}}) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={isReadonly}
                            checked={Boolean(value)}
                            onChange={onChange}
                            name='invoice_flag'
                          />
                        }
                        label='領収書の発行を希望する'
                      />
                    )}
                  />
                </div>

                <div className={classes.paragraph}>{'※領収書は発送完了後に別途メールで送付いたします。'}</div>
              </>}

              {isConfirm && invoice_flag &&
                <div className={classes.paragraph}>{'ご希望なし'}</div>
              }

              <Grid
                container={true}
                spacing={3}
              >
                <Grid
                  item={true}
                  sm={6}
                  xs={12}
                >
                  <label
                    htmlFor='invoice_fullname'
                    className='formControlLabel'
                  >
                    {'氏名 '}
                    <span className='formControlRequired'>{'*'}</span>
                  </label>
                  <Controller
                    name='invoice_fullname'
                    control={control}
                    defaultValue={isConfirm ? order?.invoice_fullname : ''}
                    rules={{validate: {required: (value) => {
                      const invoice = getValues()?.invoice_flag;
                      return (!invoice || value.trim().length > 0) || '必須項目です。';
                    }}}}
                    render={({field: {name, value, ref, onChange}}) => (
                      <TextField
                        id='invoice_fullname'
                        label={isConfirm ? '' : '氏名'}
                        variant='outlined'
                        error={Boolean(errors.invoice_fullname)}
                        InputLabelProps={{shrink: false}}
                        name={name}
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        disabled={isReadonly}
                      />
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='invoice_fullname'
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
                  sm={6}
                  xs={12}
                >
                  <label
                    htmlFor='invoice_note'
                    className='formControlLabel'
                  >
                    {'但し書き'}
                  </label>
                  <Controller
                    name='invoice_note'
                    control={control}
                    defaultValue={isConfirm ? order?.invoice_note : ''}
                    render={({field: {name, value, ref, onChange}}) => (
                      <TextField
                        id='invoice_note'
                        label={isConfirm ? '' : '品代'}
                        variant='outlined'
                        error={Boolean(errors.invoice_note)}
                        InputLabelProps={{shrink: false}}
                        name={name}
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        disabled={isReadonly}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </BlockForm>
          );
        }}
      </ConnectForm>

    </>
  );
};

export default FormInvoice;

FormInvoice.propTypes = {
  isReadonly: PropTypes.bool,
  isConfirm: PropTypes.bool,
};

FormInvoice.defaultProps = {
  isReadonly: false,
  isConfirm: false,
};
