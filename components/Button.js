import React from 'react';
import PropTypes from 'prop-types';
import {Button as MuiButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
    boxShadow: 'none',
    padding: theme.spacing(1, 3),
  },
  red: {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.common.white,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.red.dark,
      color: theme.palette.common.white,
    },

    '&.Mui-disabled': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.red.light,
    },
  },
  yellow: {
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.yellow.dark,
      color: theme.palette.common.white,
    },
  },
  green: {
    backgroundColor: theme.palette.green.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
      color: theme.palette.common.white,
    },
  },
  white: {
    backgroundColor: theme.palette.white.main,
    color: `${theme.palette.black3.main}`,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
    },
  },
  whiteRed: {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.red.main,
    '&:hover': {
      backgroundColor: theme.palette.white.main,
      color: theme.palette.red.main,
    },
  },
  black: {
    backgroundColor: theme.palette.solidBlack.default,
    color: theme.palette.white.main,
    '&:hover': {
      backgroundColor: theme.palette.solidBlack.default,
      color: theme.palette.white.main,
    },
  },
  pill: {
    borderRadius: 45,
  },
  extraLarge: {
    fontSize: '1.25rem',
    lineHeight: '2.25rem',
    fontWeight: 'bold',
    padding: '0.875rem 2.3125rem',
    minWidth: '22.75rem',

    '& .material-icons': {
      fontSize: '2.25rem',
    },

    '& .MuiCircularProgress-root': {
      marginLeft: '1rem',
      color: theme.palette.common.white,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      padding: '0.375rem 1.25rem',
      minWidth: '18rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0.5rem 2.75rem',
    },
  },
  medium: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'bold',
    padding: '0.688rem 1.25rem',
    minWidth: '16.688rem',
    minHeight: '3rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.813rem',
      lineHeight: '1.219rem',
      padding: '0.438rem 1.25rem',
      minWidth: '21.75rem',
      minHeight: '2.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '10.188rem',
    },
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'bold',
    padding: '0.532rem 1.25rem',
    minWidth: '10.625rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.813rem',
      lineHeight: '1.219rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.813rem',
      lineHeight: '1.188rem',
      minWidth: '10.188rem',
    },
  },
  tiny: {
    fontSize: '0.875rem',
    lineHeight: '1.313rem',
    fontWeight: 'bold',
    padding: '0.532rem 0.5rem',
    minWidth: '5rem',
  },
  fullwidth: {
    width: '100%',
  },
  halfwidth: {
    width: '48%',
  },
  bdRed: {
    border: '1px solid #BA2636',
  },
  bdGray: {
    border: '1px solid #DBDBDB',
  },
  bdBlack: {
    border: `1px solid ${theme.palette.black3.main}`,
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
  const {children, variant, customColor, customSize, customBorder, customWidth, ...rest} = props;
  const className = clsx(classes.root, classes[variant], classes[customColor], classes[customSize], classes[customBorder], classes[customWidth]);

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
  customColor: PropTypes.oneOf(['red', 'yellow', 'green', 'white', 'whiteRed', 'black', 'default']),
  customSize: PropTypes.oneOf(['extraLarge', 'medium', 'small', 'tiny']),
  customBorder: PropTypes.oneOf(['bdRed', 'bdGray', 'bdBlack']),
  customWidth: PropTypes.oneOf(['fullwidth', 'halfwidth']),
  children: PropTypes.any.isRequired,
};

export default Button;
