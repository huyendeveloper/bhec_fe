/* eslint-disable max-lines */
/* eslint-disable no-useless-escape */
import 'date-fns';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {
  Box, Checkbox, CircularProgress, FormControl,
  FormControlLabel,
  Grid, Icon, NativeSelect,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {ErrorMessage} from '@hookform/error-message';
import {useForm, Controller} from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';

import ImageUploading from 'react-images-uploading';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import React, {useState} from 'react';

import moment from 'moment';

import {Header} from '../../../components/Layout/Header';
import {Footer} from '../../../components/Layout/Footer';
import {TopBannerWidget} from '../../../components/Widgets/TopBannerWidget';
import {ContentBlock} from '../../../components/ContentBlock';
import {Button} from '../../../components/Button';
import {StyledForm} from '../../../components/StyledForm';

import {prefectures} from '../../../constants';

import {registerSeller} from './index';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

export default function SellerForm() {
  const theme = useTheme();
  const classes = useStyles();
  const router = useRouter();

  const {control, handleSubmit, setValue, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const [iamDeputy, setIamDeputy] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [isViewedTerms, setIsViewedTerms] = useState(false);
  const [isViewedPolicy, setIsViewedPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

  const maxNumber = 3;

  const onProductImagesChange = (imageList) => {
    const imageDataUrls = [];
    imageList.forEach((image) => {
      if (image) {
        imageDataUrls.push(image.data_url);
      }
    });
    setProductImages(imageList);
    setValue('images', imageDataUrls);
  };

  // eslint-disable-next-line no-console
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await registerSeller(data);
    if (res && !res.errors) {
      setLoading(false);
      await router.push('/lp/seller-form/thanks');
    }
  };

  const DeputyInputRender = (
    <>
      {/* DEPUTY NAME */}
      <Grid
        item={true}
        xs={12}
        md={6}
      >
        <label
          htmlFor='other_name'
          className='formControlLabel'
        >
          {'⽒名（代表者と異なる場合）'}
        </label>
        <Controller
          name='other_name'
          control={control}
          defaultValue=''
          render={({field}) => (
            <TextField
              id='other_name'
              label='⽒⽒名を入力してください'
              variant='outlined'
              InputLabelProps={{shrink: false}}
              {...field}
            />
          )}
        />
      </Grid>
      {/* END DEPUTY NAME */}

      {/* DEPUTY NAME */}
      <Grid
        item={true}
        xs={12}
        md={6}
      >
        <label
          htmlFor='deputyNameKana'
          className='formControlLabel'
        >
          {'⽒名カナ（代表者と異なる場合）'}
        </label>
        <Controller
          name='other_name_kana'
          control={control}
          defaultValue=''
          render={({field}) => (
            <TextField
              id='other_name_kana'
              label='⽒⽒⽒名カナを入力してください'
              variant='outlined'
              InputLabelProps={{shrink: false}}
              {...field}
            />
          )}
        />
      </Grid>
      {/* END DEPUTY NAME */}

      {/* DEPUTY PHONE NUMBER */}
      <Grid
        item={true}
        xs={12}
        md={6}
      >
        <label
          htmlFor='other_phone'
          className='formControlLabel'
        >
          {'電話番号 （代表者と異なる場合）'}
          <span className='formControlRequired'>{'*'}</span>
        </label>
        <Controller
          name='other_phone'
          control={control}
          defaultValue=''
          rules={{
            required: 'この入力は必須です。',
            pattern: {
              value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
              message: '無効な電話番号。',
            },
          }}
          render={({field: {name, value, ref, onChange}}) => (
            <TextField
              id='other_phone'
              variant='outlined'
              label={'0000 - 000 - 0000'}
              error={Boolean(errors.other_phone)}
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
          name='other_phone'
          render={({messages}) => {
            return messages ? Object.entries(messages).map(([type, message]) => (
              <p
                className='inputErrorText'
                key={type}
              >{`⚠ ${message}`}</p>
            )) : null;
          }}
        />
      </Grid>
      {/* END DEPUTY PHONE NUMBER */}

      {/* DEPUTY EMAIL */}
      <Grid
        item={true}
        xs={12}
        md={6}
      >
        <label
          htmlFor='other_email'
          className='formControlLabel'
        >
          {'メールアドレス '}
          <span className='formControlRequired'>{'*'}</span>
        </label>
        <Controller
          name='other_email'
          control={control}
          defaultValue=''
          rules={{
            required: 'この入力は必須です。',
            pattern: {
              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'メールアドレスが無効です。',
            },
          }}
          render={({field: {name, value, ref, onChange}}) => (
            <TextField
              id='other_email'
              variant='outlined'
              error={Boolean(errors.other_email)}
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
          name='other_email'
          render={({messages}) => {
            return messages ? Object.entries(messages).map(([type, message]) => (
              <p
                className='inputErrorText'
                key={type}
              >{`⚠ ${message}`}</p>
            )) : null;
          }}
        />
      </Grid>
      {/* END DEPUTY EMAIL */}
    </>
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>{'Seller Form - Oshinagaki Store'}</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className='content'>

        <TopBannerWidget
          variant='titleBanner'
          title='出品者登録'
          imgSrc='/img/heading-banner.png'
          imgWidth={1366}
          imgHeight={240}
          imgAlt='Seller Form'
        />

        <ContentBlock
          title='出品者登録⼊⼒項⽬'
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
                {/* FIRST BLOCK */}
                <div className='formBlock'>
                  <div className='formBlockHeader'>
                    <Typography
                      component='h3'
                      className='formBlockTitle'
                    >
                      {'代表者情報'}
                    </Typography>
                    <Typography
                      component='p'
                      className='formBlockDesc'
                    >
                      {'代表者は特定商取引法上の販売責任者としてサイト上に掲載されます。'}
                    </Typography>
                  </div>

                  <div className='formBlockControls'>
                    <Grid
                      container={true}
                      spacing={3}
                    >
                      {/* NAME */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='name'
                          className='formControlLabel'
                        >
                          {'⽒名 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='name'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='name'
                              label='⽒名を入力してください'
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
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END NAME */}

                      {/* NAME KANA */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='name_kana'
                          className='formControlLabel'
                        >
                          {'⽒名カナ '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='name_kana'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='name_kana'
                              label='⽒名カナを入力してください'
                              variant='outlined'
                              error={Boolean(errors.name_kana)}
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
                          name='name_kana'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END NAME KANA */}

                      {/* BIRTHDAY */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='dbo'
                          className='formControlLabel'
                        >
                          {'⽣年⽉⽇ '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='dbo'
                          control={control}
                          defaultValue={null}
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {value, onChange}}) => (
                            <KeyboardDatePicker
                              disableToolbar={true}
                              variant='inline'
                              format='yyyy/MM/dd'
                              id='dbo'
                              label='YYYY/MM/DD'
                              InputLabelProps={{shrink: false}}
                              value={value}
                              onChange={(date) => {
                                const formatedDate = moment(date).format('YYYY/MM/DD');
                                onChange(formatedDate);
                              }}
                              autoOk={true}
                              error={Boolean(errors.dbo)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='dbo'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END BIRTHDAY */}

                      {/* GENDER */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='gender'
                          className='formControlLabel'
                        >
                          {'⽒名カナ '}
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
                                width={'12rem'}
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
                              </Box>
                            </RadioGroup>
                          )}
                        />
                      </Grid>
                      {/* END GENDER */}
                    </Grid>
                  </div>
                </div>
                {/* END FIRST BLOCK */}

                {/* SECOND BLOCK */}
                <div className='formBlock'>
                  <div className='formBlockHeader'>
                    <Typography
                      component='h3'
                      className='formBlockTitle'
                    >
                      {'代表者情報'}
                    </Typography>
                  </div>

                  <div className='formBlockControls'>
                    <Grid
                      container={true}
                      spacing={3}
                    >
                      {/* STORE NAME */}
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <label
                          htmlFor='company_name'
                          className='formControlLabel'
                        >
                          {'事業者名 (屋号/法⼈名) '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='company_name'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='company_name'
                              variant='outlined'
                              error={Boolean(errors.company_name)}
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
                          name='company_name'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END STORE NAME */}

                      {/* STORE ADDRESS */}
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <label
                          htmlFor='company_address'
                          className='formControlLabel'
                        >
                          {'事業者住所 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='company_address'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='company_address'
                              variant='outlined'
                              error={Boolean(errors.company_address)}
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
                          name='company_address'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END STORE ADDRESS */}

                      {/* POSTAL CODE */}
                      <Grid
                        item={true}
                        xs={12}
                        sm={3}
                      >
                        <label
                          htmlFor='zipcode'
                          className='formControlLabel'
                        >
                          {'郵便番号 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='zipcode'
                          control={control}
                          defaultValue='10000'
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='zipcode'
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
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END POSTAL CODE */}

                      <Grid
                        item={true}
                        xs={12}
                        sm={9}
                        style={{padding: 0}}
                      />

                      {/* PROVINCE */}
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
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END PROVINCE*/}

                      {/* DISTRICT */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='district'
                          className='formControlLabel'
                        >
                          {'市区郡 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='district'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='district'
                              variant='outlined'
                              error={Boolean(errors.district)}
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
                          name='district'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END DISTRICT */}

                      {/* TOWN */}
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <label
                          htmlFor='ward'
                          className='formControlLabel'
                        >
                          {'町村番地 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='ward'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='ward'
                              variant='outlined'
                              error={Boolean(errors.ward)}
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
                          name='ward'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END TOWN */}

                      {/* ADDRESS DETAIL */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='office_room'
                          className='formControlLabel'
                        >
                          {'建物名・部屋番号'}
                        </label>
                        <Controller
                          name='office_room'
                          control={control}
                          defaultValue=''
                          render={({field}) => (
                            <TextField
                              id='office_room'
                              variant='outlined'
                              InputLabelProps={{shrink: false}}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      {/* END ADDRESS DETAIL */}

                      {/* PHONE NUMBER */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='phone_no'
                          className='formControlLabel'
                        >
                          {'電話番号 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='phone_no'
                          control={control}
                          defaultValue=''
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
                              label={'0000 - 000 - 0000'}
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
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END PHONE NUMBER */}

                      {/* EMAIL */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='email'
                          className='formControlLabel'
                        >
                          {'メールアドレス '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='email'
                          control={control}
                          defaultValue=''
                          rules={{
                            required: 'この入力は必須です。',
                            pattern: {
                              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'メールアドレスが無効です。',
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='email'
                              variant='outlined'
                              error={Boolean(errors.email)}
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
                          name='email'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END EMAIL */}

                      {/* WEB URL */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='url_homepage'
                          className='formControlLabel'
                        >
                          {'⽣産者ホームページURL'}
                        </label>
                        <Controller
                          name='url_homepage'
                          control={control}
                          defaultValue=''
                          rules={{
                            pattern: {
                              value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                              message: '無効なURL。',
                            },
                          }}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='url_homepage'
                              variant='outlined'
                              error={Boolean(errors.url_homepage)}
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
                          name='url_homepage'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END WEB URL */}

                      {/* SHIPPING PROVIDER */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='express_delivery'
                          className='formControlLabel'
                        >
                          {'ご利⽤予定の運送会社 (希望がある場合)'}
                        </label>
                        <Controller
                          name='express_delivery'
                          control={control}
                          defaultValue=''
                          render={({field}) => (
                            <TextField
                              id='express_delivery'
                              variant='outlined'
                              InputLabelProps={{shrink: false}}
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                      {/* END SHIPPING PROVIDER */}

                    </Grid>
                  </div>
                </div>
                {/* END SECOND BLOCK */}

                {/* THIRD BLOCK */}
                <div className='formBlock'>
                  <div className='formBlockHeader'>
                    <Typography
                      component='h3'
                      className='formBlockTitle'
                    >
                      {'担当者情報・連絡先等'}
                    </Typography>
                    <Typography
                      component='p'
                      className='formBlockDesc'
                    >
                      {'代表者様と、おしながきとの窓⼝担当者様が異なる場合は、下記の必要項⽬をご記⼊ください。'}
                    </Typography>
                  </div>

                  <div className='formBlockControls'>
                    <Grid
                      container={true}
                      spacing={3}
                    >
                      {/* IS DEPUTY */}
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <Controller
                          name='representative'
                          control={control}
                          defaultValue={iamDeputy}
                          render={({field: {onChange, value}}) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={Boolean(value)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIamDeputy(checked);
                                    onChange(checked);
                                  }}
                                  name='representative'
                                />
                              }
                              label='代表者と同じ'
                            />
                          )}
                        />
                      </Grid>
                      {/* END IS DEPUTY */}

                      {/* IF USER ABOVE IS NOT DEPUTY */}
                      {iamDeputy ? null : DeputyInputRender}
                      {/* END IF USER ABOVE IS NOT DEPUTY */}

                      {/* EXHIBITED PRODUCTS */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='product_sell'
                          className='formControlLabel'
                        >
                          {'出品予定の商品（※具体的な品⽬をお答え下さい）'}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='product_sell'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='product_sell'
                              label='農作物（野菜/果物/⽶/穀類/お茶）'
                              variant='outlined'
                              error={Boolean(errors.product_sell)}
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
                          name='product_sell'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END EXHIBITED PRODUCTS */}

                      {/* EXHIBITED DATE */}
                      <Grid
                        item={true}
                        xs={12}
                        md={6}
                      >
                        <label
                          htmlFor='time_sell'
                          className='formControlLabel'
                        >
                          {'⽣年出品予定の時期 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='time_sell'
                          control={control}
                          defaultValue={null}
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {value, onChange}}) => (
                            <KeyboardDatePicker
                              disableToolbar={true}
                              variant='inline'
                              format='yyyy/MM/dd'
                              id='time_sell'
                              label='YYYY/MM/DD'
                              InputLabelProps={{shrink: false}}
                              value={value}
                              onChange={(date) => {
                                const formatedDate = moment(date).format('YYYY/MM/DD');
                                onChange(formatedDate);
                              }}
                              autoOk={true}
                              error={Boolean(errors.time_sell)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='time_sell'
                          render={({messages}) => {
                            return messages ? Object.entries(messages).map(([type, message]) => (
                              <p
                                className='inputErrorText'
                                key={type}
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      {/* END EXHIBITED DATE */}
                    </Grid>
                  </div>
                </div>
                {/* END THIRD BLOCK */}

                {/* FOURTH BLOCK*/}
                <div className='formBlock'>
                  <div className='formBlockHeader'>
                    <Typography
                      component='h3'
                      className='formBlockTitle'
                    >
                      {'画像アップロード (Max 3枚)'}
                    </Typography>
                    <Typography
                      component='p'
                      className='formBlockDesc'
                    >
                      {'⽣産現場や事業所の様⼦がわかる写真を添付してください。'} <br/>
                      {'(例)畑の様⼦・主な作業場の様⼦・⽣産に使⽤する機器類'}
                    </Typography>
                  </div>

                  <div className='formBlockControls'>
                    <ImageUploading
                      multiple={true}
                      value={productImages}
                      onChange={onProductImagesChange}
                      maxNumber={maxNumber}
                      dataURLKey='data_url'
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        dragProps,
                      }) => {
                        return (
                          <div className='imageUploadWrapper'>
                            {Array.from({length: maxNumber}, (x, i) => i).map((index) => {
                              const uploadedImage = imageList[index];
                              if (uploadedImage) {
                                return (
                                  <div
                                    key={`imageUploadItem_${index}`}
                                    className={'imageUploadItem'}
                                  >
                                    <Image
                                      onClick={() => onImageUpdate(index)}
                                      src={uploadedImage.data_url}
                                      width={78}
                                      height={80}
                                      alt={`Image upload ${index + 1}`}
                                    />
                                    <button
                                      type='button'
                                      className='imageUploadRemove'
                                      onClick={() => onImageRemove(index)}
                                    ><Icon>{'close'}</Icon></button>
                                  </div>
                                );
                              }
                              return (
                                <button
                                  key={`imgUploadBtn_${index}`}
                                  type='button'
                                  onClick={onImageUpload}
                                  className='imageUploadBtn'
                                  {...dragProps}
                                >
                                  <Image
                                    src='/img/btn-upload.png'
                                    width={80}
                                    height={80}
                                    alt='Image upload'
                                  />
                                </button>
                              );
                            })}
                          </div>
                        );
                      }}
                    </ImageUploading>

                    <div
                      className='termsAndPolicy'
                    >
                      <Box
                        mt='2rem'
                        mb='0.5rem'
                      >
                        <Typography component='h5'>
                          {'出店にあたっての同意事項 '} <span className='formControlRequired'>{'*'}</span>
                        </Typography>
                      </Box>

                      <Controller
                        name='term'
                        defaultValue={false}
                        control={control}
                        rules={{required: true}}
                        render={({field: {name, value, ref, onChange}}) => (
                          <FormControlLabel
                            className={errors.term ? 'checkboxRequiredError' : ''}
                            control={
                              <Checkbox
                                disabled={!isViewedTerms}
                                name={name}
                                checked={value}
                                inputRef={ref}
                                onChange={onChange}
                              />
                            }
                            label={(
                              <a
                                className='linkLabel'
                                href='/files/おしながき利用規約.pdf'
                                target='_blank'
                                onClick={() => {
                                  setIsViewedTerms(true);
                                  setValue('term', true);
                                }}
                              >{'「出品者利⽤規約」に同意します'}</a>
                            )}
                          />
                        )}
                      />

                      <br/>

                      <Controller
                        name='policy'
                        defaultValue={false}
                        control={control}
                        rules={{required: true}}
                        render={({field: {name, value, onChange, ref}}) => (
                          <FormControlLabel
                            className={errors.policy ? 'checkboxRequiredError' : ''}
                            control={
                              <Checkbox
                                disabled={!isViewedPolicy}
                                name={name}
                                checked={value}
                                inputRef={ref}
                                onChange={onChange}
                              />
                            }
                            label={(
                              <a
                                className='linkLabel'
                                href='/files/おしながき基準.pdf'
                                target='_blank'
                                onClick={() => {
                                  setIsViewedPolicy(true);
                                  setValue('policy', true);
                                }}
                              >{'「おしながき基準」に同意します'}</a>
                            )}
                          />
                        )}
                      />

                      {errors.term || errors.policy ? (
                        <p
                          className='inputErrorText'
                          key='need-agree'
                        >{'⚠ 出店にあたっての同意事項'}</p>
                      ) : null}
                    </div>
                  </div>

                  <Box
                    mt='1.75rem'
                    lineHeight={1.75}
                  >
                    {'本フォームの送信後、弊社にて出品審査を⾏います。'} <br/>
                    {'本フォームの送信後、3営業⽇以内（⼟⽇祝⽇除く）に、⼊⼒頂いたメールアドレスに審査結果のご連絡をいたします。'} <br/>
                    {'審査を通過された出品者様には、出品者に必要な情報をお送りいたします。'}
                  </Box>
                </div>
                {/* END FOURTH BLOCK*/}

                <Box
                  textAlign='center'
                  mt={5}
                >
                  <Button
                    variant='pill'
                    customColor='red'
                    customSize='extraLarge'
                    type='submit'
                    disabled={loading}
                  >
                    {'送信する'}
                    {loading ? (
                      <CircularProgress
                        size={24}
                      />
                    ) : null}
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
