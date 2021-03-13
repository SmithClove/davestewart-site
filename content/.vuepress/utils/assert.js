/**
 * Tests whether a passed value is an Object or Array
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is an Object or Array
 */
function isObject (value) {
  return !!value && typeof value === 'object'
}

/**
 * Tests whether a passed value is an Object
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is a true Object
 */
function isPlainObject (value) {
  return isObject(value) && !Array.isArray(value)
}

function isEmpty (value) {
  if (typeof value === 'number' && value === 0) {
    return false
  }
  if (!value) {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  return false
}

module.exports = {
  isObject,
  isPlainObject,
  isEmpty,
}
