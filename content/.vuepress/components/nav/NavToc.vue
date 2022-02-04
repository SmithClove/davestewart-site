<template>
  <p v-if="pages.length > 1" v-html="html"/>
</template>

<script>
import { slugify } from '../../utils/string.js'

export default {
  props: {
    pages: {
      type: Array,
      default: () =>[]
    }
  },

  computed: {
    html () {
      const links = this.pages.map(page => {
        const text = page.title.toLowerCase()
        const href = slugify(page.path.replace(this.$page.path, ''))
        return `<a href="#${href}">${text}</a>`
      })
      const last = links.pop()
      return `Jump to ${links.join(', ')} or ${last}.`
    }
  }
}
</script>
