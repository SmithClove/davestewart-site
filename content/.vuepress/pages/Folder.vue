<template>
  <div class="layout__folder">
    <h1>{{ $page.title }}</h1>
    <p class="description">{{ $page.frontmatter.description }}</p>

    <Content class="pageContent"/>

    <template v-if="options.format === 'thumbnails'">
      <ThumbnailWall :pages="pages"/>
    </template>
    <template v-else>
      <PageTree v-if="depth"
                :items="tree"/>
      <PageList v-else
                :pages="pages"/>
    </template>
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
        sort: 'date',
        order: 'desc',
        format: 'list',
      }
      const format = this.$fm('format')
      if (format) {
        options.format = format
      }
      return options
    },

    filtered () {
      const path = this.$page.path
      return this.$site.pages.filter(page => page.path.startsWith(path))
    },

    pages () {
      const path = this.$page.path
      return this.filtered
          .filter(page => page.path !== path)
          .sort(sortBy(this.options.sort, this.options.order))
    },

    tree () {
      return makeTree(this.filtered)
    },
  }
}
</script>
