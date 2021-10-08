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
      padding: '0 1rem',
      fontSize: '0.875rem',
      height: '3rem',
    },
    '& .inputErrorText': {
      marginBottom: 0,
      marginTop: '5px',
      color: theme.palette.red.main,
      display: 'flex',
      alignItems: 'center',
      '& .material-icons': {
        fontSize: '1rem',
        marginRight: '5px',
      },
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
    '& .imageUploadWrapper': {
      display: 'flex',
      gap: '1.5rem',
      height: 82,
    },
    '& .imageUploadBtn': {
      width: '5rem',
      height: '5rem',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      padding: 0,
      border: 'none',
    },
    '& .imageUploadItem': {
      position: 'relative',
      cursor: 'pointer',
      padding: 1,
      background: '#e3e3e3',
      borderRadius: 4,
      '& img': {
        borderRadius: 4,
      },
    },
    '& .imageUploadRemove': {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      width: 20,
      height: 20,
      color: '#fff',
      backgroundColor: theme.palette.yellow.main,
      borderRadius: 20,
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      boxShadow: '0 0 3px rgba(0,0,0,.2)',
      '& .material-icons': {
        position: 'relative',
        fontSize: 16,
        top: 2,
      },
    },
    '& .checkboxRequiredError': {
      color: theme.palette.red.light,
      '& .MuiIconButton-label': {
        color: theme.palette.red.light,
      },
    },
    '& .linkLabel': {
      textUnderlineOffset: '2px',
      color: theme.palette.body.textColor,
    },
    '& .selectBoxError': {
      borderColor: `${theme.palette.red.light} !important`,
      '& .MuiInputBase-input': {
        color: theme.palette.red.light,
      },
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
