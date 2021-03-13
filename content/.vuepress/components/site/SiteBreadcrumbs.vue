<template>
  <nav class="breadcrumbs">
    <span v-for="(link, index) in links"
          :key="link.href"
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
      const site = this.$site
      const links = []
      const rx = /([^/]+\/|.+)/g
      let page = this.$page
      let source = '/'
      let target = (page.regularPath || page.path).substr(1)

      // helpers
      function findPage (path) {
        return site.pages.find(page => page.regularPath === path)
      }

      function addLink (page) {
        if (arguments.length > 1) {
          const [ path, title, desc ] = arguments
          return addLink({ path, title, desc })
        }
        return links.push({
          path: page.regularPath,
          title: getValue(page, 'frontmatter.breadcrumb') || getValue(page, 'frontmatter.shortTitle') || page.title,
          desc: getValue(page, 'frontmatter.description'),
        })
      }

      // add initial link
      addLink(findPage(source))

      // process rest of string
      let matches
      while(matches = rx.exec(target)) {
        if (matches) {
          source += matches[0]
          const page = findPage(source)
          if (page) {
            addLink(page)
          }
        }
      }

      // add extra global links
      /*
      const pathname = this.location.pathname || ''
      pages.forEach(page => {
        if (pathname.startsWith(page.path)) {
          addLink(page.path, page.title, page.description)
        }
      })
      */

      // done now!
      return links
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
