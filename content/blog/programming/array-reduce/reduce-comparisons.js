function getColorsMap (svg) {
  const matches = svg.match(/ fill="(.+?)"/g)
  if (matches) {
    const colors = matches
      .map(match => match.match(/"(.+)"/, (match, matches) => matches[0].toLowerCase()))
      .filter(color => color !== 'none')
    return uniq(colors)
  }
  return []
}

function getColorsReduce (svg) {
  const matches = svg.match(/ fill="(.+?)"/g)
  if (matches) {
    return matches.reduce((colors, attr) => {
      const color = attr.match(/"(.+?)"/)[1].toLowerCase()
      if (color !== 'none' && colors.indexOf(color) === -1) {
        colors.push(color)
      }
      return colors
    }, [])
  }
  return []
}


function pickFor (input, keys) {
  const output = {}
  for (let i = 0; i < keys.length; i++) {
    output[keys[i]] = input[keys[i]]
  }
  return output
}

function pickForOf (input, keys) {
  const output = {}
  for (const key of keys) {
    output[key] = input[key]
  }
  return output
}

function pickForEach (input, keys) {
  const output = {}
  keys.forEach(key => {
    output[key] = input[key]
  })
  return output
}

function pickReduce (input, keys) {
  return keys.reduce((output, key) => {
    output[key] = input[key]
    return output
  }, {})
}

function pickWhile (input, keys) {
  const output = {}
  let i = 0
  while (i < keys.length) {
    output[keys[i]] = input[keys[i]]
    i++
  }
  return output
}

function pickWhileReverse (input, keys) {
  const output = {}
  let i = keys.length
  while (--i >= 0) {
    output[keys[i]] = input[keys[i]]
  }
  return output
}

const input = { a: 1, b: 2, c: 3, d: 4, e: 5 }

const result = pickWhileReverse(input, ['a', 'c', 'e'])
console.log(result)


pickFor(input, ['a', 'c', 'e'])
pickForOf(input, ['a', 'c', 'e'])
pickForEach(input, ['a', 'c', 'e'])
pickReduce(input, ['a', 'c', 'e'])
pickWhile(input, ['a', 'c', 'e'])
pickWhileReverse(input, ['a', 'c', 'e'])
