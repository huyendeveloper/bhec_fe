import PropTypes from 'prop-types';
import {FormControl, NativeSelect} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({
  bordered: {
    '& .native-select': {
      '&::before, &::after': {
        display: 'none',
      },
      '& select': {
        border: '1px solid #444',
        borderRadius: '4px !important',
        padding: '10px 32px 9px 18px',
        color: '#333',
      },
    },
  },
}));

const SelectBox = ({variant, options}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes[variant]}>
      <NativeSelect
        name='siteLanguage'
        className={'native-select'}
        inputProps={{'aria-label': 'siteLanguage'}}
      >
        {options.length === 0 ? (
          <option value={''}>{'No option'}</option>
        ) : options.map((op) => {
          return (
            <option
              key={op.value}
              value={op.value}
            >{op.name}</option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

SelectBox.propTypes = {
  variant: PropTypes.string.isRequired,
  options: PropTypes.array,
};

SelectBox.defaultProps = {
  variant: 'bordered',
};

export default SelectBox;
