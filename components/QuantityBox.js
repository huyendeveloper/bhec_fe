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
        border: `1px solid ${theme.styledForm.formControl.borderColor}`,
        borderRadius: '4px !important',
        color: theme.palette.gray.dark,
        fontSize: '0.875rem',
        background: 'url("/img/icons/dropdown-icon.png") right 1rem center no-repeat',
        backgroundColor: theme.palette.white.main,
        height: '-webkit-fill-available',
        paddingLeft: '1rem',
        [theme.breakpoints.down('xs')]: {
          padding: '6px 32px 5px 13px',
          fontSize: '0.813rem',
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

const QuantityBox = ({name, maximumQuantity, defaultValue, handleChange, disabled, width, height}) => {
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
        style={{width, height}}
      >
        <option
          value={0}
        >{'選択する'}</option>
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
  width: PropTypes.string,
  height: PropTypes.string,
};

QuantityBox.defaultProps = {
  disabled: false,
  width: '77px',
  height: '48px',
};

export default QuantityBox;
