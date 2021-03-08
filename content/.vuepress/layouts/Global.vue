<template>
  <SiteWrapper>
    <component :is="layout"/>
  </SiteWrapper>
</template>

<script>
import { capitalize } from '../utils/string.js'
import NotFound from './404'

export default {
  computed: {
    layout () {
      if (this.$page.path) {
        const page = capitalize(this.$frontmatter.layout) || 'Page'
        return require(`../pages/${page}.vue`).default
      }
      return NotFound
    }
  }
}
</script>
