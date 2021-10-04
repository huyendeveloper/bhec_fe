import eaw from 'eastasianwidth';

const isFullWidth = (value) => {
  if (value === '') {
    return true;
  }
  if (value.length > 1) {
    return value.split('').every(isFullWidth);
  }
  return eaw.length(value) > 1;
};

export default isFullWidth;
