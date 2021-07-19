/* eslint-disable max-lines */
/* eslint-disable no-useless-escape */
import 'date-fns';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Head from 'next/head';
import Image from 'next/image';
import {
  Box, CircularProgress, FormControl,
  Grid, Icon, NativeSelect,
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
} from '@material-ui/pickers';

import React, {useState, useEffect} from 'react';

import {Header} from '../../components/Layout/Header';
import {Footer} from '../../components/Layout/Footer';
import {ContentBlock} from '../../components/ContentBlock';
import {Button} from '../../components/Button';
import {StyledForm} from '../../components/StyledForm';
import {ThanksPopup} from '../../components/Contact';

import {contactType} from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',

    '& .formBlockTitle': {
      fontSize: '1rem',
      textAlign: 'center',
    },
    '& .formBlockDesc': {
      fontSize: '1rem',
      textAlign: 'center',
    },
    '& .formBlockNote': {
      fontSize: '1rem',
      textAlign: 'center',
      marginTop: '1rem',
      '& .formBlockLink': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
    '& .formBlockTitleImage': {
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: '1.5rem',
      marginBottom: '0.5rem',
    },
    '& .formBlockDescImage': {
      fontSize: '1rem',
    },
    '& .inputEditor .MuiInputBase-input': {
      height: '20rem',
    },
    '& .formBlockExchange': {
      padding: '1.55rem',
      background: '#F1F1F1',
      border: `1px solid ${theme.blockContact.borderColor}`,
      boxSizing: 'border-box',
    },
    '& .gridBlockExchange': {
      marginBottom: '1rem',
      '& .MuiInputBase-input': {
        background: theme.palette.background.default,
      },
    },
    '& .addProductDiv': {
      margin: '1rem 0',
      display: 'flex',
      '& .icAdd': {
        marginRight: '0.5rem',
      },
    },

  },
}));

const products = [
  {id: 1, order_number: '', product_code: '', inquiry: ''},
];

