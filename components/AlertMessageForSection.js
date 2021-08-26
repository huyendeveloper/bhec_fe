import PropTypes from 'prop-types';
import {Snackbar} from '@material-ui/core';

import {Alert} from '~/components';

const AlertMessageForSection = ({alert, handleCloseAlert}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseAlert();
  };
  return alert ? (
    <Snackbar
      open={true}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    >
      <Alert severity={alert.type}>{alert.message}</Alert>
    </Snackbar>) : null;
};

AlertMessageForSection.propTypes = {
  alert: PropTypes.object,
  handleCloseAlert: PropTypes.func,
};
export default AlertMessageForSection;
