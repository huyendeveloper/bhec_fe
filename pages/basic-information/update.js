/* eslint-disable guard-for-in */
import DateFnsUtils from '@date-io/date-fns';
import {ErrorMessage} from '@hookform/error-message';
import {
  Box, FormControl,
  FormControlLabel,
  Grid, NativeSelect,
  Radio,
  RadioGroup, Snackbar, TextField,
  useMediaQuery,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {format as formatDate} from 'date-fns';
import {ja as jaLocale} from 'date-fns/locale';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useSetRecoilState} from 'recoil';

import {notFutureDate} from '~/lib/date';
import {Alert, Button, ContentBlock, StyledForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {isInteger} from '~/lib/number';
import {rules} from '~/lib/validator';
import {AuthService, CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    '& .MuiFormHelperText-root': {
      display: 'none',
    },
  },

  formBlock: {
    borderBottom: `1px solid ${theme.blockContact.borderColor}`,
    paddingBottom: '1.5rem',
    marginBottom: '1.5rem',
  },
}));
const AlertMessageForSection = ({alert, handleCloseAlert}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseAlert();
  };
  return alert ? (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    >
      <Alert severity={alert.type}>{alert.message}</Alert>
    </Snackbar>) : null;
};

AlertMessageForSection.propTypes = {
  alert: PropTypes.object,
  handleCloseAlert: PropTypes.func,
};

