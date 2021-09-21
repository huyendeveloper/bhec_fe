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
  rootControl: {
  },
}));

const RatingWidget = ({readOnly, rating, nameRating}) => {
  const classes = useStyles();

  return (
    <ConnectForm>
      {({control}) => {
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
              <Controller
                name={nameRating}
                control={control}
                defaultValue={rating}
                render={({field: {name, value, onChange}}) => (
                  <Rating
                    className={classes.rootControl}
                    name={name}
                    value={Number(value)}
                    precision={0.5}
                    onChange={onChange}
                    emptyIcon={<StarBorderIcon fontSize='inherit'/>}
                  />
                )}
              />
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
