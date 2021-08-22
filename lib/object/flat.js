/**
 * return 1 level object
 *
 * <code>
 *   flat({ foo: 1, bar: {fooBaz: 2, bazFoo:3}});
 *   // { foo: 1, fooBaz: 2, bazFoo:3}
 * </code>
 *
 * @param {Object} object
 * @returns {Object}
 */

const flat = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flat(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
};
export default flat;
