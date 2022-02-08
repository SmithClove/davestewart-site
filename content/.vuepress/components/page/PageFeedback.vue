<template>
  <div class="pageFeedback pageContent">
    <h2>{{ title }}</h2>
    <div id="hyvor-talk-view"></div>
  </div>
</template>

<script>
const url = 'https://talk.hyvor.com/web-api/embed.js'

export default {
  props: {
    websiteId: String,
    title: {
      type: String,
      default: 'Feedback'
    },
  },

  mounted () {
    this.start()
  },

  destroyed () {
    this.remove()
  },

  methods: {
    start () {
      const options = {
        // relative to document viewport
        root: null,

        // margin around root. Values are similar to css property
        rootMargin: '500px',

        // visible amount of item shown in relation to root
        threshold: 0,
      }
      this.observer = new IntersectionObserver(this.onChange, options)
      this.observer.observe(this.$el)
    },

    onChange (changes, observer) {
      changes.forEach(change => {
        if (change.intersectionRatio > 0) {
          this.observer.unobserve(this.$el)
          this.observer.disconnect()
          this.add()
        }
      })
    },

    add () {
      window.HYVOR_TALK_WEBSITE = this.websiteId
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      document.body.appendChild(script)
    },

    remove () {
      const script = document.querySelector(`script[src="${url}"]`)
      if (script) {
        document.body.removeChild(script)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.pageFeedback {
  //margin-top: 5rem;
  //border-top: 1px solid $grey-lightest;
}

#hyvor-talk-view {
  min-height: 280px;
  margin-bottom: -80px;
  margin-left: -1rem;
  margin-right: -1rem;
  width: calc(100% + 2rem) !important;
  max-width: unset !important;

  iframe {
    width: calc(100% + 2rem) !important;
  }
}
</style>
