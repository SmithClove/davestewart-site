import Fs from 'fs'
import Path from 'path'

import { isPlainObject } from './object.js'

export const placeholder = {
  width: 1024,
  height: 576,
}

export function makePlaceholder (path = '') {
  const text = Path.basename(path, Path.extname(path)).replace(/\W+/g, ' ') || ''
  return `http://placehold.it/${placeholder.width}x${placeholder.height}?text=` + text
}

export function getFile (pagePath, imagePath = '') {
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

export function isLocal (source) {
  return !Path.isAbsolute(source) || !source.startsWith('http')
}

/**
 * Ensures any requested source is an object
 * @param input
 */
export function getSource (input) {
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
  if (/\.(png|jpe?g|gif)$/.test(source.src)) {
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
 * @returns {{width: string, aspectRatio: (string|boolean)}}
 */
export function getStyle (source) {
  const { width, height } = source
  return {
    width: '100%',
    aspectRatio: width && height
      ? `${width} / ${height}`
      : false
  }
}
