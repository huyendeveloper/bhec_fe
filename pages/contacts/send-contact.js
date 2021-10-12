/* eslint-disable no-useless-escape */
import 'date-fns';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  Box, FormControl,
  Grid, Icon, NativeSelect,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {ErrorMessage} from '@hookform/error-message';
import {useForm, Controller} from 'react-hook-form';
import {useSession} from 'next-auth/client';
import clsx from 'clsx';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {DefaultLayout} from '~/components/Layouts';
import {ContentBlock, Button, StyledForm, UploadComponent} from '~/components';
import {ContactService} from '~/services';
const Contact = new ContactService();
import {ContactProduct, ContactFormConfirmations} from '~/components/Contact';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: '-0.5rem',
    },
    '& .formBlockHeader': {
      [theme.breakpoints.down('xs')]: {
        margin: '0 1rem',
      },
    },
    '& .imageUploadWrapper': {
      [theme.breakpoints.down('sm')]: {
        gap: '0.5rem',
      },
      [theme.breakpoints.down('xs')]: {
        gap: '0.75rem',
      },
    },
    '& .imageUploadBtn': {
      background: 'transparent',
      border: 'none',
      padding: '0',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '1rem',

      '& textarea': {
        padding: '0',
      },
    },
    '& .formBlockTitle': {
      fontSize: '1rem',
      textAlign: 'center',
      fontWeight: '700',
      marginBottom: '10px',
      [theme.breakpoints.up('xs')]: {
        fontSize: '0.875rem',
        lineHeight: '1.375rem',
      },
    },
    '& .formBlockDesc': {
      fontSize: '1rem',
      textAlign: 'center',
      [theme.breakpoints.up('xs')]: {
        fontSize: '0.875rem',
        lineHeight: '1.375rem',
      },
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
      fontSize: '0.875rem',
    },
    '& .inputEditor': {
      padding: '1rem',
      width: '100%',
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      fontFamily: theme.font.default,
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
    '& .imageUploadItem': {
      width: '80px',
      height: '80px',
      [theme.breakpoints.down('sm')]: {
        width: '66px',
        height: '66px',
        marginTop: '5px',
      },
    },
    '& .addProductDiv': {
      margin: '1rem 0',
      display: 'flex',
      '& .icAdd': {
        width: '2rem',
        height: '2rem',
        fontSize: '2rem',
        marginRight: '0.5rem',
        [theme.breakpoints.down('sm')]: {
          width: '1.75rem',
          height: '1.75rem',
          fontSize: '1.75rem',
        },
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
    width: '11.375rem',
    height: '3rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px 0px 0px 4px',
    fontSize: '1rem',
    background: '#FFFFFF',
    border: `1px solid ${theme.blockContact.borderColor}`,
    boxSizing: 'border-box',
    color: 'black',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '8.625rem',
      height: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '8.625rem',
      height: '2.5rem',
    },
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
    fontSize: '1rem',
    fontWeight: '700',
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
    [theme.breakpoints.down('xs')]: {
      height: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },

  btnSubmit: {
    width: '100%',
    height: '100%',
    lineHeight: '2.25rem',
    fontSize: '1rem',
    fontWeight: '700',
    background: theme.palette.red.main,
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: '45px',
    color: theme.palette.white.main,

    '&:hover': {
      background: theme.palette.red.main,
      color: theme.palette.white.main,
    },
    [theme.breakpoints.down('xs')]: {
      height: '2.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
    },
  },

  divNote: {
    fontSize: '0.8125rem',
    lineHeight: '1.1875rem',
    color: '#8A8A8A',
  },

  block: {
    width: '34.875rem',
    margin: '0 calc((100% - 34.875rem)/2)',
    flexBasis: 'auto',
    marginBottom: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      width: '29.5rem',
      margin: '0 calc((100% - 29.5rem)/2)',
      marginBottom: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
      marginBottom: '0px',
    },
  },
  actionBtns: {
    flexWrap: 'nowrap',
    width: '34.875rem',
    margin: '0 calc((100% - 34.875rem)/2)',
    flexBasis: 'auto',
    marginBottom: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      width: '29.5rem',
      margin: '0 calc((100% - 29.5rem)/2)',
      marginBottom: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      width: '21.4375rem',
      margin: '0 calc((100% - 21.4375rem)/2)',
      marginBottom: '0px',
    },
  },
}));

const products = [
  {id: 1, order_number: '', product_code: '', inquiry: ''},
];

