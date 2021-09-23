import {ErrorMessage} from '@hookform/error-message';
import PropTypes from 'prop-types';
import React from 'react';

const ErrorMessageWidget = ({name, errors}) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({messages}) => {
        return messages ? Object.entries(messages).map(([type, message]) => (
          <p
            className='inputErrorText'
            key={type}
          >
            {message}
          </p>
        )) : null;
      }}
    />
  );
};

ErrorMessageWidget.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.object,
};

export default ErrorMessageWidget;