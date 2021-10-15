import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {FormControlLabel, makeStyles, Radio, RadioGroup} from '@material-ui/core';

import {rules} from '~/lib/validator';
import {BlockForm, ConnectForm} from '~/components';

const useStyles = makeStyles(() => ({
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

const FormPaymentMethods = ({isReadonly}) => {
  const classes = useStyles();

  return (
    <ConnectForm>
      {({control}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'お支払い方法'}
          >
            <Controller
              name={'payment_method'}
              control={control}
              defaultValue={'1'}
              rules={{required: rules.required}}
              render={({field: {onChange, value}}) => (
                <RadioGroup
                  value={value}
                  onChange={onChange}
                  className={classes.radioGroup}
                  disabled={isReadonly}
                  style={{marginBottom: '2.563rem'}}
                >
                  <FormControlLabel
                    value={'1'}
                    control={<Radio/>}
                    label={'クレジットカード払い'}
                    className={'labelRadioBtn'}
                  />

                  <FormControlLabel
                    value={'2'}
                    control={<Radio/>}
                    label={'銀聯カード（UnionPay）払い'}
                    className={'labelRadioBtn'}
                  />

                  <FormControlLabel
                    value={'3'}
                    control={<Radio/>}
                    label={'コンビニ払い'}
                    className={'labelRadioBtn'}
                  />
                </RadioGroup>
              )}
            />
          </BlockForm>
        );
      }}
    </ConnectForm>
  );
};

export default FormPaymentMethods;

FormPaymentMethods.propTypes = {
  isReadonly: PropTypes.bool,
};

FormPaymentMethods.defaultProps = {
  isReadonly: false,
};
