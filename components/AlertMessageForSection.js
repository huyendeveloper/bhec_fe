import PropTypes from 'prop-types';
import {Snackbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Alert} from '~/components';

const useStyles = makeStyles(() => ({
  root: {
    top: '1rem',
  },
}));

const AlertMessageForSection = ({alert, handleCloseAlert}) => {
  const styles = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseAlert();
  };
  return alert ? (
    <Snackbar
      open={true}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      className={styles.root}
    >
      <Alert severity={alert.type}>{alert.message}</Alert>
    </Snackbar>) : null;
};

AlertMessageForSection.propTypes = {
  alert: PropTypes.object,
  handleCloseAlert: PropTypes.func,
};
export default AlertMessageForSection;
