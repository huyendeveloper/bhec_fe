import eaw from 'eastasianwidth';

const removeHalfWidth = (value) => {
  let newValue = '';
  for (var i = 0; i < value.length; i++) {
    if (eaw.length(value[i]) > 1) {
      newValue += value[i];
    }
  }
  return newValue;
};

export default removeHalfWidth;
