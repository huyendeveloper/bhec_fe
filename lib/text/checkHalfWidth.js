import eaw from 'eastasianwidth';

const isHalfWidth = (value) => {
  if (value === '') {
    return true;
  }
  if (value.length > 1) {
    return value.split('').every(isHalfWidth);
  }
  return eaw.length(value) === 1;
};

export default isHalfWidth;
