const Fs = require('fs')
const Path = require('path')
const traverse = require('traverse')
const getSize = require('image-size')
const YAML = require('yaml')

class Media {
  constructor (path, size = {}, caption = '', exists = true) {
    this.path = path
    this.src = path.replace(/^\.\//, '')
    this.width = size.width
    this.height = size.height
    this.caption = caption
    this.exists = exists
  }
}

const isLocalImage = /\..+\.(png|jpe?g)$/

function processFrontmatter (sourceDir, $page) {
  const captions = {}

  traverse($page.frontmatter).forEach(function (value) {
    // process only strings
    if (typeof value === 'string' && isLocalImage.test(value)) {

      // don't reprocess converted nodes
      if (this.parent && this.parent.node instanceof Media) {
        return
      }

      // get image path
      const relPath = value
      const absPath = Path.join(sourceDir, $page.regularPath, value)
      const absFolder = Path.dirname(absPath)

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

      // add image
      const exists = Fs.existsSync(absPath)
      const size = exists ? getSize(absPath) : {}
      const name = Path.basename(absPath, Path.extname(absPath))
      const caption = captions[absFolder][name]
      this.update(new Media(relPath, size, caption, exists))
    }
  })
}

module.exports = function (options, ctx) {
  return {
    chainWebpack (config) {
      config.node.global = true
    },

    extendPageData ($page) {
      processFrontmatter(ctx.sourceDir, $page)
    },
  }
}