export default function ContactPage() {
  const theme = useTheme();
  const classes = useStyles();
  const [session] = useSession();
  const {control, handleSubmit, setValue, formState: {errors}} = useForm({criteriaMode: 'all'});
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const [productImages, setProductImages] = useState([]);
  const [valueProductImages, setValueProductImages] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isLoggined, setIsLoggined] = useState(false);
  const [listContactCategory, setListContactCategory] = useState([]);
  const [typeContact, setTypeContact] = useState();
  const [listProduct, setListProduct] = useState(products);
  const [tabActive, setTabActive] = useState(1);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const logoWidth = isMobile ? 64 : (isTablet ? 64 : 80);
  const logoHeight = isMobile ? 64 : (isTablet ? 64 : 80);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (session?.accessToken) {
      setIsLoggined(true);
    }
    setValue('contact_category_id', 1, {shouldValidate: true});
    getListContactCategory();
  }, [session]);

  const getListContactCategory = async () => {
    const result = await Contact.getContactCategories();
    if (result) {
      setListContactCategory(result);
    }
  };

  const maxNumber = 3;

  const onProductImagesChange = (imageList) => {
    setProductImages(imageList);
    setValue('images', imageList);
  };

  const onContactProductImagesChange = (imageList, index) => {
    setValueProductImages({
      ...valueProductImages,
      [`productImages${index}`]: imageList,
    });
    setValue(`productImages${index}`, imageList);
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
        logoWidth={logoWidth}
        logoHeight={logoHeight}
      />
    ),
  );

  const scrollToTop = () => {
    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollToTop();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  };

  const onSubmit = async (data) => {
    setFormData(data);
    handleNext();
  };

  const goToTopPage = () => {
    router.push('/');
  };

  return (
    <DefaultLayout title={activeStep === 0 && tabActive === 1 ? 'お問い合わせ' : 'お問い合わせ確認'}>
      <div className={classes.root}>
        <div className='content'>
          <ContentBlock
            title='お問い合わせ内容確認'
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
              <div style={{marginBottom: '1rem'}}>
                <div className={classes.block}>
                  {isLoggined ?
                    <div
                      className='formBlockHeader'
                      style={{marginBottom: '2rem'}}
                    >
                      <Typography
                        component='h3'
                        className='formBlockTitle'
                      >
                        {tabActive === 1 ? '個人のお客様用フォーム' : ''}
                      </Typography>
                      <Typography
                        component='p'
                        className='formBlockDesc'
                      >
                        {tabActive === 1 ? '入力フォームに必要事項をご記入のうえ、【フォーム内容確認】をクリックしてください。' : ''}
                      </Typography>

                      {tabActive === 2 &&
                        <Typography
                          component='p'
                          className='formBlockNote'
                        >
                          <span>{'法人のお客様は'}</span>
                          <a
                            href='mailto:oshinagaki@gmail.com'
                            target='_blank'
                            className='formBlockLink'
                            rel='noreferrer'
                          >
                            {'こちら'}
                          </a>
                          <span>{'から'}</span>
                        </Typography>}
                    </div> :
                    <div
                      className='formBlockHeader'
                      style={{marginBottom: '2rem'}}
                    >
                      {tabActive === 2 &&
                        <Typography
                          component='p'
                          className='formBlockNote'
                        >
                          <span>{'法人のお客様は'}</span>
                          <a
                            href='mailto:oshinagaki@gmail.com'
                            target='_blank'
                            className='formBlockLink'
                            rel='noreferrer'
                          >
                            {'こちら'}
                          </a>
                          <span>{'から'}</span>
                        </Typography>}
                    </div>
                  }
                </div>
              </div>
              {activeStep === 0 && tabActive === 1 ? <StyledForm onSubmit={handleSubmit(onSubmit)}>
                {/* SECOND BLOCK */}
                <div style={{marginBottom: '1rem'}}>
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
                        <div className={classes.block}>
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <div className={classes.block}>
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
                              required: '必須項目です。',
                              pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: '無効なメールアドレスです。',
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
                                maxLength={254}
                                onInput={(e) => {
                                  e.target.value = e.target.value.slice(0, 254);
                                }}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid
                        item={true}
                        xs={12}
                      >
                        <div className={classes.block}>
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
                            rules={{required: '必須項目です。'}}
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
                                >{`${message}`}</p>
                              )) : null;
                            }}
                          />
                        </div>
                      </Grid>
                      {typeContact === 5 &&
                        <div className={classes.block}>
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
                                className={classes.divNote}
                              >
                                {'商品を3つまで追加することができます。'}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      }

                      {typeContact !== 5 &&
                        <Grid
                          item={true}
                          xs={12}
                        >
                          <div className={classes.block}>
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
                              rules={{required: '必須項目です。'}}
                              render={({field: {name, value, ref, onChange}}) => (
                                <TextField
                                  id='description'
                                  variant='outlined'
                                  error={Boolean(errors.description)}
                                  InputLabelProps={{shrink: false}}
                                  name={name}
                                  value={value}
                                  inputRef={ref}
                                  multiline={true}
                                  rows={8}
                                  maxRows={12}
                                  onChange={onChange}
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
                                  >{`${message}`}</p>
                                )) : null;
                              }}
                            />
                          </div>
                        </Grid>}
                    </Grid>
                  </div>
                </div>
                {typeContact !== 5 && <div className='formBlock'>
                  <div className={classes.block}>
                    <div
                      className='formBlockHeader'
                      style={{margin: '0.5rem 0 1rem 0'}}
                    >
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
                      <UploadComponent
                        multiple={false}
                        images={productImages}
                        onChange={onProductImagesChange}
                        allowRemove={false}
                        showImage={false}
                        style={{marginTop: '0.5rem'}}
                        maxNumber={maxNumber}
                        logoWidth={logoWidth}
                        logoHeight={logoHeight}
                      />
                    </div>
                  </div>
                </div>}
                <Box
                  display='flex'
                  gridGap='1rem'
                  justifyContent='center'
                  flexWrap='wrap'
                  className={classes.actionBtns}
                >
                  <Button
                    variant='pill'
                    customSize='extraLarge'
                    className={classes.btnPrev}
                    onClick={() => goToTopPage()}
                  >
                    {'TOPページへ戻る'}
                  </Button>

                  <Button
                    variant='pill'
                    customColor='red'
                    customSize='extraLarge'
                    type='submit'
                    className={classes.btnSubmit}
                  >
                    {'フォーム内容確認'}
                  </Button>
                </Box>
              </StyledForm> : null}
              {tabActive === 1 && activeStep === 1 ? (
                <ContactFormConfirmations
                  data={formData}
                  onNextStep={handleNext}
                  onBackStep={handleBack}
                  listProduct={listProduct}
                  listContactCategory={listContactCategory}
                />
              ) : null}
            </Box>
          </ContentBlock>
        </div>
      </div>
    </DefaultLayout>
  );
}
