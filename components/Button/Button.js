import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

import theme from '../../theme';

const useStyles = makeStyles(() => ({
  root: {
    textTransform: 'none',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    padding: theme.spacing(1, 3),
  },
  red: {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.common.white,
    },
  },
  pill: {
    borderRadius: 45,
  },
  extraLarge: {
    fontSize: '1.25rem',
    lineHeight: '1.125rem',
    fontWeight: 'bold',
    padding: '0.875rem 2.3125rem',

    '& .material-icons': {
      fontSize: '2.25rem',
    },
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const {custom_color, pill, variant, custom_size, children} = props;

  const className = clsx(classes.root, classes[custom_color], {
    [classes.pill]: pill,
  }, classes[custom_size]);

  return (
    <MuiButton
      variant={variant}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['contained']),
  pill: PropTypes.bool,
  custom_size: PropTypes.string,
  children: PropTypes.any,
  custom_color: PropTypes.oneOf(['red', 'yellow', 'default']),
};

Button.defaultProps = {
  variant: 'contained',
  custom_color: 'red',
  size: 'medium',
};

export default Button;
