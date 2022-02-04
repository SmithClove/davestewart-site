<template>
  <div :class="classes">
    <!-- header -->
    <SiteHeader/>

    <!-- main -->
    <main class="siteMain">
      <div class="layout__inner">
        <component :is="component" :key="path"/>
      </div>
    </main>

    <!-- scroll to top -->
    <ClientOnly>
      <NavScrollTop/>
    </ClientOnly>

    <!-- lower area -->
    <div class="layout__bottom">
      <!-- prev / next -->
      <NavSiblings/>

      <!-- footer -->
      <SiteFooter/>
    </div>

    <!-- preview modal -->
    <Preview/>
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

  computed: {
    path () {
      return this.$page.path
    },

    layout () {
      const layout = this.$fm('layout')
      if (layout === 'post') {
        return 'page'
      }
      return layout || 'page'
    },

    classes () {
      return {
        ['layout__' + this.layout]: true,
      }
    },

    component () {
      if (this.$page.path) {
        const page = capitalize(this.layout)
        return require(`../pages/${page}.vue`).default
      }
      return NotFound
    },
  },

  watch: {
    '$route.path' () {
      this.$nextTick(() => this.updateHeader())
    },
  },

  mounted () {
    window.app = this
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    window.addEventListener('orientationchange', this.onResize)
    this.$nextTick(() => this.updateHeader())
    this.updateHeader()
  },

  methods: {
    updateHeader () {
      const app = document.querySelector('#app')
      const header = document.querySelector('.siteHeader')
      if (header) {
        const offset = header.offsetHeight + 'px'
        document.body.style.scrollPaddingTop = offset
        app.style.paddingTop = offset
      }
    },

    onScroll () {
      const scrollBottom = document.body.offsetHeight - window.scrollY - window.innerHeight
      document.body.classList.toggle('is-scrolled', window.scrollY > 60)
      document.body.classList.toggle('is-at-end', scrollBottom < 100)
    },

    onResize () {
      this.updateHeader()
    },
  },
}
</script>
