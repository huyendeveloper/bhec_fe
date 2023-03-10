import {Box, FormControl, Grid, makeStyles, NativeSelect, TextField, useMediaQuery} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useSetRecoilState} from 'recoil';
import clsx from 'clsx';

import {Button, StyledForm} from '~/components';
import {rules} from '~/lib/validator';
import {CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {isFullWidth} from '~/lib/text';
import {ErrorMessageWidget} from '~/components/Widgets';
import {isInteger} from '~/lib/number';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1, 9, 6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1, 0, 5),
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: '#757575',
    },
    '& .MuiInputLabel-formControl': {
      [theme.breakpoints.down('md')]: {
        top: '-0.25rem',
      },
    },
    '& .selectBoxError .MuiInputBase-input': {
      color: '#757575 !important',
    },
  },
  option: {
    color: theme.palette.black.default,
  },
  selectQuantity: {
    [theme.breakpoints.down('sm')]: {
      height: '2.5rem !important',
    },
  },
}));

const DeliveryForm = ({defaultValues, onSubmit, onClose}) => {
  const [prefectures, setPrefectures] = React.useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const setLoading = useSetRecoilState(loadingState);
  const typingTimeoutRef = React.useRef(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm({criteriaMode: 'all', defaultValues});

  const fetchPrefectures = async () => {
    setLoading(true);
    const res = await CommonService.getPrefectures();
    if (res && res[0]?.name) {
      setPrefectures([{
        id: 1,
        name: 'ι½ιεΊη',
      }, ...res]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
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

  const fetchDataByZipcode = async (zipcode) => {
    if (zipcode.length !== 0) {
      const {response} = await CommonService.getPrefectureByZipcode(zipcode);
      if (response?.location) {
        const province = prefectures.find((item) => item.name === response?.location[0].prefecture);
        setValue('province_id', province?.id);
        setValue('city', response?.location[0].city);
      }
    }
  };

  const handleStopTypeZipcode = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      fetchDataByZipcode(e.target.value);
    }, 300);
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
                      {'ζ°ε '}
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
                          label='ζ°ε'
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
                      {'ι΅δΎΏηͺε·οΌεθ§ζ°ε­γ γγ€γγ³οΌ-οΌ γͺγγ§γε₯εγγ γγγοΌ'}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='zipcode'
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: rules.required,
                        pattern: rules.isZipcode,
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='zipcode'
                          label={'ι΅δΎΏηͺε·'}
                          variant='outlined'
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
                      {'ι½ιεΊη '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='province_id'
                      control={control}
                      defaultValue={1}
                      rules={{
                        validate: {
                          matchesPreviousPassword: (value) => {
                            return value > 1 || 'εΏι ι η?γ§γγ';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <FormControl>
                          <NativeSelect
                            className={clsx(errors.province_id ? 'selectBoxError' : '', classes.selectQuantity)}
                            name={name}
                            value={value}
                            inputRef={ref}
                            onChange={onChange}
                            style={value === 1 ? {color: '#757575'} : null}
                          >
                            {prefectures.map((pref) => (
                              <option
                                key={pref.id}
                                value={pref.id}
                                className={classes.option}
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
                      {'εΈεΊηΊζοΌε¨θ§γ§γε₯εγγ γγγ) '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='city'
                      control={control}
                      defaultValue={''}
                      rules={{required: rules.required,
                        validate: {
                          checkFullWidth: (value) => {
                            return isFullWidth(value) || 'ε¨θ§γ§γε₯εγγ γγγ';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='city'
                          label='εΈεΊηΊζ'
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
                      {'ηͺε°οΌε¨θ§γ§γε₯εγγ γγγ) '}
                      <span className='formControlRequired'>{'*'}</span>
                    </label>
                    <Controller
                      name='address'
                      control={control}
                      defaultValue={''}
                      rules={{required: rules.required,
                        validate: {
                          checkFullWidth: (value) => {
                            return isFullWidth(value) || 'ε¨θ§γ§γε₯εγγ γγγ';
                          },
                        },
                      }}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='address'
                          label='ηͺε°'
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
                    <ErrorMessageWidget
                      errors={errors}
                      name='address'
                    />
                  </Grid>
                  {/*END ADDRESS DETAIL*/}
                  {/*ADDRESS DETAIL*/}
                  <Grid
                    item={true}
                    xs={12}
                    md={12}
                  >
                    <label
                      htmlFor='apartment_number'
                      className='formControlLabel'
                    >
                      {'ε»Ίη©εγ»ι¨ε±ηͺε·'}
                    </label>
                    <Controller
                      name='apartment_number'
                      control={control}
                      defaultValue={''}
                      render={({field: {name, value, ref, onChange}}) => (
                        <TextField
                          id='apartment_number'
                          label='ε»Ίη©εγ»ι¨ε±ηͺε·'
                          variant='outlined'
                          InputLabelProps={{shrink: false}}
                          name={name}
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                        />
                      )}
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
                      {'δΌη€Ύε'}
                    </label>
                    <Controller
                      name='company_name'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                        <TextField
                          label={'δΌη€Ύε'}
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
                      {'ι¨η½²ε'}
                    </label>
                    <Controller
                      name='department'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                        <TextField
                          label={'ι¨η½²ε'}
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
                      {'ι»θ©±ηͺε·οΌεθ§ζ°ε­γγγ€γγ³οΌ-οΌ γͺγγ§γε₯εγγ γγγοΌ'}
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
                          label={'ι»θ©±ηͺε·'}
                          error={Boolean(errors.tel)}
                          InputLabelProps={{shrink: false}}
                          name={name}
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
                {'δΏε­γγ'}
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
