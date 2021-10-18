import {makeStyles} from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Rating} from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';

import {ConnectForm} from '..';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiRating-decimal': {
      marginRight: '0.5rem',
    },
    '& .MuiRating-root': {
      color: theme.palette.yellow.main,
    },
    [theme.breakpoints.down('xs')]: {
      '& .MuiSvgIcon-root': {
        height: '1.25rem',
        width: '1.25rem',
      },
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
    <div className={classes.root}>
      <ConnectForm>
        {({control, getValues}) => {
          return (
            <>
              {readOnly ? (
                <>
                  <Rating
                    name='read-only'
                    value={rating}
                    precision={0.5}
                    readOnly={true}
                    emptyIcon={<StarBorderIcon/>}
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
                        emptyIcon={<StarBorderIcon/>}
                      />
                    )}
                  />
                </div>
              )}
            </>
          );
        }}
      </ConnectForm>
    </div>
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
