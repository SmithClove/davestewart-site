<template>
  <div class="layout__home">
    <h1>Dave Stewart</h1>
    <p class="description">Web Developer and Indie Maker</p>
    <keep-alive>
      <PageList :pages="tree"/>
    </keep-alive>
  </div>
</template>

<script>
import { getValue } from '../utils/object.js'
import { makeTree } from '../store/tree.js'

export default {
  computed: {
    tree () {
      return makeTree(this.$site.pages)
    },

    thumbnails () {
      return this.$site.pages.filter(page => {
        return !!getValue(page, 'frontmatter.media.thumbnail')
      })
    }
  }
}
</script>
