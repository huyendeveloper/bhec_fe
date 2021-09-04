import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormControlLabel, InputBase, makeStyles, Paper, Radio, RadioGroup} from '@material-ui/core';

import {BlockForm, Button, ConnectForm} from '~/components';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '14rem',
    height: '1.313rem',
    '& input': {
      backgroundColor: 'transparent',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      color: '#8A8A8A',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.688rem',
        lineHeight: '1.031rem',
      },
    },
  },
  btnApply: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.black.light,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: '6.063rem',
    height: '3rem',
    position: 'absolute',
    right: '-1px',
    fontWeight: '700',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '6.25rem',
      height: '2.5rem',
      fontSize: '0.813rem',
    },
  },
  inputBlock: {
    margin: '2.5rem 0 1rem',
    display: 'flex',
    alignItems: 'center',
    width: '22.75rem',
    height: '3rem',
    border: `1px solid ${theme.border.default}`,
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '21.75rem',
      height: '2.5rem',
    },
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

// eslint-disable-next-line no-unused-vars
const FormCoupon = ({isReadonly}) => {
  const classes = useStyles();
  const [coupon] = useState('1');

  const handleChange = () => {
    // eslint-disable-next-line no-warning-comments
    // TODO: not implemented yet
  };

  return (
    <ConnectForm>
      {/* eslint-disable-next-line no-unused-vars */}
      {({control}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'クーポン利用'}
          >
            <FormControl>
              <RadioGroup
                name={'coupon'}
                value={coupon}
                onChange={handleChange}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value={'1'}
                  control={<Radio/>}
                  label={'クーポン名300円3月15日まで...'}
                  className={'labelRadioBtn'}
                />

                <FormControlLabel
                  value={'2'}
                  control={<Radio/>}
                  label={'クーポン名5%3月15日まで'}
                  className={'labelRadioBtn'}
                />

                <FormControlLabel
                  value={'3'}
                  control={<Radio/>}
                  label={'クーポン名300円3月15日まで'}
                  className={'labelRadioBtn'}
                />

                <FormControlLabel
                  value={'4'}
                  control={<Radio/>}
                  label={'クーポン名5%3月15日まで'}
                  className={'labelRadioBtn'}
                />
              </RadioGroup>
            </FormControl>

            <Paper
              elevation={0}
              component='div'
              className={classes.inputBlock}
            >
              <InputBase
                className={classes.input}
                placeholder='クーポンコード入力'
                inputProps={{'aria-label': 'search'}}
              />
              <Button
                variant='contained'
                type='submit'
                size='large'
                className={classes.btnApply}
              >
                {'適用'}
              </Button>
            </Paper>
          </BlockForm>
        );
      }}
    </ConnectForm>
  );
};

export default FormCoupon;

FormCoupon.propTypes = {
  isReadonly: PropTypes.bool,
};

FormCoupon.defaultProps = {
  isReadonly: false,
};
