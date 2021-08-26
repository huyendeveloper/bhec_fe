/**
 * Returns an object excluding the specified key.
 *
 * Use pick() for the opposite way.
 *
 * <code>
 *   omit({ foo: 1, bar: 2, baz: 3}, ["bar", "baz"]);
 *   // { foo: 1 }
 * </code>
 *
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const omit = (object, keys) => {
  let {length} = keys;
  const newObject = {...object};

  while (length--) {
    delete newObject[keys[length]];
  }

  return newObject;
};

export default omit;
