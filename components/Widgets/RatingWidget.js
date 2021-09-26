import {ErrorMessage} from '@hookform/error-message';
import {makeStyles} from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Rating} from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';

import {ConnectForm} from '..';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiRating-decimal': {
      marginRight: '0.5rem',

      // width: 28,
    },
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const RatingWidget = ({readOnly, rating, nameRating}) => {
  const classes = useStyles();

  return (
    <ConnectForm>
      {({control, errors, getValues}) => {
        return (
          <>
            {readOnly ? (
              <>
                <Rating
                  className={classes.root}
                  name='read-only'
                  value={rating}
                  precision={0.5}
                  readOnly={true}
                  emptyIcon={<StarBorderIcon fontSize='inherit'/>}
                />
              </>
            ) : (
              <div className={rating}>
                <Controller
                  name={nameRating}
                  control={control}
                  defaultValue={rating}
                  rules={{
                    required: '必須項目です。',
                    validate: {
                      checkLengthPasswrod: () => {
                        const rate = getValues(nameRating);
                        return Number(rate) > 0 || 'レビュー点数を入力してください';
                      },
                    },
                  }}
                  render={({field: {name, value, onChange}}) => (
                    <Rating
                      name={name}
                      value={Number(value)}
                      precision={1}
                      onChange={onChange}
                      emptyIcon={<StarBorderIcon fontSize='inherit'/>}
                    />
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name={nameRating}
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
              </div>
            )}
          </>
        );
      }}
    </ConnectForm>
  );
};

RatingWidget.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  nameRating: PropTypes.string.isRequired,
};

RatingWidget.defaultProps = {
  readOnly: true,
  rating: 0,
  nameRating: 'rate',
};

export default RatingWidget;
