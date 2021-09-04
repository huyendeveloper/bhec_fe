import {ErrorMessage} from '@hookform/error-message';
import {Grid, makeStyles, TextField} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import {Controller} from 'react-hook-form';
import PropTypes from 'prop-types';

import {BlockForm, ConnectForm} from '~/components';

import {rules} from '~/lib/validator';

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      backgroundColor: theme.palette.white.main,
      [theme.breakpoints.down('md')]: {
        height: '2.5rem',
        boxSizing: 'border-box',
      },
    },
  },
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
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.125rem',
    alignItems: 'center',
  },
}));

const FormSignup = ({isReadonly}) => {
  const classes = useStyles();

  return (
    <ConnectForm>
      {({control, formState: {errors}, getValues}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'会員登録情報'}
          >
            <div className={classes.paragraph}>
              {'ご注文いただくには会員登録が必要となります。'}<br/>
              {'既にアカウントをお持ちの方は'}

              <Link href={'/auth/login'}>
                {'こちらからログイン'}
              </Link>
            </div>

            <Grid
              container={true}
              spacing={3}
            >
              <Grid
                item={true}
                sm={6}
                xs={12}
                className={classes.grid}
              >
                <label
                  htmlFor='email'
                  className='formControlLabel'
                >
                  {'連絡先メールアドレス '}
                  <span className='formControlRequired'>{'*'}</span>
                </label>

                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: rules.required,
                    pattern: rules.isEmail,
                  }}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      id='email'
                      variant='outlined'
                      placeholder='メールアドレス'
                      error={Boolean(errors.email)}
                      InputLabelProps={{shrink: false}}
                      name={name}
                      value={value}
                      inputRef={ref}
                      disabled={isReadonly}
                      onChange={onChange}
                    />
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name='email'
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

              <Grid
                item={true}
                sm={6}
                xs={12}
              >
                <label
                  htmlFor='nickname'
                  className='formControlLabel'
                >
                  {'ニックネーム '}
                  <span className='formControlRequired'>{'*'}</span>
                </label>
                <Controller
                  name='nickname'
                  control={control}
                  defaultValue={''}
                  rules={{required: rules.required}}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      id='nickname'
                      label='おしながきサイト上で表示されます'
                      variant='outlined'
                      error={Boolean(errors.nickname)}
                      InputLabelProps={{shrink: false}}
                      name={name}
                      value={value}
                      disabled={isReadonly}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name='nickname'
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
                  htmlFor='password'
                  className='formControlLabel'
                >
                  {'パスワード '}
                  <span className='formControlRequired'>{'*'}</span>
                </label>
                <Controller
                  name='password'
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: rules.required,
                    minLength: rules.minLength(6),
                  }}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      id='password'
                      label='6文字以上のパスワードをご入力ください'
                      variant='outlined'
                      error={Boolean(errors.password)}
                      InputLabelProps={{shrink: false}}
                      name={name}
                      value={value}
                      type='password'
                      onChange={onChange}
                      disabled={isReadonly}
                      inputRef={ref}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name='password'
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
                  htmlFor='confirm'
                  className='formControlLabel'
                >
                  {'パスワード（確認）'}
                  <span className='formControlRequired'>{'*'}</span>
                </label>
                <Controller
                  name='confirm'
                  control={control}
                  defaultValue={''}
                  rules={{
                    required: rules.required,
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const {password} = getValues();
                        return password === value || 'パスワードが一致しません。';
                      },
                    },
                  }}
                  render={({field: {name, value, ref, onChange}}) => (
                    <TextField
                      id='confirm'
                      label=''
                      variant='outlined'
                      error={Boolean(errors.confirm)}
                      InputLabelProps={{shrink: false}}
                      name={name}
                      value={value}
                      type='password'
                      onChange={onChange}
                      disabled={isReadonly}
                      inputRef={ref}
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name='confirm'
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

export default FormSignup;

FormSignup.propTypes = {
  isReadonly: PropTypes.bool,
};

FormSignup.defaultProps = {
  isReadonly: false,
};
