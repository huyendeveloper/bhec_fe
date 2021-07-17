import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.yellow.light}`,
    borderRadius: 4,
    padding: '3.375rem 6rem',
    textAlign: 'center',
  },
}));

const AlertBox = ({children}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

AlertBox.propTypes = {
  children: PropTypes.element,
};

export default AlertBox;

