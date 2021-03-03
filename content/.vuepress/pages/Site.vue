<template>
  <SiteWrapper layout="site">
    <h1>Site Map</h1>
    <p class="description">Every page on the site</p>
    <PageTree :items="tree"/>
  </SiteWrapper>
</template>

<script>
import { makeTree } from '../store/tree.js'

export default {
  computed: {
    tree () {
      return makeTree(this.$site.pages)
    },
  }
}
</script>
