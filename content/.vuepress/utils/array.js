import { getValue } from './object.js'

export function sortBy (prop, order = 'asc', numeric = false) {
  return function (a, b) {
    // values
    a = getValue(a, prop)
    b = getValue(b, prop)

    // order
    if (order === 'desc') {
      const t = a
      a = b
      b = t
    }

    // number
    if (numeric) {
      return a - b
    }

    // undefined items go to the end of the list
    if (typeof a === 'undefined') {
      return 1
    }
    if (typeof b === 'undefined') {
      return -1
    }

    // sort
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  }
}


export function offset (value, dir, max, loop = false) {
  const min = 0
  max = Array.isArray(max)
    ? max.length - 1
    : max - 1
  value += dir
  if (value < min) {
    return loop ? max : min
  }
  if (value > max) {
    return loop ? min : max
  }
  return value
}
