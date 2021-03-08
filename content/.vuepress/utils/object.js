import { isEmpty } from './assert.js'

export function getValue (target, path) {
  const props = path.split('.')
  return props.reduce((target, prop) => {
    return target && target[prop]
  }, target)
}

export function merge (...values) {
  return Object.assign({}, ...values)
}

export function clean (source) {
  return Object.keys(source).reduce((output, key) => {
    const value = source[key]
    if (!isEmpty(value)) {
      output[key] = value
    }
    return output
  }, {})
}

export function clone (value) {
  return JSON.parse(JSON.stringify(value))
}
