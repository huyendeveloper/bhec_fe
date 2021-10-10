import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {FormControl, Grid, makeStyles, NativeSelect, TextField} from '@material-ui/core';
import {ErrorMessage} from '@hookform/error-message';

import {useRecoilValue} from 'recoil';

import clsx from 'clsx';

import {BlockForm, ConnectForm} from '~/components';
import {rules} from '~/lib/validator';
import {orderState} from '~/store/orderState';
import {isHalfWidth} from '~/lib/text';
import {order as orderConstants} from '~/constants';

const useStyles = makeStyles(() => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0 1rem',
  },
  radioGroup: {
    '& .labelRadioBtn': {
      height: '1.5rem',
      marginBottom: '1.5rem',
    },
    '& .labelRadioBtn:last-child': {
      marginBottom: '0',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
    },
  },
}));

const FormKombini = ({isReadonly}) => {
  const classes = useStyles();
  const order = useRecoilValue(orderState);

  return (
    <ConnectForm>
      {({control, formState: {errors}}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'コンビニでのお支払い'}
          >
            <Grid
              container={true}
              spacing={3}
            >
              <Grid
                item={true}
                md={6}
                xs={12}
              >
                <label
                  htmlFor='service_option_type'
                  className='formControlLabel'
                >
                  {'支払先コンビニ '}
                  <span className='formControlRequired'>{'*'}</span>
                </label>
                <Controller
                  name={'service_option_type'}
                  control={control}
                  defaultValue={order?.service_option_type || 'sej'}
                  rules={{
                    required: rules.required,
                  }}
                  render={({field: {onChange, ref, value}}) => (
                    <FormControl>
                      <NativeSelect
                        className={clsx(errors?.note ? 'selectBoxError' : '', classes.selectShipDate)}
                        name={name}
                        value={value}
                        inputRef={ref}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        disabled={isReadonly}
                      >
                        {orderConstants.kombiniPayment.map((v) => (
                          <option
                            key={v.value}
                            value={v.value}
                          >{v.label}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name='creditCard'
                  render={({messages}) => {
                    return messages ? Object.entries(messages).map(([type, message]) => (
                      <p
                        className='inputErrorText'
                        key={type}
                      >
                        {message}
                      </p>
                    )) : null;
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container={true}
              spacing={3}
            >
              <Grid
                item={true}
                md={6}
                xs={12}
              >
                <label
                  htmlFor='phone_no'
                  className='formControlLabel'
                >
                  {'支払者電話番号 '}
                  <span className='formControlRequired'>{'*'}</span>
                </label>
                <Controller
                  name='phone_no'
                  control={control}
                  defaultValue={order?.phone_no || ''}
                  rules={{validate: {checkHalfWidth: (value) => {
                    return isHalfWidth(value) || '半角でご入力ください。';
                  }}}}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      id='phone_no'
                      label={'電話番号'}
                      variant='outlined'
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
                  name='phone_no'
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
            </Grid>
          </BlockForm>
        );
      }}
    </ConnectForm>
  );
};

export default FormKombini;

FormKombini.propTypes = {
  isReadonly: PropTypes.bool,
};

FormKombini.defaultProps = {
  isReadonly: false,
};
