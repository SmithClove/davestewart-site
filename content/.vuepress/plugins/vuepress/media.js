const Fs = require('fs')
const Path = require('path')
const traverse = require('traverse')
const getSize = require('image-size')
const YAML = require('yaml')

const { isRemote, isLocal, isImage } = require('../utils.js')
const { isPlainObject } = require('../../utils/assert.js')

class Media {
  constructor (path, size = {}, caption = '', missing = false) {
    this.path = path
    if (size.width && size.height) {
      this.width = size.width
      this.height = size.height
    }
    if (caption) {
      this.caption = caption
    }
    if (missing) {
      this.missing = true
    }
  }

  static captions = {}

  static create (sourceDir, pagePath, relPath) {
    // path
    const absPath = Path.join(sourceDir, pagePath, relPath)
    const absFolder = Path.dirname(absPath)

    // flags
    const remote = isRemote(relPath)
    const exists = Fs.existsSync(absPath)
    const missing = remote
      ? false
      : !exists

    // captions
    const captions = Media.captions
    if (!captions[absFolder]) {
      const srcCaptions = Path.resolve(absFolder, 'captions.yaml')
      if (Fs.existsSync(srcCaptions)) {
        captions[absFolder] = YAML.parse(Fs.readFileSync(srcCaptions).toString())
      }
      else {
        captions[absFolder] = {}
      }
    }

    // image properties
    const size = exists && !remote
      ? getSize(absPath)
      : {}
    const name = Path.basename(absPath, Path.extname(absPath))
    const caption = captions[absFolder][name]

    // add image
    return new Media(relPath, size, caption, missing)
  }
}

function processFrontmatter (sourceDir, $page) {
  // helpers
  const isImageSrc = value => typeof value === 'string' && isLocal(value) && isImage(value)
  const isImageObj = value => isPlainObject(value) && value.src && isImageSrc(value.src)
  const createMedia = value => Media.create(sourceDir, $page.regularPath, value)

  // convert image objects or image strings to media objects
  const process = function (value) {
    // if entry is an image object
    if (isImageObj(value)) {
      const media = createMedia(value.src)
      Object.assign(media, { caption: value.text, href: value.href })
      this.update(media)
    }

    // if entry is a src string
    else if (isImageSrc(value)) {
      // don't reprocess converted nodes
      if (this.parent && this.parent.node instanceof Media) {
        return
      }

      // media
      const media = createMedia(value)
      this.update(media)
    }
  }
  traverse($page.frontmatter.media).forEach(process)
}

function plugin (options, ctx) {
  return {
    chainWebpack (config) {
      config.node.global = true
    },

    extendPageData ($page) {
      processFrontmatter(ctx.sourceDir, $page)
    },
  }
}

module.exports = {
  Media,
  plugin,
}
