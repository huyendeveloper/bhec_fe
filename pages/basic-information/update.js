/* eslint-disable guard-for-in */
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Box, FormControl,
  FormControlLabel,
  Grid, NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  Snackbar,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {ErrorMessage} from '@hookform/error-message';
import {useForm, Controller} from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {format as formatDate} from 'date-fns';
import {ja as jaLocale} from 'date-fns/locale';
import Router from 'next/router';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {useSetRecoilState} from 'recoil';
import React, {useState, useEffect} from 'react';

import {loadingState} from '~/store/loadingState';
import {DefaultLayout} from '~/components/Layouts';
import {Alert, ContentBlock, Button, StyledForm} from '~/components';
import {AuthService, CommonService} from '~/services';
const Auth = new AuthService();

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
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

  useEffect(() => {
    getDetailUser();
    getListCity();
  }, []);
  const {control, setValue, handleSubmit, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const getDetailUser = async () => {
    setLoading(true);
    const res = await Auth.getInfoUser();
    if (res.user) {
      setLoading(false);
      for (const property in res.user) {
        setValue(property, res.user[property]);
      }
    }
  };

  const getListCity = async () => {
    const res = await CommonService.getPrefectures();
    if (res && res.length) {
      setListCity(res);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setAlerts(null);
    const res = await Auth.updateInfoUser(data);
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
              width={isTablet ? '100%' : '48rem'}
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
                          md={12}
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
                                label='はな'
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
                                label='はな'
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
                          md={6}
                        >
                          <label
                            htmlFor='name_kana'
                            className='formControlLabel'
                          >
                            {'ひらがな '}
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
                                label='はな'
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
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {onChange, value}}) => (
                              <RadioGroup
                                value={value}
                                onChange={onChange}
                              >
                                <Box
                                  display='flex'
                                  height='3rem'
                                  alignItems='center'
                                  justifyContent={'space-between'}
                                  width={'100%'}
                                >
                                  <FormControlLabel
                                    value={0}
                                    control={<Radio/>}
                                    label='男性'
                                  />
                                  <FormControlLabel
                                    value={1}
                                    control={<Radio/>}
                                    label='女性'
                                  />
                                  <FormControlLabel
                                    value={3}
                                    control={<Radio/>}
                                    label='他'
                                  />
                                </Box>
                              </RadioGroup>
                            )}
                          />
                        </Grid>
                        <Grid
                          item={true}
                          xs={12}
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
                            rules={{required: '必須項目です。'}}
                            render={({field: {value, onChange}}) => (
                              <KeyboardDatePicker
                                disableToolbar={true}
                                variant='inline'
                                format='yyyy/MM/dd'
                                id='dob'
                                label='YYYY/MM/DD'
                                InputLabelProps={{shrink: false}}
                                value={value}
                                onChange={(date) => {
                                  const formattedDate = formatDate(date, 'yyyy/MM/dd');
                                  onChange(formattedDate);
                                }}
                                autoOk={true}
                                error={Boolean(errors.dob)}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
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
                          md={6}
                        >
                          <label
                            htmlFor='zipcode'
                            className='formControlLabel'
                          >
                            {'郵便番号 （半角数字でご入力ください。）'}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='zipcode'
                            control={control}
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='zipcode'
                                variant='outlined'
                                label='はな'
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>

                        <Grid
                          item={true}
                          xs={12}
                          md={6}
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
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <FormControl>
                                <NativeSelect
                                  className={errors.city ? 'selectBoxError' : ''}
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
                          md={6}
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
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='district'
                                variant='outlined'
                                error={Boolean(errors.district)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                label='渋谷区渋谷'
                                value={value}
                                inputRef={ref}
                                onChange={onChange}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>
                        <Grid
                          item={true}
                          xs={12}
                          md={6}
                        >
                          <label
                            htmlFor='office_room'
                            className='formControlLabel'
                          >
                            {'番地・マンション名 '}
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
                                label=' 1-2-3 渋谷マンション101号室'
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
                          md={6}
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
                            defaultValue=''
                            rules={{required: '必須項目です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='phone_no'
                                variant='outlined'
                                error={Boolean(errors.phone_no)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                label='0123456708'
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
