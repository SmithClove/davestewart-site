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

    <!-- footer -->
    <SiteFooter/>
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
      document.body.classList.toggle('is-scrolled', window.scrollY > 0)
    },

    onResize () {
      const header = document.querySelector('.siteHeader')
      if (header) {
        const offset = header.offsetHeight + 'px'
        document.body.style.marginTop = offset
        document.body.style.scrollPaddingTop = offset
      }
    }
  }
}
</script>
