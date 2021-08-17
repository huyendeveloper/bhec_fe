import React from 'react';
import PropTypes from 'prop-types';
import {Box, makeStyles, TextField, Grid, Icon, FormControl, NativeSelect} from '@material-ui/core';
import {useForm, Controller} from 'react-hook-form';

import {ErrorMessage} from '@hookform/error-message';

import {Button, StyledForm} from '~/components';
import {prefectures} from '~/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}));

const DeliveryForm = (props) => {
  const {dataEdit, editMode} = props;
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
                      rules={{required: 'この入力は必須です。'}}
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

                  {/*POSTAL CODE*/}
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
                      rules={{required: 'この入力は必須です。'}}
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
                  {/*END POSTAL CODE*/}

                  {/*PROVINCE*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='city'
                      className='formControlLabel'
                    >
                      {'都道府県 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='city'
                      control={control}
                      defaultValue=''
                      rules={{required: 'この入力は必須です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <FormControl>
                          <NativeSelect
                            className={errors.city ? 'selectBoxError' : ''}
                            name={name}
                            value={value}
                            inputRef={ref}
                            onChange={onChange}
                          >
                            {prefectures.map((pref, index) => (
                              <option
                                key={String(index)}
                                value={pref.value}
                              >{pref.label}</option>
                            ))}
                          </NativeSelect>
                        </FormControl>
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
                  {/*END PROVINCE*/}

                  {/*DISTRICT*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='district'
                      className='formControlLabel'
                    >
                      {'市区町村 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='district'
                      control={control}
                      defaultValue={editMode ? dataEdit.district : ''}
                      rules={{required: 'この入力は必須です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='district'
                          label='渋谷区渋谷'
                          variant='outlined'
                          error={Boolean(errors.district)}
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
                      name='district'
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
                  {/*END DISTRICT*/}

                  {/*ADDRESS DETAIL*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='office_room'
                      className='formControlLabel'
                    >
                      {'番地・建物名 '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='office_room'
                      control={control}
                      defaultValue={editMode ? dataEdit.office_room : ''}
                      rules={{required: 'この入力は必須です。'}}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='office_room'
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
                      name='office_room'
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
                      htmlFor='department_name'
                      className='formControlLabel'
                    >
                      {'部署名'}
                    </label>
                    <Controller
                      name='department_name'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                        <TextField
                          label={'ABC株式会社'}
                          id='department_name'
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
                      htmlFor='phone_no'
                      className='formControlLabel'
                    >
                      {'電話番号（配送時にご連絡させていただく事があります。） '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='phone_no'
                      control={control}
                      defaultValue={editMode ? dataEdit.phone_no : ''}
                      rules={{
                        required: 'この入力は必須です。',
                        pattern: {
                          value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                          message: '無効な電話番号。',
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='phone_no'
                          variant='outlined'
                          label={'0123456708'}
                          error={Boolean(errors.phone_no)}
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
                      name='phone_no'
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
                customSize='extraLarge'
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
};

DeliveryForm.defaultProps = {
  editMode: false,
};

export default DeliveryForm;
