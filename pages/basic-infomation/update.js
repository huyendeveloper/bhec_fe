import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Box, FormControl,
  FormControlLabel,
  Grid, NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import {ErrorMessage} from '@hookform/error-message';
import {useForm, Controller} from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {jaLocale, format as formatDate} from 'date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import React from 'react';

import {Header} from '../../components/Layout/Header';
import {Footer} from '../../components/Layout/Footer';
import {ContentBlock} from '../../components/ContentBlock';
import {Button} from '../../components/Button';
import {StyledForm} from '../../components/StyledForm';

import {prefectures} from '../../constants';

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

export default function BasicInfomationUpdate() {
  const theme = useTheme();
  const classes = useStyles();

  const {control, handleSubmit, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <Header showMainMenu={false}/>

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
                        md={6}
                      >
                        <label
                          htmlFor='nick_name'
                          className='formControlLabel'
                        >
                          {'ニックネーム '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='nick_name'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='nick_name'
                              label='はな'
                              variant='outlined'
                              error={Boolean(errors.nick_name)}
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
                          name='nick_name'
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
                          htmlFor='user_id'
                          className='formControlLabel'
                        >
                          {'ログインID '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='user_id'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='user_id'
                              label='はな'
                              variant='outlined'
                              error={Boolean(errors.user_id)}
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
                          name='user_id'
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
                          htmlFor='password'
                          className='formControlLabel'
                        >
                          {'現在のパスワード '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='password'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='password'
                              label='⽒名カナを入力してください'
                              variant='outlined'
                              error={Boolean(errors.password)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              type='password'
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
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='confirm_password'
                          className='formControlLabel'
                        >
                          {'現在のパスワード '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='confirm_password'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='confirm_password'
                              label='⽒名カナを入力してください'
                              variant='outlined'
                              error={Boolean(errors.confirm_password)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              type='password'
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='confirm_password'
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

                <div className={classes.formBlock}>
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
                          htmlFor='full_name'
                          className='formControlLabel'
                        >
                          {'氏名 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='full_name'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='full_name'
                              variant='outlined'
                              label='はな'
                              error={Boolean(errors.full_name)}
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
                          name='full_name'
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
                          htmlFor='aphabet'
                          className='formControlLabel'
                        >
                          {'ひらがな '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='aphabet'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='aphabet'
                              variant='outlined'
                              label='はな'
                              error={Boolean(errors.aphabet)}
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
                          name='aphabet'
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
                          defaultValue={'male'}
                          rules={{required: 'この入力は必須です。'}}
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
                                  value='male'
                                  control={<Radio/>}
                                  label='男性'
                                />
                                <FormControlLabel
                                  value='female'
                                  control={<Radio/>}
                                  label='女性'
                                />
                                <FormControlLabel
                                  value='he'
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
                          htmlFor='birthday'
                          className='formControlLabel'
                        >
                          {'生年月日 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='birthday'
                          control={control}
                          defaultValue={null}
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {value, onChange}}) => (
                            <KeyboardDatePicker
                              disableToolbar={true}
                              variant='inline'
                              format='yyyy/MM/dd'
                              id='birthday'
                              label='YYYY/MM/DD'
                              InputLabelProps={{shrink: false}}
                              value={value}
                              onChange={(date) => {
                                const formatedDate = formatDate(date, 'yyyy/MM/dd');
                                onChange(formatedDate);
                              }}
                              autoOk={true}
                              error={Boolean(errors.birthday)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='birthday'
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
                          htmlFor='zip_code'
                          className='formControlLabel'
                        >
                          {'郵便番号 （半角数字でご入力ください。）'}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='zip_code'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='zip_code'
                              variant='outlined'
                              label='はな'
                              error={Boolean(errors.zip_code)}
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
                          name='zip_code'
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
                          htmlFor='prefectures'
                          className='formControlLabel'
                        >
                          {'都道府県 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='prefectures'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <FormControl>
                              <NativeSelect
                                className={errors.prefectures ? 'selectBoxError' : ''}
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
                          name='prefectures'
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
                          htmlFor='municipality'
                          className='formControlLabel'
                        >
                          {'市区町村 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='municipality'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='municipality'
                              variant='outlined'
                              error={Boolean(errors.municipality)}
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
                          name='municipality'
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
                          htmlFor='adress'
                          className='formControlLabel'
                        >
                          {'番地・マンション名 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='adress'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='adress'
                              variant='outlined'
                              error={Boolean(errors.adress)}
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
                          name='adress'
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
                          htmlFor='phone_number'
                          className='formControlLabel'
                        >
                          {'電話番号（配送時にご連絡させていただく事があります。） '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='phone_number'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='phone_number'
                              variant='outlined'
                              error={Boolean(errors.phone_number)}
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
                          name='phone_number'
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

      <Footer/>
    </div>
  );
}
