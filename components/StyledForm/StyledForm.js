import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& fieldset': {
      width: 'auto !important',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.875rem',
      transform: 'translate(1rem, 1.125rem) scale(1)',
      transition: 'all 0.35s ease-in-out',
      '&.Mui-focused, &.MuiFormLabel-filled': {
        opacity: 0,
      },
    },
    '& .MuiInput-formControl': {
      marginTop: 0,
    },
    '& .MuiInput-underline': {
      border: `1px solid ${theme.styledForm.formControl.borderColor}`,
      height: '3rem',
      borderRadius: '4px',
      '&:hover': {
        borderColor: theme.styledForm.formControl.hoveredBorderColor,
      },
      '&:before, &:after': {
        display: 'none',
      },
      '&.Mui-focused': {
        border: `2px solid ${theme.styledForm.formControl.focusedBorderColor}`,
      },
      '&.Mui-error': {
        borderColor: theme.styledForm.formControl.errorTextColor,
      },
    },
    '& .MuiInputBase-input': {
      padding: '1rem',
      fontSize: '0.875rem',
    },
    '& .inputErrorText': {
      marginBottom: 0,
      marginTop: '5px',
      color: theme.palette.red.main,
    },
    '& .formBlock': {
      marginBottom: '3rem',
    },
    '& .formBlockHeader': {
      marginBottom: '2.25rem',
    },
    '& .formBlockTitle': {
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: '1.5rem',
      marginBottom: '0.5rem',
    },
    '& .formBlockDesc': {
      fontSize: '0.875rem',
    },
    '& .formControlRequired': {
      color: theme.palette.red.light,
    },
    '& .formControlLabel': {
      display: 'inline-block',
      marginBottom: '5px',
    },
  },
}));

const StyleForm = (props) => {
  const classes = useStyles();
  return (
    <form
      {...props}
      className={classes.root}
    >
      {props.children}
    </form>
  );
};

StyleForm.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StyleForm;
