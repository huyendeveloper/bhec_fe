import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {FormControlLabel, makeStyles, Radio, RadioGroup} from '@material-ui/core';
import {ErrorMessage} from '@hookform/error-message';

import {useRecoilState} from 'recoil';
import produce from 'immer';

import {BlockForm, Button, ConnectForm} from '~/components';
import {rules} from '~/lib/validator';
import {PaymentPopup} from '~/components/Payment';
import {userState} from '~/store/userState';
import {PaymentService} from '~/services';

const Payment = new PaymentService();

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

const FormCreditCard = ({isReadonly}) => {
  const classes = useStyles();
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  const [user, setUser] = useRecoilState(userState);
  const [loaded, setLoaded] = React.useState(false);

  const handleClosePaymentPopup = () => {
    setOpenPaymentPopup(false);
  };

  const handleSubmitPayment = async (card) => {
    if (user?.isAuthenticated) {
      fetchCards();
    } else {
      setUser(produce((draft) => {
        draft.cards = draft.cards ?? [];
        draft.cards.push(card);
      }));
    }
  };

  const fetchCards = async () => {
    const res = await Payment.getCards();
    if (res.cards?.length > 0) {
      setUser(produce((draft) => {
        draft.cards = res.cards;
      }));
    }
  };

  useEffect(() => {
    if (user?.isAuthenticated) {
      fetchCards();
    }
    setLoaded(true);
  }, []);

  return (
    <>
      <ConnectForm>
        {({control, formState: {errors}}) => {
          return (
            <BlockForm
              themeStyle={'gray'}
              title={'お支払いクレジットカード'}
            >
              <Controller
                name={'creditCard'}
                control={control}
                defaultValue={''}
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
                    {loaded && user.cards?.map((item) => (
                      <FormControlLabel
                        key={`card-${item?.id}`}
                        value={`${item?.id}`}
                        control={<Radio/>}
                        label={`${item.card_type} ${item.holder_name} ${item.req_number}`}
                        className={'labelRadioBtn'}
                        disabled={isReadonly}
                      />
                    ))}
                  </RadioGroup>
                )}
              />

              <ErrorMessage
                errors={errors}
                name='creditCard'
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

              <div className={classes.button}>
                <Button
                  variant='pill'
                  customSize='extraLarge'
                  customColor='whiteRed'
                  customBorder='bdRed'
                  onClick={() => setOpenPaymentPopup(true)}
                  disabled={isReadonly}
                >
                  {'クレジットカードを登録する'}
                </Button>
              </div>
            </BlockForm>

          );
        }}
      </ConnectForm>
      <PaymentPopup
        open={openPaymentPopup}
        onClose={handleClosePaymentPopup}
        style={{width: '80%'}}
        onSubmit={handleSubmitPayment}
      />
    </>
  );
};

export default FormCreditCard;

FormCreditCard.propTypes = {
  isReadonly: PropTypes.bool,
};

FormCreditCard.defaultProps = {
  isReadonly: false,
};
