<template>
  <div class="layout__folder">
    <h1>{{ $page.title }}</h1>
    <p class="description">{{ $page.frontmatter.description }}</p>

    <section>
      <Content/>
    </section>

    <section>
      <template v-if="options.format === 'thumbnail'">
        <ThumbnailWall :pages="pages"/>
      </template>
      <template v-else>
        <PageTree v-if="depth"
                  :items="tree"/>
        <PageList v-else
                  :pages="pages"/>
      </template>
    </section>
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
      const defaults = {
        sort: 'date',
        order: 'desc',
        format: 'list',
      }
      const options = this.$fm('options') || {}
      return { ...defaults, ...options }
    },

    tree () {
      return makeTree(this.filtered)
    },

    pages () {
      const path = this.$page.path
      return this.filtered
          .filter(page => page.path !== path)
          .sort(sortBy(this.options.sort, this.options.order))
    },

    filtered () {
      const path = this.$page.path
      return this.$site.pages.filter(page => page.path.startsWith(path))
    }
  }
}
</script>
