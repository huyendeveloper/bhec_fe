import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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

    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      padding: '0.375rem 0.75rem 0.375rem 1.25rem',
    },
  },
}));

const Button = (props) => {
  const classes = useStyles();

  /*
  * ==== WARNING IN CONSOLE ====
  *
  * Warning: React does not recognize the customColor prop on a DOM element.
  * If you intentionally want it to appear in the DOM as a custom attribute,
  * spell it as lowercase customcolor instead. If you accidentally passed it from a parent
  * component, remove it from the DOM element.
  *
  * ==== SOLUTION ===
  *
  * https://stackoverflow.com/a/49358913
  * */
  const {children, variant, customColor, customSize, ...rest} = props;
  const className = clsx(classes.root, classes[variant], classes[customColor], classes[customSize]);

  return (
    <MuiButton
      className={className}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['contained', 'pill']),
  customColor: PropTypes.oneOf(['red', 'yellow', 'default']),
  customSize: PropTypes.oneOf(['extraLarge']),
  children: PropTypes.any.isRequired,
};

export default Button;
