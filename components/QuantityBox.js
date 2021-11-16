import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {ConnectForm} from '.';

import {isInteger} from '~/lib/number';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .errorMessage': {
      color: '#ba2636',
      display: 'flex',
      marginTop: '5px',
      alignItems: 'center',
      marginBottom: '0',
    },
  },
  numberInput: {
    display: 'flex',
    '& button': {
      outline: 'none',
      backgroundColor: theme.palette.yellow.main,
      border: 'none',
      width: '1.25rem',
      height: '1.25rem',
      cursor: 'pointer',
      borderRadius: '50%',
      color: 'white',
      fontWeight: '700',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        width: '1.25rem',
        height: '1.25rem',
      },
    },
  },
  quantity: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent !important',
    },
    '& input': {
      fontWeight: 'bold',
      textAlign: 'center',
      height: '1.5rem !important',
      width: '3rem',
      padding: '0 !important',
      backgroundColor: 'transparent !important',
    },
    '& input::-webkit-inner-spin-button, input::-webkit-outer-spin-button': {
      appearance: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      height: '1.5rem',
      width: '3rem',
      padding: '0',
    },
  },
}));

const QuantityBox = ({name, maximum_quantity, quantity, defaultValue, handleChange, disabled}) => {
  const classes = useStyles();

  const maximumQuantity = maximum_quantity > quantity ? quantity : (maximum_quantity || quantity);

  const value = Number(defaultValue) || 0;

  return (
    <ConnectForm>
      {/* eslint-disable-next-line no-unused-vars */}
      {({control}) => {
        return (
          <div className={classes.root}>
            <div className={classes.numberInput}>
              <button
                type={'button'}
                onClick={() => handleChange(value - 1 < 1 ? 1 : value - 1)}
              >
                <RemoveIcon/>
              </button>
              <TextField
                variant='outlined'
                name={name}
                className={classes.quantity}
                value={defaultValue}
                disabled={disabled}
                onChange={(e) => {
                  const newQuantity = e.target.value;
                  if (isInteger(newQuantity) && (!newQuantity || newQuantity > 0)) {
                    handleChange(newQuantity ? Number(newQuantity) : '');
                  }
                }}
              />
              <button
                type={'button'}
                onClick={() => handleChange(value + 1 > maximumQuantity ? maximumQuantity : value + 1)}
              >
                <AddIcon/>
              </button>
            </div>
            {defaultValue > maximumQuantity && maximum_quantity > 0 &&
              <div className={'errorMessage'}>{`この商品は${maximum_quantity}個以上まとめて注文できません。`}</div>
            }
            {defaultValue > maximumQuantity && !maximum_quantity &&
              <div className={'errorMessage'}>{`この商品は${quantity}個以上まとめて注文できません。`}</div>
            }
          </div>
        );
      }}
    </ConnectForm>
  );
};

QuantityBox.propTypes = {
  name: PropTypes.string.isRequired,
  maximum_quantity: PropTypes.number,
  quantity: PropTypes.number,
  defaultValue: PropTypes.number,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
};

QuantityBox.defaultProps = {
  disabled: false,
};

export default QuantityBox;
