<template>
  <SiteWrapper>
    <component :is="layout"/>
  </SiteWrapper>
</template>

<script>
import NotFound from './404'

export default {
  computed: {
    layout () {
      if (this.$page.path) {
        const layout = this.$frontmatter.layout || 'Page'
        return require(`../pages/${layout}.vue`).default
      }
      return NotFound
    }
  }
}
</script>
