<template>
  <div class="breadcrumbs">
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
  </div>
</template>

<script>
import { getValue } from '../../utils/object.js'

export default {
  data () {
    return {
      location: {}
    }
  },

  beforeMount () {
    this.location = window.location
  },

  computed: {
    links () {
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
          title: getValue(page, 'frontmatter.breadcrumb') || page.title,
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
      const pathname = this.location.pathname || ''
      if (pathname.startsWith('/tags')) {
        addLink('/tags/', 'Tags', 'Search projects by tag')
      }

      if (pathname.startsWith('/all')) {
        addLink('/all/', 'Site Map', 'Everything on the site')
      }

      // done now!
      return links
    },
  },
}
</script>

<style lang="scss">
.breadcrumbs {
  width: 100%;
  display: flex;
  margin: -.3rem 0;
  flex-wrap: wrap;
  font-size: 14px;
}

.breadcrumb {
  &__item {
    display: inline-block;
    white-space: nowrap;
    margin: .3rem 0;

    &:not(:last-child):after {
      display: inline-block;
      width: 10px;
      height: 14px;
      line-height: 1;
      margin: 0 8px;
      background: url('../../assets/breadcrumb-arrow.svg') no-repeat;
      background-position-y: 80%;
      vertical-align: bottom;
      content: ' ';
    }

    //&:not(:last-child):after {
    //  display: inline-block;
    //  width: 12px;
    //  height: 14px;
    //  line-height: 1;
    //  margin: 0 8px;
    //  background-position-y: 80%;
    //  vertical-align: bottom;
    //  content: ' ';
    //}
  }

  &__text {
    opacity: .3;
  }
}
</style>
