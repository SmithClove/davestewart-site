<template>
  <div class="layout__folder">
    <h1>{{ $page.title }}</h1>
    <p class="description">{{ $page.frontmatter.description }}</p>

    <!-- content -->
    <div class="pageContent">
      <!-- text -->
      <Content/>

      <!-- navigation -->
      <NavToc v-if="$page.frontmatter.toc" :pages="tree" />
    </div>

    <!-- folders -->
    <PageTree v-if="options.mode === 'tree'" :items="tree" :format="options.format"/>
    <template v-else>
      <ThumbnailWall v-if="options.format === 'image'" :pages="pages"/>
      <PageList v-else :pages="pages"/>
    </template>

    <!-- after -->
    <Content slot-key="after" class="pageContent pageContent--bottom"/>
  </div>
</template>

<script>
import { makeTree } from '../store/services/tree.js'
import { sortBy } from '../utils/array.js'

export default {
  computed: {
    options () {
      const options = {
        mode: 'tree',
        format: 'image',
        sort: 'date',
        order: 'desc',
      }
      const mode = this.$route.query.mode || this.$page.frontmatter.mode
      const format = this.$route.query.format || this.$page.frontmatter.format
      if (mode) {
        options.mode = mode
      }
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
