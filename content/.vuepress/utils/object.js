/**
 * Tests whether a passed value is an Object or Array
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is an Object or Array
 */
export function isObject (value) {
  return !!value && typeof value === 'object'
}

/**
 * Tests whether a passed value is an Object
 *
 * @param   {*}       value   The value to be assessed
 * @returns {boolean}         Whether the value is a true Object
 */
export function isPlainObject (value) {
  return isObject(value) && !Array.isArray(value)
}

export function getValue (target, path) {
  const props = path.split('.')
  return props.reduce((target, prop) => {
    return target && target[prop]
  }, target)
}

export function merge (...values) {
  return Object.assign({}, ...values)
}