export default function BasicInformationUpdate() {
  const theme = useTheme();
  const classes = useStyles();
  const [listCity, setListCity] = useState([]);
  const [alerts, setAlerts] = useState(null);
  const setLoading = useSetRecoilState(loadingState);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    getDetailUser();
    getListCity();
  }, []);

  const {control, setValue, getValues, handleSubmit, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStopTypeZipcode = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      fetchDataByZipcode(e.target.value);
    }, 300);
  };

  const fetchDataByZipcode = async (zipcode) => {
    if (zipcode.length !== 0) {
      const {response} = await CommonService.getPrefectureByZipcode(zipcode);
      if (response?.location) {
        const province = listCity.find((item) => item.name === response?.location[0].prefecture);
        setValue('province_id', province?.id);
        setValue('city', response?.location[0].city);
      }
    }
  };

  const getDetailUser = async () => {
    setLoading(true);
    const res = await Auth.getInfoUser();
    if (res.user) {
      setLoading(false);
      for (const property in res.user) {
        if (property === 'gender') {
          if (res.user[property]) {
            setValue(property, String(res.user[property]));
          }
        } else {
          setValue(property, res.user[property]);
        }
      }
    }
  };

  const getListCity = async () => {
    const res = await CommonService.getPrefectures();
    if (res && res.length) {
      setListCity([{
        id: 1,
        name: '都道府県',
      }, ...res]);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      gender: parseInt(data.gender, 10),
      dob: data.dob ? formatDate(new Date(data.dob), 'yyyy/MM/dd') : '',
    };
    setLoading(true);
    setAlerts(null);
    const res = await Auth.updateInfoUser(payload);
    if (res.user) {
      setLoading(false);
      setAlerts({
        type: 'success',
        message: '情報を正常に更新する。',
      });
      setTimeout(() => {
        Router.push({
          pathname: '/basic-information',
        });
      }, 1000);
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: res,
      });
    }
  };

  return (
    <DefaultLayout title='基本情報'>
      <div className={classes.root}>
        <div className='content'>

          <ContentBlock
            title='基本情報'
            bgImage='/img/noise.png'
            bgRepeat='repeat'
            mixBlendMode='multiply'
          >

            <Box
              m={'0 auto'}
              width={isTablet ? '100%' : '58rem'}
            >
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={jaLocale}
                >
                  <div className={classes.formBlock}>
                    <div className='formBlockControls'>
                      <Grid
                        container={true}
                        spacing={3}
                      >
                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
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
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='nickname'
                                label='ニックネーム'
                                variant='outlined'
                                error={Boolean(errors.nickname)}
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
                          xs={12}
                          sm={6}
                          md={6}
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
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='name'
                                variant='outlined'
                                label='氏名'
                                error={Boolean(errors.name)}
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
                            name='name'
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
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='name_kana'
                            className='formControlLabel'
                          >
                            {'氏名カナ '}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='name_kana'
                            control={control}
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='name_kana'
                                variant='outlined'
                                label='氏名カナ'
                                error={Boolean(errors.name_kana)}
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
                            name='name_kana'
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
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='gender'
                            className='formControlLabel'
                          >
                            {'性別 '}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='gender'
                            control={control}
                            defaultValue='0'
                            rules={{required: '必須項目です。'}}
                            render={({field: {onChange, value}}) => (
                              <RadioGroup
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.gender)}
                              >
                                <Box
                                  display='flex'
                                  height='3rem'
                                  alignItems='center'
                                  justifyContent={'space-between'}
                                  width={'100%'}
                                >
                                  <FormControlLabel
                                    value='0'
                                    control={<Radio/>}
                                    label='男性'
                                  />
                                  <FormControlLabel
                                    value='1'
                                    control={<Radio/>}
                                    label='女性'
                                  />
                                  <FormControlLabel
                                    value='2'
                                    control={<Radio/>}
                                    label='他'
                                  />
                                </Box>
                              </RadioGroup>
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name='gender'
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
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='dob'
                            className='formControlLabel'
                          >
                            {'生年月日 '}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='dob'
                            control={control}
                            defaultValue={null}
                            rules={{
                              required: '必須項目です。',
                              validate: {
                                checkDayFeature: () => {
                                  const {dob} = getValues();
                                  if (!isNaN(new Date(dob).getTime())) {
                                    return notFutureDate(dob) || '正しく入力してください。';
                                  }
                                  return '有効な日付を入力してください。';
                                },
                              },
                            }}
                            render={({field: {value, onChange}}) => (
                              <KeyboardDatePicker
                                variant='inline'
                                format='yyyy/MM/dd'
                                id='dob'
                                label='YYYY/MM/DD'
                                disableOpenPicker={true}
                                InputLabelProps={{shrink: false}}
                                value={value}
                                onChange={onChange}
                                autoOk={true}
                                error={Boolean(errors.dob)}
                                keyboardIcon={null}
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name='dob'
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
                    </div>
                  </div>
                  <div className='formBlock'>
                    <div className='formBlockControls'>
                      <Grid
                        container={true}
                        spacing={3}
                      >
                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
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
                            defaultValue=''
                            rules={{required: rules.required}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='zipcode'
                                variant='outlined'
                                label='郵便番号'
                                error={Boolean(errors.zipcode)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                value={value}
                                inputRef={ref}
                                onChange={(e) => {
                                  if (isInteger(e.target.value)) {
                                    onChange(e);
                                    handleStopTypeZipcode(e);
                                  }
                                }}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>

                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
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
                            defaultValue={1}
                            rules={{
                              validate: {
                                matchesPreviousPassword: (value) => {
                                  return value > 1 || '必須項目です。';
                                },
                              },
                            }}
                            render={({field: {name, value, ref, onChange}}) => (
                              <FormControl>
                                <NativeSelect
                                  className={errors.province_id ? 'selectBoxError' : ''}
                                  name={name}
                                  value={value}
                                  inputRef={ref}
                                  onChange={onChange}
                                >
                                  {listCity.map((c, index) => (
                                    <option
                                      key={String(index)}
                                      value={c.id}
                                    >{c.name}</option>
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>

                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='city'
                            className='formControlLabel'
                          >
                            {'市区町村（全角でご入力ください。) '}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='city'
                            control={control}
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='city'
                                variant='outlined'
                                error={Boolean(errors.city)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                label='市区町村'
                                value={value}
                                inputRef={ref}
                                onChange={onChange}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>
                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='office_room'
                            className='formControlLabel'
                          >
                            {'番地・建物名 (全角でご入力ください。) '}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='office_room'
                            control={control}
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='office_room'
                                variant='outlined'
                                error={Boolean(errors.office_room)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                label='番地・建物名'
                                value={value}
                                inputRef={ref}
                                onChange={onChange}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>
                        <Grid
                          item={true}
                          xs={12}
                          sm={6}
                          md={6}
                        >
                          <label
                            htmlFor='phone_no'
                            className='formControlLabel'
                          >
                            {'電話番号（半角数字、ハイフン（-） なしでご入力ください。）'}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='phone_no'
                            control={control}
                            defaultValue=''
                            rules={{
                              required: rules.required,
                              pattern: rules.isPhoneNumber,
                            }}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='phone_no'
                                variant='outlined'
                                error={Boolean(errors.phone_no)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                label='電話番号'
                                value={value}
                                inputRef={ref}
                                onChange={(e) => {
                                  if (isInteger(e.target.value)) {
                                    onChange(e);
                                  }
                                }}
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
                </MuiPickersUtilsProvider>
              </StyledForm>
            </Box>

          </ContentBlock>

        </div>
        <AlertMessageForSection
          alert={alerts}
          handleCloseAlert={() => setAlerts(null)}
        />
      </div>
    </DefaultLayout>
  );
}
