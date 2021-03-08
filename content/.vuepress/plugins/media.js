const Fs = require('fs')
const Path = require('path')
const traverse = require('traverse')
const getSize = require('image-size')
const YAML = require('yaml')

const { isRemote, isLocal, isImage } = require('./utils')

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
}

function processFrontmatter (sourceDir, $page) {
  const captions = {}

  traverse($page.frontmatter).forEach(function (value) {
    // process only strings
    if (typeof value === 'string' && isLocal(value) && isImage(value)) {

      // don't reprocess converted nodes
      if (this.parent && this.parent.node instanceof Media) {
        return
      }

      // path
      const relPath = value
      const absPath = Path.join(sourceDir, $page.regularPath, value)
      const absFolder = Path.dirname(absPath)

      // flags
      const remote = isRemote(relPath)
      const exists = Fs.existsSync(absPath)
      const missing = remote
        ? false
        : !exists

      // captions
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
      this.update(new Media(relPath, size, caption, missing))
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
  plugin,
}
