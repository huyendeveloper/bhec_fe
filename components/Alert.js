import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Alert as MuiAlert, AlertTitle} from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '400px',
  },
  title: {
    marginBottom: '1rem',
    marginTop: '0',

    '& titleOnly': {
      marginBottom: '0',
    },
  },
}));

const Alert = ({children, title, color, severity, ...props}) => {
  const styles = useStyles();
  const colorClass = `color-${color ?? severity ?? 'error'} color-dark`;

  return (
    <MuiAlert
      elevation={1}
      color={color}
      severity={severity}
      {...props}
    >
      {title == null ? null : (
        <AlertTitle
          className={clsx(styles.title, !children?.length && styles.titleOnly)}
          gutterBottom={false}
        >
          {title}
        </AlertTitle>
      )}
      {children?.length && <span className={colorClass}>{children}</span>}
    </MuiAlert>
  );
};

Alert.muiName = MuiAlert.muiName;
Alert.propTypes = {
  color: PropTypes.string,
  severity: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Alert;
