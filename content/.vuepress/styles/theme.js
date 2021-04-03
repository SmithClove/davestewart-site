// read file
const text = require('!!raw-loader!./_variables.scss').default

function camelize (text) {
  return text.replace(/\W+(\w)/g, (m, c) => c.toUpperCase())
}

// variables
const rx = /^\$([\w\S]+):\s*([^;]+);/mg
const data = {}
let m

// consume text
while((m = rx.exec(text)) !== null) {
  const [_match, name, value] = m
  data[camelize(name)] = value
}

// export
module.exports = data
