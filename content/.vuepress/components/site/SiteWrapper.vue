<template>
  <div :class="classes">
    <!-- header -->
    <SiteHeader/>

    <!-- main -->
    <main class="siteMain">
      <div class="layout__inner">
        <slot></slot>
      </div>
    </main>

    <!-- back to top -->
    <SiteToTop/>

    <!-- prev / next -->
    <SiteSiblingNavigation/>

    <!-- footer -->
    <SiteFooter/>

    <!-- preview -->
    <Modal />
  </div>
</template>

<script>
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },

  props: {
    layout: {
      type: String
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  computed: {
    classes () {
      const layout = this.layout || this.$fm('layout') || 'Page'
      // const name = layout.replace(/\w/, c => c.toUpperCase())
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
