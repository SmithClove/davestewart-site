<template>
  <div class="layout__home home">
    <!--
    <PageHero />
    -->

    <img class="home__splash" :src="require('../assets/home-splash-small.svg')">

    <h1>I'm Dave</h1>
    <p class="description">An experienced web developer + full time indie maker</p>

    <Content class="pageContent" :props="{ tree }" id="content" />
    <!--
    <keep-alive>
      <PageList :pages="tree"/>
    </keep-alive>
    -->
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

<style lang="scss">
.home {
  &__splash {
    width: 100%;
    aspect-ratio: 840/400;
    pointer-events:none;
    user-select: none;
  }
}
</style>
