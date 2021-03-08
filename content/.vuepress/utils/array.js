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

export function groupBy (items, property, transformer = value => value) {
  const groups = {}
  return items
    .reduce((output, item) => {
      const prop = transformer(getValue(item, property))
      if (prop) {
        let group = groups[prop]
        if (!group) {
          group = {
            title: prop,
            items: []
          }
          groups[prop] = group
          output.push(group)
        }
        group.items.push(item)
      }
      return output
    }, [])
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
