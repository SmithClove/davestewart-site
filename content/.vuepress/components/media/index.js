import { isLocal, getFile, getSource, placeholder } from '../../utils/media.js'
import { getValue, merge } from '../../utils/object.js'
import { capitalize } from '../../utils/string.js'

/**
 * Factory function to create a base media object
 *
 * @param   {string}  key
 */
export default function (key) {
  const name = 'Media' + capitalize(key)

  return {
    name,

    props: {
      page: {
        type: Object,
      },

      media: {
        type: String,
        default: key,
      },

      src: {
        type: String,
      },

      width: {
        type: [String, Number],
      },

      height: {
        type: [String, Number],
      },

      scale: {
        type: Boolean,
        default: false,
      },

      caption: {
        type: String,
      },
    },

    computed: {
      source () {
        const options = this.getOptions()

        const mergeFile = source => {
          if ((source.type === 'image' || !source.type) && (isLocal(source.path) || !source.path)) {
            source.file = this.getFile(source)
          }
          return source
        }

        return Array.isArray(options)
          ? options.map(option => mergeFile(option))
          : mergeFile(options)
      },

      mediaStyle () {
        const options = this.source
        const { width, height } = Array.isArray(options)
          ? options[0]
          : options
        return {
          width: '100%',
          aspectRatio: width && height
            ? `${width} / ${height}`
            : false
        }
      },

      containerStyle () {
        const source = this.source
        const { width } = Array.isArray(source)
          ? source[0]
          : source
        return {
          width: this.width || '100%',
          maxWidth: !this.scale
            ? width + 'px'
            : undefined,
        }
      },
    },

    methods: {
      getOptions (media) {
        // defaults, using props
        const defaults = {
          src: this.src,
          width: this.width
            ? parseInt(this.width)
            : placeholder.width,
          height: this.height
            ? parseInt(this.height)
            : placeholder.height,
          caption: this.caption,
        }

        // if src is not supplied, search in page media
        const page = this.page || this.$page
        const src = this.src || media || getValue(page, `frontmatter.media.${this.media}`)

        // now, ensure values are objects
        const options = getSource(src)

        // finally, return defaults merged with supplied options
        return Array.isArray(options)
          ? options.map(option => merge(defaults, option))
          : merge(defaults, options)
      },

      getFile (source) {
        const page = this.page || this.$page
        return getFile(page.regularPath, source.path)
      }
    }
  }
}
