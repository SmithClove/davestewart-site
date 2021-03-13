const Fs = require ('fs')
const Path = require ('path')

const { isImage, isRemote } = require ('../plugins/utils.js')
const { isPlainObject } = require ('./assert.js')

// 16:9
const placeholder = {
  width: 1024,
  height: 576,
}

function makePlaceholder (path = '') {
  const text = Path.basename(path, Path.extname(path)).replace(/\W+/g, ' ') || ''
  return `https://placehold.it/${placeholder.width}x${placeholder.height}?text=` + text
}

function getFile (pagePath, imagePath = '') {
  // variables
  const relPath = Path.join(pagePath, imagePath).replace(/^\//, '')
  const fallback = makePlaceholder(imagePath)

  // bail if no image
  if (!imagePath) {
    return fallback
  }

  // client
  if (globalThis.window) {
    try {
      return require('@/' + relPath)
    }
    catch (err) {
      console.warn(`[client] Could not getFile() "${relPath}"`, err)
    }
  }

  // server
  else {
    const SOURCE_DIR = './content/'
    const absPath = Path.resolve(SOURCE_DIR, relPath)
    if (Fs.existsSync(absPath)) {
      try {
        return require('../../' + relPath)
      }
      catch (err) {
        console.warn(`[server] Could not getFile() "${relPath}"`, err)
      }
    }
  }

  // bail
  return fallback
}

function isLocal (source) {
  return !source.startsWith('http') || !Path.isAbsolute(source)
}

/**
 * Ensures any requested source is an object
 * @param input
 */
function getSource (input) {
  // arrays
  if (Array.isArray(input)) {
    return input.map(getSource)
  }

  // single type
  const source = isPlainObject(input)
    ? input
    : typeof input === 'string'
      ? { src: input }
      : {}

  // source type
  if (isImage(source.path)) {
    source.type = 'image'
  }

  else if (/youtube|youtu\.be|vimeo/.test(source.src)) {
    source.type = 'video'
  }

  // ensure defaults
  if (!source.path) {
    source.path = ''
  }

  // return
  return source
}

/**
 * Get the style of an image
 *
 * @param   {object}  source
 * @returns {object}
 */
function getStyle (source) {
  if (isRemote(source.path)) {
    return {}
  }
  const { width, height } = source
  return {
    width: '100%',
    aspectRatio: width && height
      ? `${width} / ${height}`
      : false
  }
}

module.exports = {
  placeholder,
  makePlaceholder,
  getFile,
  isLocal,
  getSource,
  getStyle,
}
