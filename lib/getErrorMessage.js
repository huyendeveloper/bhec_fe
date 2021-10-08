import {find} from 'lodash';

import {errorMessage} from '~/constants';

export const getErrorMessage = (errorCode) => {
  const error = find(errorMessage, ['code', errorCode]);

  return error.message;
};
