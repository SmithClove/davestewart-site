<template>
  <nav class="breadcrumbs">
    <span v-for="(link, index) in links"
          :key="link.path"
          class="breadcrumb__item"
    >
      <router-link v-if="index < links.length - 1"
                   :to="link.path"
                   :title="link.desc"
                   class="breadcrumb__link"
      >{{ link.title }}</router-link>
      <span v-else class="breadcrumb__text">{{ link.title }}</span>
    </span>
  </nav>
</template>

<script>
import { getValue } from '../../utils/object.js'

export default {
  computed: {
    links () {
      // special case for not found
      if (this.notFound) {
        return [
          { path: '/', title: 'Home' },
          { title: '404' }
        ]
      }

      // variables
      const links = []

      // add links by removing last segment until none left
      let regularPath = this.$page.regularPath
      do {
        const page = this.$site.pages.find(page => page.regularPath === regularPath)
        if (page) {
          links.push({
            path: page.path,
            title: getValue(page, 'frontmatter.breadcrumb') || getValue(page, 'frontmatter.shortTitle') || page.title,
            desc: getValue(page, 'frontmatter.description'),
          })
        }
        regularPath = regularPath.replace(/[^/]*\/?$/, '')
      }
      while (regularPath !== '')

      // return reversed
      return links.reverse()
    },

    notFound () {
      return this.$page.path === ''
    }
  },
}
</script>

<style lang="scss">
.breadcrumbs {
  width: 100%;
  display: flex;
  margin: 0 0 0 -6px;
  flex-wrap: wrap;
}

.breadcrumb {
  &__item {
    display: inline-block;
    white-space: nowrap;
    margin: 0 0 0.5rem 0;
    cursor: default;

    // arrow
    &:not(:last-child):after {
      display: inline-block;
      width: 10px;
      height: 14px;
      line-height: 1;
      margin: 0 2px;
      background: url('../../assets/breadcrumb-arrow.svg') no-repeat;
      background-position-y: 80%;
      vertical-align: bottom;
      content: ' ';
    }
  }

  &__text {
    opacity: .3;
  }
}
</style>
