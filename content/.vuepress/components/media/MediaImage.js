import { getStyle } from '../../utils/media.js'

export default {
  props: {
    source: Object
  },

  render (h) {
    const source = this.source
    return h('img', {
      style: getStyle(source),
      attrs: {
        src: source.file,
        alt: source.caption || source.alt,
        draggable: false,
      },
    })
  }
}
