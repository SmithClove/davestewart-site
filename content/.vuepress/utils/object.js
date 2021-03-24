const { isEmpty } = require('./assert.js')

function getValue (target, path) {
  const props = path.split('.')
  return props.reduce((target, prop) => {
    return target && target[prop]
  }, target)
}

function merge (...values) {
  return Object.assign({}, ...values)
}

function clean (source) {
  return Object.keys(source).reduce((output, key) => {
    const value = source[key]
    if (!isEmpty(value)) {
      output[key] = value
    }
    return output
  }, {})
}

function clone (value) {
  return JSON.parse(JSON.stringify(value))
}

module.exports = {
  getValue,
  merge,
  clean,
  clone,
}
