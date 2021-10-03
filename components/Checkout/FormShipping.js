import {ErrorMessage} from '@hookform/error-message';
import {FormControlLabel, makeStyles, Radio, RadioGroup, useMediaQuery, useTheme} from '@material-ui/core';
import produce from 'immer';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Controller} from 'react-hook-form';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {BlockForm, Button, ConnectForm, DeliveryForm} from '~/components';
import {DialogWidget} from '~/components/Widgets';
import {rules} from '~/lib/validator';
import {CommonService} from '~/services';
import {loadingState} from '~/store/loadingState';
import {orderState} from '~/store/orderState';
import {userState} from '~/store/userState';

const useStyles = makeStyles(() => ({
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
    },
  },

}));

const FormShipping = ({isReadonly}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
  const [openAddAddress, setOpenAddAddress] = React.useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [loaded, setLoaded] = React.useState(false);
  const setLoading = useSetRecoilState(loadingState);
  const order = useRecoilValue(orderState);

  const handleSubmitDeliveryForm = async (address) => {
    setLoading(true);
    if (user?.isAuthenticated) {
      const response = await CommonService.addAddress(address);
      if (response) {
        fetchAddresses();
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
      fetchAddresses();
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConnectForm>
        {({control, formState: {errors}}) => {
          return (
            <BlockForm
              themeStyle={'gray'}
              title={'お届け先の住所'}
            >
              {loaded &&
                <>
                  <Controller
                    name={'addressShipping'}
                    control={control}
                    defaultValue={order?.addressShipping || ''}
                    rules={{
                      required: rules.required,
                    }}
                    render={({field: {onChange, value}}) => (
                      <RadioGroup
                        value={value}
                        onChange={onChange}
                        className={classes.radioGroup}
                        style={{marginBottom: '2.563rem'}}
                      >
                        {loaded && user.addresses?.map((item, index) => (
                          <FormControlLabel
                            key={`address-${item?.id}`}
                            value={`${item?.id}`}
                            control={<Radio/>}
                            label={`住所${index + 1}  ${item.name}、${item.zipcode}、${item?.province?.name ?? ''}${item.city}${item.address}`}
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
                >
                  {'お届け先を登録する'}
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
        title={'新しい住所を追加する'}
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
