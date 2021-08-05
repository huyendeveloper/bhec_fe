import React from 'react';
import PropTypes from 'prop-types';
import {Rating} from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from '@material-ui/core/styles';

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

const RatingWidget = ({readOnly, rating}) => {
  const classes = useStyles();
  const [rate, setRate] = React.useState(rating);

  return (
    <>
      {readOnly ? (
        <>
          <Rating
            className={classes.root}
            name='read-only'
            value={rate}
            precision={0.5}
            readOnly={true}
            emptyIcon={<StarBorderIcon fontSize='inherit'/>}
          />
        </>

      ) : (
        <Rating
          className={classes.rootControl}
          name='simple-controlled'
          value={rate}
          precision={0.5}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
          emptyIcon={<StarBorderIcon fontSize='inherit'/>}
        />
      )}
    </>
  );
};

RatingWidget.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
};

RatingWidget.defaultProps = {
  readOnly: true,
  rating: 0,
};

export default RatingWidget;
