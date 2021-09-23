import React from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import {makeStyles, TextareaAutosize} from '@material-ui/core';
import {useRecoilValue} from 'recoil';

import {BlockForm, ConnectForm} from '~/components';
import {orderState} from '~/store/orderState';

const useStyles = makeStyles((theme) => ({
  notification: {
    border: '1px solid ' + theme.palette.gray.main,
    height: '10rem !important',
    padding: '1rem',
    width: '100% !important',
    borderRadius: '0.25rem',
    [theme.breakpoints.down('md')]: {
      height: '7.5rem !important',
    },
    [theme.breakpoints.down('xs')]: {
      height: '9rem !important',
    },
    '&:focus': {
      outline: '2px solid #3f51b5',
    },
  },
}));

const FormNote = ({isReadonly}) => {
  const classes = useStyles();

  const order = useRecoilValue(orderState);

  return (
    <ConnectForm>
      {({control}) => {
        return (
          <BlockForm
            themeStyle={'gray'}
            title={'特記事項'}
          >
            <Controller
              name='note'
              control={control}
              defaultValue={order?.note || ''}
              render={({field: {name, value, onChange}}) => (
                <TextareaAutosize
                  variant='outlined'
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={classes.notification}
                  disabled={isReadonly}
                />
              )}
            />
          </BlockForm>
        );
      }}
    </ConnectForm>
  );
};

export default FormNote;

FormNote.propTypes = {
  isReadonly: PropTypes.bool,
};

FormNote.defaultProps = {
  isReadonly: false,
};
