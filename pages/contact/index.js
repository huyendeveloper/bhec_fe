/* eslint-disable no-useless-escape */
import 'date-fns';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Image from 'next/image';
import {
  Box, CircularProgress, FormControl,
  Grid, Icon, NativeSelect,
  TextField,
  Link,
  useMediaQuery,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {ErrorMessage} from '@hookform/error-message';
import {useForm, Controller} from 'react-hook-form';

import ImageUploading from 'react-images-uploading';

import clsx from 'clsx';
import React, {useState, useEffect} from 'react';

import {ContentBlock, Header, Footer, Button, StyledForm} from '~/components';
import {ContactService} from '~/services';
const Contact = new ContactService();
import {ContactProduct, ThanksPopup} from '~/components/Contact';

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
        color: theme.palette.buttonLogin.default,
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
      background: theme.boxProduct.background,
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
        width: '1.75rem',
        height: '1.75rem',
        fontSize: '1.75rem',
        marginRight: '0.5rem',
      },
    },
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  tabItem: {
    width: '13rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px 0px 0px 4px',
    background: '#FFFFFF',
    border: `1px solid ${theme.blockContact.borderColor}`,
    boxSizing: 'border-box',
    color: 'black',
    cursor: 'pointer',
  },
  active: {
    color: 'white',
    background: theme.palette.buttonLogin.default,
  },

  btnPrev: {
    background: theme.palette.white.main,
    border: '1px solid #333333',
    boxSizing: 'border-box',
    borderRadius: '45px',
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
  },

  btnSubmit: {
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
    background: theme.palette.red.main,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: '45px',
    color: theme.palette.white.main,

    '&:hover': {
      background: theme.palette.red.main,
      color: theme.palette.white.main,
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
  const [valueProductImages, setValueProductImages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [listContactCategory, setListContactCategory] = useState([]);
  const [typeContact, setTypeContact] = useState();
  const [listProduct, setListProduct] = useState(products);
  const [open, setOpen] = useState(false);
  const [tabActive, setTabActive] = useState(1);
  const [requestNo, setRequestNo] = useState();

  useEffect(() => {
    setValue('contact_category_id', 1, {shouldValidate: true});
    getListContactCategory();
  }, []);

  const getListContactCategory = async () => {
    const result = await Contact.getContactCategories();
    if (result) {
      setListContactCategory(result);
    }
  };

  const maxNumber = 3;
  const handleClose = () => {
    setOpen(false);
  };

  const onProductImagesChange = (imageList) => {
    const imageDataUrls = [];
    imageList.forEach((image) => {
      if (image) {
        imageDataUrls.push(image.file);
      }
    });
    setProductImages(imageList);
    setValue('images', imageDataUrls);
  };

  const onContactProductImagesChange = (imageList, index) => {
    const imageDataUrls = [];
    imageList.forEach((image) => {
      if (image) {
        imageDataUrls.push(image.file);
      }
    });
    setValueProductImages({
      ...valueProductImages,
      [`productImages${index}`]: imageList,
    });
  };

  const onChangeType = (e) => {
    setValue('contact_category_id', e.target.value, {shouldValidate: true});
    setTypeContact(Number(e.target.value));
  };

  const addProduct = () => {
    if (listProduct.length === 3) {
      return;
    }
    const newListProduct = [...listProduct, {id: listProduct.length + 1, order_number: '', product_code: '', inquiry: ''}];
    newListProduct.map((item, index) => {
      setValueProductImages({
        ...valueProductImages,
        [`productImages${index}`]: [],
      });
      return false;
    });
    setListProduct(newListProduct);
  };

  const removeProduct = (index) => {
    listProduct.splice(index, 1);
    setListProduct([...listProduct]);
  };

  const ExchangeRender = listProduct.map((item, indexP) =>
    (
      <ContactProduct
        product={item}
        key={indexP}
        index={indexP}
        onContactProductImagesChange={onContactProductImagesChange}
        productImages={productImages}
        addProduct={addProduct}
        maxNumber={maxNumber}
        errors={errors}
        control={control}
        valueProductImages={valueProductImages}
        removeProduct={removeProduct}
      />
    ),
  );

  const onSubmit = async (data) => {
    if (Number.parseInt(data.contact_category_id, 10) !== 5) {
      const bodyFormData = new FormData();
      bodyFormData.append('contact_category_id', data.contact_category_id);
      bodyFormData.append('name', data.name);
      bodyFormData.append('email', data.email);
      bodyFormData.append('description', data.description);
      bodyFormData.append('images', data.images);
      const configHeader = {
        'Content-Type': 'multipart/form-data',
      };
      const res = await Contact.createContact(bodyFormData, configHeader);
      if (res.id) {
        setOpen(true);
        setRequestNo(res.request_no);
      }
    } else if (Number.parseInt(data.contact_category_id, 10) === 5) {
      const bodyFormData = new FormData();
      bodyFormData.append('contact_category_id', data.contact_category_id);
      bodyFormData.append('name', data.name);
      bodyFormData.append('email', data.email);
      const configHeader = {
        'Content-Type': 'multipart/form-data',
      };
      const res = await Contact.createContact(bodyFormData, configHeader);
      if (res) {
        setRequestNo(res.request_no);
        const body = new FormData();
        listProduct.forEach(async (item, index) => {
          body.append('contact_id', res.id);
          body.append('order_number', data[`order_number${index}`]);
          body.append('product_code', data[`product_code${index}`]);
          body.append('description', data[`description${index}`]);
          body.append('images', valueProductImages[`productImages${index}`]);
          const result = await Contact.createContactProduct(body, configHeader);
          if (result) {
            setOpen(true);
          }
        });
      }
    }
  };

  return (
    <div className={classes.root}>
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
            <div className={classes.tab}>
              <div
                className={`${classes.tabItem}  ${tabActive === 1 ? classes.active : ''}`}
                onClick={() => setTabActive(1)}
              >{'個人'}</div>
              <div
                className={clsx(classes.tabItem, tabActive === 2 ? classes.active : '')}
                onClick={() => setTabActive(2)}
              >{'法人'}</div>
            </div>
            <div className='formBlock'>
              <div
                className='formBlockHeader'
                style={{marginBottom: '2rem'}}
              >
                <Typography
                  component='h3'
                  className='formBlockTitle'
                >
                  {tabActive === 1 ? '個人のお客様用フォーム' : '法人のお客様用フォーム'}
                </Typography>
                <Typography
                  component='p'
                  className='formBlockDesc'
                >
                  {'入力フォームに必要事項をご記入のうえ、【送信】をクリックしてください。'}
                </Typography>

                {tabActive === 2 &&
                <Typography
                  component='p'
                  className='formBlockNote'
                >
                  <span>{'法人のお客様は<'}</span>
                  <span className='formBlockLink'>{'こちら'}</span>
                  <span>{'から'}</span>
                </Typography>}
              </div>
            </div>
            {tabActive === 1 && <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
                        rules={{required: 'この入力は必須です。'}}
                        render={({field: {name, value, ref, onChange}}) => (
                          <TextField
                            id='name'
                            variant='outlined'
                            error={Boolean(errors.name)}
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
                    <Grid
                      item={true}
                      xs={12}
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
                            placeholder={'oshinagaki@gmail.com'}
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
                    <Grid
                      item={true}
                      xs={12}
                      md={12}
                    >
                      <label
                        htmlFor='contact_category_id'
                        className='formControlLabel'
                      >
                        {'種別 '}
                        <span className='formControlRequired'>{'*'}</span>
                      </label>
                      <Controller
                        name='contact_category_id'
                        control={control}
                        defaultValue=''
                        rules={{required: 'この入力は必須です。'}}
                        render={({field: {name, value, ref}}) => (
                          <FormControl>
                            <NativeSelect
                              className={errors.contact_category_id ? 'selectBoxError' : ''}
                              name={name}
                              value={value}
                              inputRef={ref}
                              onChange={onChangeType}
                            >
                              {listContactCategory.map((c, index) => (
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
                        name='contact_category_id'
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
                    {typeContact === 5 &&
                      <>
                        {ExchangeRender}
                        <div className='addProductDiv'>
                          <Icon
                            className='icAdd'
                            onClick={() => addProduct()}
                          >{'add_box'}</Icon>
                          <div className='desc'>
                            <Typography
                              component='p'
                              className='formBlockTitleImage'
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
                      </>
                    }

                    {typeContact !== 5 &&
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <label
                          htmlFor='description'
                          className='formControlLabel'
                        >
                          {'問い合わせ内容 '}
                          <span className='formControlRequired'>{'*'}</span>
                        </label>
                        <Controller
                          name='description'
                          control={control}
                          defaultValue=''
                          rules={{required: 'この入力は必須です。'}}
                          render={({field: {name, value, ref, onChange}}) => (
                            <TextField
                              id='description'
                              variant='outlined'
                              error={Boolean(errors.description)}
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
                          name='description'
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
              {typeContact !== 5 && <div className='formBlock'>
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
                <Grid
                  container={true}
                  spacing={3}
                >
                  <Grid
                    xs={12}
                    sm={6}
                    md={6}
                    item={true}
                  >
                    <Link
                      href='/'
                    >
                      <Button
                        variant='pill'
                        customSize='extraLarge'
                        className={classes.btnPrev}
                      >
                        {'前のページへ戻る'}
                      </Button>
                    </Link>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={6}
                    md={6}
                    item={true}
                  >
                    <Button
                      variant='pill'
                      customColor='red'
                      customSize='extraLarge'
                      type='submit'
                      disabled={loading}
                      className={classes.btnSubmit}
                    >
                      {'フォーム内容確認'}
                      {loading ? (
                        <CircularProgress
                          size={24}
                        />
                      ) : null}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </StyledForm>}
          </Box>
        </ContentBlock>
      </div>
      <Footer/>
      {open &&
        <ThanksPopup
          open={open}
          requestNo={requestNo}
          handleClose={handleClose}
          style={{width: '80%'}}
        />
      }
    </div>
  );
}
