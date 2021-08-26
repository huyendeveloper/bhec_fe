/**
 * Returns an object consisting only of the specified key.
 *
 * Use omit() for the opposite way.
 *
 * <code>
 *   pick({ foo: 1, bar: 2, baz: 3}, ["bar", "baz"]);
 *   // { bar: 2, baz: 3 }
 * </code>
 *
 * @param {Object} object
 * @param {Iterator<string>} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  const newObject = {};

  for (const key of keys) {
    newObject[key] = object[key];
  }

  return newObject;
};

export default pick;
