<template>
  <div class="layout__folder">
    <h1>{{ $page.title }}</h1>
    <p class="description">{{ $page.frontmatter.description }}</p>

    <!-- text -->
    <Content class="pageContent"/>

    <!-- folders -->
    <ThumbnailWall v-if="options.format === 'thumbnails'" :pages="pages"/>
    <PageTree v-else-if="depth" :items="tree"/>
    <PageList v-else :pages="pages"/>

    <!-- after -->
    <Content slot-key="after" class="pageContent pageContent--bottom"/>
  </div>
</template>

<script>
import { makeTree } from '../store/tree.js'
import { sortBy } from '../utils/array.js'

export default {
  computed: {
    depth () {
      return this.tree.some(item => item.pages)
    },

    options () {
      const options = {
        format: 'list',
        sort: 'frontmatter.date',
        order: 'desc',
      }
      const format = this.$fm('format')
      if (format) {
        options.format = format
      }
      return options
    },

    filtered () {
      const regularPath = this.$page.regularPath
      return this.$site.pages.filter(page => page.regularPath.startsWith(regularPath))
    },

    pages () {
      const regularPath = this.$page.regularPath
      return this.filtered
        .filter(page => page.regularPath !== regularPath)
        .filter(page => !page.frontmatter.layout)
        .sort(sortBy(this.options.sort, this.options.order))
    },

    tree () {
      return makeTree(this.filtered)
    },
  }
}
</script>
