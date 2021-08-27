import {ErrorMessage} from '@hookform/error-message';
import {Box, FormControl, Grid, Icon, makeStyles, NativeSelect, TextField, useMediaQuery} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {getSession} from 'next-auth/client';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Button, StyledForm} from '~/components';
import {AddressService} from '~/services/address.services';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 9, 6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 0, 5),
    },
  },
}));

const DeliveryForm = (props) => {
  const {dataEdit, editMode, handleClose, prefectures} = props;
  const classes = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const checkAuthenticated = async () => {
    const session = await getSession();
    if (session == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const onSubmit = async (data) => {
    if (isAuthenticated) {
      const result = await AddressService.createAddress(data);
      if (result.status === 201) {
        // eslint-disable-next-line no-console
        console.log('success');
      }
    } else {
      const prefecture = prefectures.find((item) => Number(item.code) === Number(data.province_id));
      window.localStorage.setItem('address', JSON.stringify({...data, province: prefecture}));
    }
    handleClose();
  };

  return (
    <>
      <div className={classes.root}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <>
            <div className='formBlock'>
              <div className='formBlockControls'>
                <Grid
                  container={true}
                  spacing={3}
                >
                  {/*NAME*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='name'
                      className='formControlLabel'
                    >
                      {'氏名 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='name'
                      control={control}
                      defaultValue={editMode ? dataEdit.name : ''}
                      rules={{required: '必須項目です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='name'
                          label='鈴木はなこ'
                          variant='outlined'
                          error={Boolean(errors.name)}
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
                      name='name'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END NAME*/}

                  {/*ZIP CODE*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='zipcode'
                      className='formControlLabel'
                    >
                      {'郵便番号（半角数字でご入力ください。）'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='zipcode'
                      control={control}
                      defaultValue={editMode ? dataEdit.zipcode : ''}
                      rules={{required: '必須項目です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='zipcode'
                          label={'3331234'}
                          variant='outlined'
                          error={Boolean(errors.zipcode)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='zipcode'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END ZIP CODE*/}

                  {/*PROVINCE*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='province_id'
                      className='formControlLabel'
                    >
                      {'都道府県 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='province_id'
                      control={control}
                      defaultValue=''
                      rules={{required: '必須項目です。',
                        validate: {
                          matchesPreviousPassword: (value) => {
                            return value !== 0 || '必須項目です。';
                          },
                        }}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <FormControl>
                          <NativeSelect
                            className={errors.province_id ? 'selectBoxError' : ''}
                            name={name}
                            value={value}
                            inputRef={ref}
                            onChange={onChange}
                          >
                            {prefectures.map((pref) => (
                              <option
                                key={pref.code}
                                value={pref.code}
                              >{pref.name}</option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='province_id'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END PROVINCE*/}

                  {/*CITY*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='city'
                      className='formControlLabel'
                    >
                      {'市区町村 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='city'
                      control={control}
                      defaultValue={editMode ? dataEdit.city : ''}
                      rules={{required: '必須項目です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='city'
                          label='渋谷区渋谷'
                          variant='outlined'
                          error={Boolean(errors.city)}
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
                      name='city'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END CITY*/}

                  {/*ADDRESS DETAIL*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='address'
                      className='formControlLabel'
                    >
                      {'番地・建物名 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='address'
                      control={control}
                      defaultValue={editMode ? dataEdit.address : ''}
                      rules={{required: '必須項目です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='address'
                          label=' 1-2-3 渋谷マンション101号室'
                          variant='outlined'
                          error={Boolean(errors.city)}
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
                      name='address'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END ADDRESS DETAIL*/}

                  {/*COMPANY NAME*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='company_name'
                      className='formControlLabel'
                    >
                      {'会社名'}
                    </label>
                    <Controller
                      name='company_name'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                        <TextField
                          label={'ABC株式会社'}
                          id='company_name'
                          variant='outlined'
                          InputLabelProps={{shrink: false}}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  {/*END COMPANY NAME*/}

                  {/*DEPARTMENT NAME*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='department'
                      className='formControlLabel'
                    >
                      {'部署名'}
                    </label>
                    <Controller
                      name='department'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                        <TextField
                          label={'ABC株式会社'}
                          id='department'
                          variant='outlined'
                          InputLabelProps={{shrink: false}}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  {/*END DEPARTMENT NAME*/}

                  {/*PHONE NUMBER*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='tel'
                      className='formControlLabel'
                    >
                      {'電話番号（配送時にご連絡させていただく事があります。） '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='tel'
                      control={control}
                      defaultValue={editMode ? dataEdit.tel : ''}
                      rules={{
                        required: '必須項目です。',
                        pattern: {
                          value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                          message: '無効な電話番号。',
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='tel'
                          variant='outlined'
                          label={'0123456708'}
                          error={Boolean(errors.tel)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                        />
                      )}
                    />
                    <ErrorMessage
                      errors={errors}
                      name='tel'
                      render={({messages}) => {
                        return messages ? Object.entries(messages).map(([type, message]) => (
                          <p
                            className='inputErrorText'
                            key={type}
                          >
                            <Icon>{'warning_amber'}</Icon>
                            {message}
                          </p>
                        )) : null;
                      }}
                    />
                  </Grid>
                  {/*END PHONE NUMBER*/}

                </Grid>
              </div>
            </div>
            <Box
              textAlign='center'
              mt={5}
            >
              <Button
                variant='pill'
                customColor='red'
                customSize={isMobile ? 'small' : 'extraLarge'}
                type='submit'
              >
                {'保存する'}
              </Button>
            </Box>
          </>
        </StyledForm>
      </div>
    </>
  );
};

DeliveryForm.propTypes = {
  dataEdit: PropTypes.any.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prefectures: PropTypes.array.isRequired,
};

DeliveryForm.defaultProps = {
  editMode: false,
};

export default DeliveryForm;
