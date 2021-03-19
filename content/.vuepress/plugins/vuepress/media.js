const Fs = require('fs')
const Path = require('path')
const traverse = require('traverse')
const getSize = require('image-size')
const YAML = require('yaml')

const { isRemote, isLocal, isImage } = require('../utils.js')

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
  traverse($page.frontmatter).forEach(function (value) {
    // process only strings
    if (typeof value === 'string' && isLocal(value) && isImage(value)) {
      // don't reprocess converted nodes
      if (this.parent && this.parent.node instanceof Media) {
        return
      }

      // media
      const media = Media.create(sourceDir, $page.regularPath, value)
      this.update(media)
    }
  })
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
