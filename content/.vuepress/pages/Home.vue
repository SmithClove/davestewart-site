<template>
  <div class="layout__home home">
    <!--
    <PageHero />
    -->

    <img class="home__splash" :src="require('../assets/home-splash-small.svg')">

    <h1>I'm Dave</h1>
    <p class="description">An experienced web developer + indie maker</p>

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
import { makeTree } from '../store/services/tree.js'

export default {
  computed: {
    tree () {
      return makeTree(this.$site.pages)
    },

    thumbnails () {
      return this.$site.pages
        .filter(page => getValue(page, 'frontmatter.media.thumbnail'))
    },

    branches () {
      const found = []
      return this.$store.sorted
        .reduce((output, input) => {
          const path = input.parentPath
          if (!found.includes(path)) {
            output.push(input)
            found.push(path)
          }
          return output
        }, [])
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
