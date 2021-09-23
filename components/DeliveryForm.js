import {Box, FormControl, Grid, makeStyles, NativeSelect, TextField, useMediaQuery} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useSetRecoilState} from 'recoil';

import {Button, StyledForm} from '~/components';
import {rules} from '~/lib/validator';
import {CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {isFullWidth} from '~/lib/text';
import {ErrorMessageWidget} from '~/components/Widgets';

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
  const setLoading = useSetRecoilState(loadingState);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
    reset,
  } = useForm({criteriaMode: 'all', defaultValues});

  const fetchPrefectures = async () => {
    setLoading(true);
    const res = await CommonService.getPrefectures();
    if (res && res[0]?.name) {
      setPrefectures(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrefectures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitClick = async (data) => {
    const province = prefectures.find((item) => Number(item.id) === Number(data.province_id));
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

  const handleLeaveZipcode = async (e) => {
    const {city, province_id} = getValues();
    const zipcode = e.target.value;
    // eslint-disable-next-line no-underscore-dangle
    if (city === '' && province_id === '1' && zipcode.length !== 0) {
      const {response} = await CommonService.getPrefectureByZipcode(zipcode);
      if (response?.location) {
        const province = prefectures.find((item) => item.name === response?.location[0].prefecture);
        setValue('province_id', province?.code);
        setValue('city', response?.location[0].city);
      }
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
                    <ErrorMessageWidget
                      errors={errors}
                      name='name'
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
                      {'郵便番号（半角数字、 ハイフン（-） なしでご入力ください。）'}
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
                          label={'郵便番号'}
                          variant='outlined'
                          error={Boolean(errors.zipcode)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                          onBlur={handleLeaveZipcode}
                        />
                      )}
                    />
                    <ErrorMessageWidget
                      errors={errors}
                      name='zipcode'
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
                      defaultValue={'1'}
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
                                key={pref.id}
                                value={pref.id}
                              >{pref.name}</option>
                            ))}
                          </NativeSelect>
                        </FormControl>
                      )}
                    />
                    <ErrorMessageWidget
                      errors={errors}
                      name='province_id'
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
                          onInput={(e) => {
                            if (!isFullWidth(e.target.value)) {
                              e.target.value = e.target.value.replace(e.target.value, '');
                            }
                          }}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessageWidget
                      errors={errors}
                      name='city'
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
                      {'番地・建物名 (全角でご入力ください。)'}
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
                          onInput={(e) => {
                            if (!isFullWidth(e.target.value)) {
                              e.target.value = e.target.value.replace(e.target.value, '');
                            }
                          }}
                          inputRef={ref}
                        />
                      )}
                    />
                    <ErrorMessageWidget
                      errors={errors}
                      name='address'
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
                      {'電話番号（半角数字、ハイフン（-） なしでご入力ください。）'}
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
                          label={'電話番号'}
                          error={Boolean(errors.tel)}
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          inputRef={ref}
                          onChange={onChange}
                        />
                      )}
                    />
                    <ErrorMessageWidget
                      errors={errors}
                      name='tel'
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
