import {ErrorMessage} from '@hookform/error-message';
import {Box, FormControl, Grid, makeStyles, NativeSelect, TextField, useMediaQuery} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Button, StyledForm} from '~/components';
import {rules} from '~/lib/validator';
import {CommonService} from '~/services';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 9, 6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 0, 5),
    },
  },
}));

const DeliveryForm = ({defaultValues, onSubmit, onClose}) => {
  const [prefectures, setPrefectures] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({criteriaMode: 'all', defaultValues});

  const fetchPrefectures = async () => {
    const res = await CommonService.getPrefectures();
    if (res && res[0]?.name) {
      setPrefectures(res);
    }
  };

  useEffect(() => {
    fetchPrefectures();
  }, []);

  const handleSubmitClick = async (data) => {
    const province = prefectures.find((item) => Number(item.code) === Number(data.province_id));
    const address = {
      ...data,
      province,
      id: nanoid(8),
    };

    if (typeof onSubmit === 'function') {
      onSubmit(address);
    }
    reset();
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <>
      <div className={classes.root}>
        <StyledForm>
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
                      defaultValue={''}
                      rules={{required: rules.required}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='name'
                          label='氏名'
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
                      defaultValue={''}
                      rules={{required: rules.required}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='zipcode'
                          label={'1000000'}
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
                      rules={{required: rules.required}}
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
                      defaultValue={''}
                      rules={{required: rules.required}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='city'
                          label='市区町村'
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
                      defaultValue={''}
                      rules={{required: rules.required}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='address'
                          label='番地・建物名'
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
                          label={'会社名'}
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
                          label={'部署名'}
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
                      defaultValue={''}
                      rules={{
                        required: rules.required,
                        pattern: rules.isPhoneNumber,
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='tel'
                          variant='outlined'
                          label={'0123456789'}
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
                onClick={handleSubmit(handleSubmitClick)}
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
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeliveryForm;
