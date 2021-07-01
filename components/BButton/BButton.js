import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
}));

const BButton = ({variant, pill, color, children}) => {
  const classes = useStyles();

  const className = clsx(classes.root, classes[color], {
    [classes.pill]: pill,
  });

  return (
    <Button
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
};

BButton.propTypes = {
  variant: PropTypes.oneOf(['contained']),
  pill: PropTypes.bool,
  children: PropTypes.element,
  color: PropTypes.oneOf(['red', 'yellow', 'default']),
};

BButton.defaultProps = {
  variant: 'contained',
  color: 'red',
};

export default BButton;
