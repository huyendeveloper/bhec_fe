import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  NativeSelect,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import {format as formatDate} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {ja as jaLocale} from 'date-fns/locale';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useSetRecoilState, useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {signOut} from 'next-auth/client';

import {Alert, ContentBlock, StyledForm} from '~/components';
import {DefaultLayout} from '~/components/Layouts';
import {notFutureDate} from '~/lib/date';
import {isInteger} from '~/lib/number';
import {rules} from '~/lib/validator';
import {AuthService, CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {userState} from '~/store/userState';

const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    '& .MuiFormHelperText-root': {
      display: 'none',
    },

    '& .MuiTypography-body1': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        lineHeight: '1.3125rem',
      },
    },
  },

  btnSubmit: {
    width: '22.75rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    background: theme.palette.red.main,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '3rem',
    color: theme.palette.background.default,
    padding: '0.5rem 3rem',
    height: '64px',
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.background.default,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      height: '40px',
      lineHeight: '1.3125rem',
      width: '14rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    </Snackbar>
  ) : null;
};

AlertMessageForSection.propTypes = {
  alert: PropTypes.object,
  handleCloseAlert: PropTypes.func,
};

export default function BasicInformationUpdate() {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();

  const typingTimeoutRef = useRef(null);

  const [listCity, setListCity] = useState([]);
  const [alerts, setAlerts] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEmail, setCurrentEmail] = useState();

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useRecoilState(userState);

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsAuthenticated(user?.isAuthenticated);
      getDetailUser();
      getListCity();
    } else {
      requestLogin();
    }
  }, []);

  const requestLogin = () => {
    setUser({});
    signOut({redirect: false});
    router.push({pathname: '/auth/login'});
  };

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
      setCurrentEmail(res.user.email);
      for (const property in res.user) {
        if (property === 'gender') {
          if (res.user[property]) {
            setValue(property, String(res.user[property]));
          }
        } else {
          setValue(property, res.user[property]);
        }
      }
      setValue('province_id', res?.province?.id || 1);
    }
  };

  const getListCity = async () => {
    const res = await CommonService.getPrefectures();
    if (res && res.length) {
      setListCity([
        {
          id: 1,
          name: '????????????',
        },
        ...res,
      ]);
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
    if (payload.email === currentEmail) {
      updateInfo(payload);
    } else {
      const bodyUpdateEmail = {
        new_email: data.email,
      };
      const resUpdateEmail = await Auth.updateEmailUser(bodyUpdateEmail);
      if (resUpdateEmail?.data?.success) {
        setAlerts({
          type: 'success',
          message: `??????????????????????????????????????????????????????${data.email}?????????????????????????????????????????????`,
        });
        setTimeout(async () => {
          updateInfo(payload);
        }, 1000);
      } else {
        setLoading(false);
        setAlerts({
          type: 'error',
          message: '??????????????????????????????????????????????????????????????????',
        });
      }
    }
  };

  const updateInfo = async (payload) => {
    const res = await Auth.updateInfoUser(payload);
    if (res.user) {
      setLoading(false);
      setAlerts({
        type: 'success',
        message: '?????????????????????????????????',
      });
      setTimeout(() => {
        router.push({
          pathname: '/basic-information',
        });
      }, 1000);
    } else {
      setLoading(false);
      setAlerts({
        type: 'error',
        message: '??????????????????????????????????????????????????????????????????',
      });
    }
  };

  return (
    <DefaultLayout title='????????????'>
      {isAuthenticated && (
        <div className={classes.root}>
          <div className='content'>
            <ContentBlock
              title='????????????'
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
                              {'?????????????????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='nickname'
                              control={control}
                              defaultValue=''
                              rules={{required: '?????????????????????'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='nickname'
                                  label='??????????????????'
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
                              {'?????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='name'
                              control={control}
                              defaultValue=''
                              rules={{required: '?????????????????????'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='name'
                                  variant='outlined'
                                  label='??????'
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
                              {'???????????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='name_kana'
                              control={control}
                              defaultValue=''
                              rules={{required: '?????????????????????'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='name_kana'
                                  variant='outlined'
                                  label='????????????'
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
                              htmlFor='email'
                              className='formControlLabel'
                            >
                              {'????????????????????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='email'
                              control={control}
                              defaultValue=''
                              rules={{
                                required: '?????????????????????',
                                pattern: rules.isEmail,
                              }}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='email'
                                  variant='outlined'
                                  placeholder='oshinagaki@gmail.com'
                                  error={Boolean(errors.email)}
                                  InputLabelProps={{shrink: false}}
                                  name={name}
                                  maxLength={254}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.slice(0, 254);
                                  }}
                                  value={value}
                                  inputRef={ref}
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
                            xs={12}
                            sm={6}
                            md={6}
                          >
                            <label
                              htmlFor='gender'
                              className='formControlLabel'
                            >
                              {'?????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='gender'
                              control={control}
                              defaultValue='0'
                              rules={{required: '?????????????????????'}}
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
                                      label='??????'
                                    />
                                    <FormControlLabel
                                      value='1'
                                      control={<Radio/>}
                                      label='??????'
                                    />
                                    <FormControlLabel
                                      value='2'
                                      control={<Radio/>}
                                      label='???'
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
                              {'???????????? '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='dob'
                              control={control}
                              defaultValue={null}
                              rules={{
                                required: '?????????????????????',
                                validate: {
                                  checkDayFeature: () => {
                                    const {dob} = getValues();
                                    if (!isNaN(new Date(dob).getTime())) {
                                      return notFutureDate(dob) || '????????????????????????????????????';
                                    }
                                    return '?????????????????????????????????????????????';
                                  },
                                },
                              }}
                              render={({field: {value, onChange}}) => (
                                <KeyboardDatePicker
                                  variant='inline'
                                  format='yyyy/MM/dd'
                                  id='dob'
                                  label='????????????'
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
                              {'?????????????????????????????? ???????????????-??? ????????????????????????????????????'}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='zipcode'
                              control={control}
                              defaultValue=''
                              rules={{
                                required: rules.required,
                                pattern: rules.isZipcode,
                              }}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='zipcode'
                                  variant='outlined'
                                  label='????????????'
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
                              {'???????????? '}
                            </label>
                            <Controller
                              name='province_id'
                              control={control}
                              defaultValue={1}
                              rules={{
                                validate: {
                                  matchesPreviousPassword: (value) => {
                                    return value > 1 || '?????????????????????';
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
                                    style={value === 1 ? {color: '#757575'} : null}
                                  >
                                    {listCity.map((c, index) => (
                                      <option
                                        key={String(index)}
                                        value={c.id}
                                      >
                                        {c.name}
                                      </option>
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
                              {'????????????????????????????????????????????????) '}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='city'
                              control={control}
                              defaultValue=''
                              rules={{required: '?????????????????????'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='city'
                                  variant='outlined'
                                  error={Boolean(errors.city)}
                                  InputLabelProps={{shrink: false}}
                                  name={name}
                                  label='????????????'
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
                              {'??????????????????????????????????????????)'}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='office_room'
                              control={control}
                              defaultValue=''
                              rules={{required: '?????????????????????'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='office_room'
                                  variant='outlined'
                                  error={Boolean(errors.office_room)}
                                  InputLabelProps={{shrink: false}}
                                  name={name}
                                  label='??????'
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
                              htmlFor='apartment_number'
                              className='formControlLabel'
                            >
                              {'????????????????????????'}
                            </label>
                            <Controller
                              name='apartment_number'
                              control={control}
                              defaultValue=''
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='apartment_number'
                                  variant='outlined'
                                  InputLabelProps={{shrink: false}}
                                  name={name}
                                  label='????????????????????????'
                                  value={value}
                                  inputRef={ref}
                                  onChange={onChange}
                                />
                              )}
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
                              {'?????????????????????????????????????????????-??? ????????????????????????????????????'}
                              <span className='formControlRequired'>{'*'}</span>
                            </label>
                            <Controller
                              name='phone_no'
                              control={control}
                              defaultValue={''}
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
                                  label='????????????'
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
                        variant='contained'
                        type='submit'
                        className={classes.btnSubmit}
                      >
                        {'????????????'}
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
      )}
    </DefaultLayout>
  );
}
