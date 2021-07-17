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
  },
  stepItem: {
    width: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    padding: '1.375rem 0',
    color: theme.steppers.textColor,
    border: `2px solid ${theme.steppers.borderColor}`,
    position: 'relative',
    '& .MuiStepLabel-iconContainer': {
      display: 'none',
    },
    '& .MuiTypography-root': {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
    },
    '&::before': {
      position: 'absolute',
      content: '',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '50px 0 50px 50px',
      borderColor: 'transparent transparent transparent #007bff',
    },
  },
  stepItemActive: {
    backgroundColor: theme.steppers.activeBgColor,
    border: 'none',
    '& .MuiTypography-root': {
      fontWeight: 700,
      color: theme.steppers.activeTextColor,
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
        const stemItemClass = clsx(classes.stepItem, index === activeStep ? classes.stepItemActive : null);
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
  steps: PropTypes.array.isRequired,
};

export default StyledSteppers;
