import {ErrorMessage} from '@hookform/error-message';
import {FormControlLabel, makeStyles, Radio, RadioGroup, useMediaQuery, useTheme} from '@material-ui/core';
import produce from 'immer';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {BlockForm, Button, ConnectForm, DeliveryForm} from '~/components';
import {DialogWidget} from '~/components/Widgets';
import {rules} from '~/lib/validator';
import {CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2.5rem 0 1rem',
  },
  radioGroup: {
    '& .labelRadioBtn': {
      height: '1.5rem',
      marginBottom: '1.5rem',
    },
    '& .labelRadioBtn:last-child': {
      marginBottom: '0',
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      lineHeight: '1.313rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8125rem',
      },
    },
  },

}));

const FormShipping = ({isReadonly}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const [openAddAddress, setOpenAddAddress] = React.useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [loaded, setLoaded] = useState(false);
  const setLoading = useSetRecoilState(loadingState);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [order, setOrder] = useRecoilState(orderState);

  const setDefaultAddressShipping = () => {
    if (user?.isAuthenticated) {
      if (user?.addresses) {
        const addressDefault = user.addresses.find((item) => item.is_default === 1);
        if (addressDefault?.id) {
          setOrder({...order, addressShipping: String(addressDefault?.id)});
          return String(addressDefault?.id);
        }
      }
      setOrder({...order, addressShipping: null});
      return '';
    }
    return order?.address?.id;
  };

  const handleSubmitDeliveryForm = async (address) => {
    setLoading(true);
    if (user?.isAuthenticated) {
      const response = await CommonService.addAddress(address);
      if (response) {
        await fetchAddresses();
      } else {
        // eslint-disable-next-line no-warning-comments
        // TODO: handle error
      }
    } else {
      setUser(produce((draft) => {
        draft.addresses = draft.addresses ?? [];
        draft.addresses.push(address);
      }));
    }
    setLoading(false);
  };

  const handleCloseDelivery = () => {
    setOpenAddAddress(false);
  };

  const fetchAddresses = async () => {
    const addresses = await CommonService.getAddresses();
    if (addresses?.length > 0) {
      setUser(produce((draft) => {
        draft.addresses = addresses;
      }));
    }
    setLoaded(true);
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      fetchAddresses().finally(() => {
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeAddressShipping = (e) => {
    if (user?.isAuthenticated) {
      setOrder({...order, addressShipping: e.target.value});
    } else {
      const address = user?.addresses?.find((x) => x.id === e.target.value);
      setOrder({...order, address});
    }
  };

  return (
    <>
      <ConnectForm>
        {({control, formState: {errors}}) => {
          return (
            <BlockForm
              themeStyle={'gray'}
              title={'?????????????????????'}
              id={'addressShipping'}
            >
              {loaded &&
                <>
                  <Controller
                    name={'addressShipping'}
                    control={control}
                    defaultValue={setDefaultAddressShipping}
                    rules={{
                      required: rules.required,
                    }}
                    render={({field: {onChange, value}}) => (
                      <RadioGroup
                        value={value}
                        onChange={(e) => {
                          handleChangeAddressShipping(e);
                          onChange(e);
                        }}
                        className={classes.radioGroup}
                        style={{marginBottom: '2.563rem'}}
                      >
                        {loaded && user.addresses?.map((item, index) => (
                          <FormControlLabel
                            key={`address-${item?.id}`}
                            value={`${item?.id}`}
                            control={<Radio/>}
                            label={`??????${index + 1}  ${item.name}???${item.zipcode}???${item?.province?.name ?? ''}${item.city}${item.address}${item.apartment_number || ''}`}
                            className={'labelRadioBtn'}
                            disabled={isReadonly}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />

                  <ErrorMessage
                    errors={errors}
                    name='addressShipping'
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
                </>
              }

              <div className={classes.button}>
                <Button
                  variant='pill'
                  customSize='extraLarge'
                  customColor='whiteRed'
                  customBorder='bdRed'
                  onClick={() => setOpenAddAddress(true)}
                  disabled={isReadonly}
                  style={isMobile ? {width: '14rem', padding: '0'} : {}}
                >
                  {'???????????????????????????'}
                </Button>
              </div>
            </BlockForm>
          );
        }}
      </ConnectForm>

      <DialogWidget
        open={openAddAddress}
        handleClose={() => setOpenAddAddress(false)}
        size={isTablet ? 'sm' : 'md'}
        title={'??????????????????????????????'}
      >
        <DeliveryForm
          onSubmit={handleSubmitDeliveryForm}
          onClose={handleCloseDelivery}
        />
      </DialogWidget>
    </>
  );
};

export default FormShipping;

FormShipping.propTypes = {
  isReadonly: PropTypes.bool,
};

FormShipping.defaultProps = {
  isReadonly: false,
};
