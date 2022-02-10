// ---------------------------------------------------------------------------------------------------------------------
// raw text
// ---------------------------------------------------------------------------------------------------------------------

var rawText = `
 xxx
x   x
x    
x xxx
x   x
 xxx

 xxx
x   x
x   x
x   x
x   x
 xxx
 
xxxxx
  x
  x
  x
  x
  x

 xxx
x   x
x
x
x   x
 xxx
 
x   x
x   x
xxxxx
x   x
x   x

  x
 x x
x   x
xxxxx
x   x
x   x
`

var rawUrl = 'https://davestewart.co.uk/projects/personal/wordle-solver'

// ---------------------------------------------------------------------------------------------------------------------
// encoding
// ---------------------------------------------------------------------------------------------------------------------

// helpers
var encodeText = text => text
  .replace(/^\n+|\n+$/g, '')
  .replace(/ +/g, c => c.length)
  .replace(/\n/g, Math.ceil(Math.random() * 4) + 5)
  .replace(/x/g, c => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
  .toUpperCase() //?

var encodeUrl = url => url.toUpperCase().split('').reverse().join('')
  .replace(/:/g, '0')
  .replace(/\//g, '1')
  .replace(/\./g, '2')
  .replace(/-/g, '3') //?

// generate encoded text
var staticText = encodeText(rawText) //?
var staticUrl = encodeUrl(rawUrl) //?

// ---------------------------------------------------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------------------------------------------------

// text
var encodedText = '1JOJ8X3Y8X48Y1SKD8T3J81YEQ881DMS8A3N8G3X8Y3U8T3E81UVR818DWUPF82M82Q82E82B82X881UOR8D3V8N8I8J3Q81WZT818S3H8F3I8MEUYV8H3D8O3G882E81T1Q8I3M8SELRG8M3R8E3Q'
var encodedUrl = 'REVLOS3ELDROW1LANOSREP1STCEJORP1KU2OC2TRAWETSEVAD110SPTTH'

// graphics
var chars = ['⬛', '🟨', '🟩']
var space = String.fromCharCode(32)

// decoding
var decodeText = text => text
  .replace(/[1-5]/g, m => space.repeat(parseInt(m)))
  .replace(/[6-9]/g, m => '\n')

var decodeUrl = url => url.toLowerCase()
  .split('')
  .reverse()
  .map(c => /[0123]/.test(c) ? ':/.-'.charAt(parseInt(c)) : c)
  .join('')

// rendering
var index = Math.random() * 5
var toggle = c => c === space ? chars[0] : index++ % 7 > 1 ? chars[1] : chars[2]
var random = c => c === space ? chars[0] : Math.random() < .7 ? chars[1] : chars[2]
var yellow = c => c === space ? chars[0] : chars[1]
var greeen = c => c === space ? chars[0] : chars[2]

// decode
var text = decodeText(encodedText)
var url = decodeUrl(encodedUrl)

// process
var wordle = text
  .split('\n')
  .map(line => line.padEnd(5).split('').map(toggle).join(''))
  .join('\n')

// output
console.log(`${wordle}\n${url}`)
