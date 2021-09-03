import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {NativeSelect} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bordered: {
    '& .selectQuantity': {
      '&::before, &::after': {
        display: 'none',
      },
      '& select': {
        border: `1px solid ${theme.selectBox.borderColor}`,
        borderRadius: '4px !important',
        padding: '10px 32px 9px 18px',
        color: theme.selectBox.textColor,
        background: 'url("/img/icons/dropdown-icon.png") right 10px center no-repeat',
        [theme.breakpoints.down('xs')]: {
          padding: '6px 32px 5px 13px',
        },
      },
    },
    '& .MuiNativeSelect-icon': {
      display: 'none',
    },
  },
}));

const quantityOption = (quantity) => {
  const arrQuantity = [];
  for (let i = 1; i <= quantity; i++) {
    arrQuantity.push({name: i, value: i});
  }
  return arrQuantity;
};

const QuantityBox = ({name, maximumQuantity, defaultValue, handleChange, disabled}) => {
  const classes = useStyles();

  return (
    <div className={classes.bordered}>
      <NativeSelect
        className={'selectQuantity'}
        name={name}
        inputProps={{'aria-label': name}}
        defaultValue={defaultValue}
        onChange={handleChange}
        disabled={disabled}
      >
        {quantityOption(maximumQuantity).map((quantity, index) => (
          <option
            key={String(index)}
            value={quantity.value}
          >{quantity.name}</option>
        ))}
      </NativeSelect>
    </div>

  );
};

QuantityBox.propTypes = {
  name: PropTypes.string.isRequired,
  maximumQuantity: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
};

QuantityBox.defaultProps = {
  disabled: false,
};

export default QuantityBox;
