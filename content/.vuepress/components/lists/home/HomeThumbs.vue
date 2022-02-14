<template>
  <div class="homeThumbs">
    <p>
      Right now, let's start you off with
      some <a href="#recent" :class="{ active: !options.random }" @click.prevent="setRecent">recent</a>
      or <a href="#random" :class="{ active: options.random }" @click.prevent="setRandom">random</a>
      posts:</p>
    <ThumbnailWall :pages="pages"/>
  </div>
</template>

<script>
import { isPublished } from '../../../store/config/status.js'
import { isWithinDays } from '../../../utils/time.js'
import { sortBy } from '../../../utils/array.js'
import { storage } from '../../../utils/storage.js'

export default {
  data () {
    return {
      pages: [],
      options: {
        days: null,
        random: null,
      }
    }
  },

  watch: {
    options: {
      deep: true,
      handler (value) {
        storage.set('recent', value)
      }
    }
  },

  created () {
    const data = storage.get('recent')
    if (data) {
      Object.assign(this.options, data)
      this.update()
    }
    else {
      this.setRecent()
    }
  },

  methods: {
    setRecent () {
      this.options.days = 365 / 2
      this.options.random = false
      this.update()
    },

    setRandom () {
      this.options.days = 365 * 5
      this.options.random = true
      this.update()
    },

    update () {
      // options
      const { days, random } = this.options

      // filter pages
      let pages = this.$site.pages
        .filter(page => page.type === 'post')
        .filter(isPublished)
        .sort(sortBy('date', 'desc'))

      if (days) {
        pages = pages.filter(page => isWithinDays(page.date, days))
      }

      if (random) {
        pages = pages.sort(() => Math.random() - .5)
      }

      // set pages
      this.pages = pages.slice(0, 6)
    }
  }
}
</script>

<style lang="scss">
.homeThumbs {
  a.active {
    text-decoration: underline !important;

    &:after {
      //content: "*";
    }
  }
}
</style>
