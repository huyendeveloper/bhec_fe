import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {NativeSelect} from '@material-ui/core';

import {ConnectForm} from '.';

const useStyles = makeStyles((theme) => ({
  bordered: {
    '& .selectQuantity': {
      width: '4.813rem',
      height: '3rem !important',
      [theme.breakpoints.down('sm')]: {
        height: '2rem !important',
      },
      '&::before, &::after': {
        display: 'none',
      },
      '& select': {
        border: `1px solid ${theme.styledForm.formControl.borderColor}`,
        borderRadius: '4px !important',
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

const QuantityBox = ({name, maximum_quantity, quantity, defaultValue, handleChange, disabled, width, height}) => {
  const classes = useStyles();

  const maximumQuantity = maximum_quantity > quantity ? quantity : maximum_quantity || 10;

  return (
    <ConnectForm>
      {/* eslint-disable-next-line no-unused-vars */}
      {({control}) => {
        return (
          <div className={classes.bordered}>
            <NativeSelect
              className={'selectQuantity'}
              name={name}
              inputProps={{'aria-label': name}}
              defaultValue={defaultValue}
              onChange={(e) => {
                handleChange(e);
                if (Number(e.target.value) === 0) {
                  e.target.value = defaultValue;
                }
              }}
              disabled={disabled}
              style={{width, height}}
            >
              {quantityOption(maximumQuantity).map((item, index) => (
                <option
                  key={String(index)}
                  value={item.value}
                >{item.name}</option>
              ))}
            </NativeSelect>
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
  width: PropTypes.string,
  height: PropTypes.string,
};

QuantityBox.defaultProps = {
  disabled: false,
};

export default QuantityBox;