export default function ContactPage() {
  const theme = useTheme();
  const classes = useStyles();

  const {control, handleSubmit, setValue, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const [productImages, setProductImages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [typeContact, setTypeContact] = useState(1);
  const [listProduct, setListProduct] = useState(products);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    setValue('type', 1, {shouldValidate: true});
  }, []);

  const maxNumber = 1;
  const handleClose = () => {
    setOpen(false);
  };

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

  const onChangeType = (e) => {
    setValue('type', e.target.value, {shouldValidate: true});
    setTypeContact(Number(e.target.value));
  };

  const addProduct = () => {
    if (listProduct.length === 3) {
      return;
    }
    const newListProduct = [...listProduct, {id: listProduct.length + 1, order_number: '', product_code: '', inquiry: ''}];
    setListProduct(newListProduct);
  };

  const ExchangeRender = listProduct.map((item) =>
    (
      <>
        <Grid
          item={true}
          xs={12}
          md={12}
          key={item.id}
        >
          <label
            htmlFor='infomation'
            className='formControlLabel'
          >
            {'種別 '}
            <span className='formControlRequired'>{'*'}</span>
          </label>
          <div className='formBlockExchange'>
            <Grid
              item={true}
              xs={12}
              md={12}
              className='gridBlockExchange'
            >
              <label
                htmlFor='order_number'
                className='formControlLabel'
              >
                {'注文番号'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name='order_number'
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
                    id='order_number'
                    variant='outlined'
                    label={'注文番号をご入力ください。'}
                    error={Boolean(errors.order_number)}
                    InputLabelProps={{shrink: false}}
                    name={name}
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
              md={12}
              className='gridBlockExchange'
            >
              <label
                htmlFor='product_code'
                className='formControlLabel'
              >
                {'商品コード'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name='product_code'
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
                    id='product_code'
                    variant='outlined'
                    label={'商品コードをご入力ください。'}
                    error={Boolean(errors.product_code)}
                    InputLabelProps={{shrink: false}}
                    name={name}
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
              md={12}
              className='gridBlockExchange'
            >
              <label
                htmlFor='inquiry'
                className='formControlLabel'
              >
                {'問い合わせ内容'}
                <span className='formControlRequired'>{'*'}</span>
              </label>
              <Controller
                name='inquiry'
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
                    id='inquiry'
                    variant='outlined'
                    error={Boolean(errors.inquiry)}
                    InputLabelProps={{shrink: false}}
                    name={name}
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <div className='formBlockHeader'>
              <Typography
                component='h3'
                className='formBlockTitleImage'
              >
                {'画像アップロード（任意）'}
              </Typography>
              <Typography
                component='p'
                className='formBlockDescImage'
              >
                {'5MB未満の画像(jpg, png)をアップロードすることができます。'}
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
            </div>
          </div>
          <div className='addProductDiv'>
            <Icon
              className='icAdd'
              onClick={() => addProduct()}
            >{'add_circle'}</Icon>
            <div className='desc'>
              <Typography
                component='p'
                className='formBlockDescImage'
              >
                {'商品を追加する'}
              </Typography>
              <Typography
                component='p'
                className='formBlockDescImage'
              >
                {'商品を3つまで追加することができます。'}
              </Typography>
            </div>
          </div>
        </Grid>
      </>
    ),
  );

  // eslint-disable-next-line no-console
  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    setOpen(true);

    // setLoading(true);
    // const res = await registerSeller(data);
    // if (res && !res.errors) {
    //   setLoading(false);
    //   await router.push('/lp/seller-form/thanks');
    // }
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{'Contact Page - Oshinagaki Store'}</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
      </Head>

      <Header showMainMenu={false}/>

      <div className='content'>
        <ContentBlock
          title='お問い合わせフォーム'
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
                      {'個人のお客様用フォーム'}
                    </Typography>
                    <Typography
                      component='p'
                      className='formBlockDesc'
                    >
                      {'入力フォームに必要事項をご記入のうえ、【送信】をクリックしてください。'}
                    </Typography>

                    <Typography
                      component='p'
                      className='formBlockNote'
                    >
                      <span>{'法人のお客様は<'}</span>
                      <span className='formBlockLink'>{'こちら'}</span>
                      <span>{'から'}</span>
                    </Typography>
                  </div>
                </div>
                {/* SECOND BLOCK */}
                <div className='formBlock'>
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
                              error={Boolean(errors.full_name)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              placeholder={'鈴木はなこ'}
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
                              >{`⚠ ${message}`}</p>
                            )) : null;
                          }}
                        />
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <label
                          htmlFor='mail_address'
                          className='formControlLabel'
                        >
                          {'メールアドレス '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='mail_address'
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
                              id='mail_address'
                              variant='outlined'
                              error={Boolean(errors.mail_address)}
                              InputLabelProps={{shrink: false}}
                              name={name}
                              value={value}
                              inputRef={ref}
                              placeholder={'oshinagaki@gmail.com'}
                              onChange={onChange}
                            />
                          )}
                        />
                        <ErrorMessage
                          errors={errors}
                          name='mail_address'
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
                      <Grid
                        item={true}
                        xs={12}
                        md={12}
                      >
                        <label
                          htmlFor='type'
                          className='formControlLabel'
                        >
                          {'種別 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='type'
                          control={control}
                          defaultValue=''
                          // eslint-disable-next-line lines-around-comment
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref}}) => (
                            <FormControl>
                              <NativeSelect
                                className={errors.type ? 'selectBoxError' : ''}
                                name={name}
                                value={value}
                                inputRef={ref}
                                onChange={onChangeType}
                              >
                                {contactType.map((pref, index) => (
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
                          name='type'
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
                      {typeContact === 8 && ExchangeRender}

                      {typeContact !== 8 &&
                        <Grid
                          item={true}
                          xs={12}
                        >
                          <label
                            htmlFor='inquiry'
                            className='formControlLabel'
                          >
                            {'問い合わせ内容'}
                            <span className='formControlRequired'>{'*'}</span>
                          </label>
                          <Controller
                            name='inquiry'
                            control={control}
                            defaultValue=''
                            rules={{required: 'この入力は必須です。'}}
                            render={({field: {name, value, ref, onChange}}) => (
                              <TextField
                                id='inquiry'
                                variant='outlined'
                                error={Boolean(errors.inquiry)}
                                InputLabelProps={{shrink: false}}
                                name={name}
                                value={value}
                                inputRef={ref}
                                onChange={onChange}
                                className='inputEditor'
                              />
                            )}
                          />
                          <ErrorMessage
                            errors={errors}
                            name='inquiry'
                            render={({messages}) => {
                              return messages ? Object.entries(messages).map(([type, message]) => (
                                <p
                                  className='inputErrorText'
                                  key={type}
                                >{`⚠ ${message}`}</p>
                              )) : null;
                            }}
                          />
                        </Grid>}
                    </Grid>
                  </div>
                </div>
                {/* FOURTH BLOCK*/}
                {typeContact !== 8 && <div className='formBlock'>
                  <div className='formBlockHeader'>
                    <Typography
                      component='h3'
                      className='formBlockTitleImage'
                    >
                      {'画像アップロード（任意）'}
                    </Typography>
                    <Typography
                      component='p'
                      className='formBlockDescImage'
                    >
                      {'5MB未満の画像(jpg, png)をアップロードすることができます。'}
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
                  </div>
                </div>}
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
                    {'内容確認'}
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

      {open &&
        <ThanksPopup
          open={open}
          handleClose={handleClose}
        />
      }
    </div>
  );
}
