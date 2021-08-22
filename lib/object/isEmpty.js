const {hasOwnProperty} = Object.prototype;

/**
 * check object null
 *
 * @param {Object }object
 * @returns {boolean}
 */
const isEmpty = (object) => {
  for (const key in object) {
    if (hasOwnProperty.call(object, key)) {
      return false;
    }
  }

  return true;
};

export default isEmpty;
