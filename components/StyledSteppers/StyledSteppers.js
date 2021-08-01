import PropTypes from 'prop-types';
import {Step, StepLabel, Stepper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginBottom: '3rem',
    gap: '0.5rem',
    '& .MuiStepConnector-root': {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5rem',
      gap: 5,
    },
  },
  stepItem: {
    width: '100%',
    textAlign: 'center',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textIndent: '1.5rem',
    color: theme.steppers.textColor,
    position: 'relative',
    backgroundColor: theme.steppers.bgColor,
    [theme.breakpoints.down('xs')]: {
      height: '48px',
      textIndent: '1rem',
    },
    '& .MuiStepLabel-iconContainer': {
      display: 'none',
    },
    '& .MuiTypography-root': {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
      },
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      zIndex: 2,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '2.5rem 0 2.5rem 2rem',
      top: 0,
      right: '-2rem',
      borderColor: `transparent transparent transparent ${theme.steppers.bgColor}`,
      [theme.breakpoints.down('xs')]: {
        borderWidth: '24px 0 24px 20px',
        right: -20,
      },
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      zIndex: 1,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '40px 0 40px 2rem',
      top: 0,
      right: '-2.5rem',
      borderColor: 'transparent transparent transparent #fff',
      [theme.breakpoints.down('xs')]: {
        borderWidth: '24px 0 24px 20px',
        right: -25,
      },
    },
    '&:last-child': {
      borderRadius: '0 8px 8px 0',
      '&:before': {
        display: 'none',
      },
    },
    '&:first-child': {
      borderRadius: '8px 0 0 8px',
    },
  },
  stepItemActive: {
    backgroundColor: theme.steppers.activeBgColor,
    '& .MuiTypography-root': {
      fontWeight: 700,
      color: theme.steppers.activeTextColor,
    },
    '&::before': {
      borderColor: `transparent transparent transparent ${theme.steppers.activeBgColor}`,
    },
  },
}));

const StyledSteppers = ({activeStep, steps}) => {
  const classes = useStyles();

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
    >
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        const stemItemClass = clsx(classes.stepItem, activeStep >= index ? classes.stepItemActive : null);
        return (
          <Step
            className={stemItemClass}
            key={label}
            {...stepProps}
          >
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

StyledSteppers.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.any.isRequired,
};

export default StyledSteppers;
