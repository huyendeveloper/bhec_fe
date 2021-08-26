/**
 * return object not contain null property
 *
 * <code>
 *   flat({ foo: 1, bar: null);
 *   // { foo: 1}
 * </code>
 *
 * @param {Object} object
 * @returns {Object}
 */
const clean = (obj) => {
  for (const propName in obj) {
    // eslint-disable-next-line no-undefined
    if (!obj[propName] || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

export default clean;
