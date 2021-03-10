<template>
  <div :class="classes">
    <!-- header -->
    <SiteHeader/>

    <!-- main -->
    <main class="siteMain">
      <div class="layout__inner">
        <component :is="layout"/>
      </div>
    </main>

    <!-- back to top -->
    <SiteToTop/>

    <!-- prev / next -->
    <PageSiblings/>

    <!-- footer -->
    <SiteFooter/>
  </div>
</template>

<script>
import { capitalize } from '../utils/string.js'
import SiteHeader from '../components/site/SiteHeader.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import NotFound from '../pages/404.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },

  mounted () {
    window.app = this
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  computed: {
    layout () {
      if (this.$page.path) {
        const page = capitalize(this.$frontmatter.layout) || 'Page'
        return require(`../pages/${page}.vue`).default
      }
      return NotFound
    },

    classes () {
      const layout = this.layout || this.$fm('layout') || 'page'
      return {
        ['layout__' + layout]: true
      }
    },
  },

  methods: {
    onScroll () {
      const scrollBottom = document.body.offsetHeight - window.scrollY - window.innerHeight
      document.body.classList.toggle('is-scrolled', window.scrollY > 60)
      document.body.classList.toggle('is-at-end', scrollBottom < 100)
    },

    onResize () {
      const app = document.querySelector('#app')
      const header = document.querySelector('.siteHeader')
      if (header) {
        const offset = header.offsetHeight + 'px'
        document.body.style.scrollPaddingTop = offset
        app.style.paddingTop = offset
      }
    }
  }
}
</script>
