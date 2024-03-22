<template>
  <div class="homeThumbs">
    <p>
      Here's a <a href="#random" :class="{ active: options.random }" @click.prevent="setRandom">random</a>
      selection of what I've been working on :</p>
    <ThumbnailWall :pages="pages"/>
  </div>
</template>

<script>
import { isVisible } from '../../../store/config/status.js'
import { isWithinDays } from '../../../utils/time.js'
import { sortBy } from '../../../utils/array.js'
import { storage } from '../../../utils/storage.js'

export default {
  data () {
    return {
      pages: [],
      options: {
        days: null,
        random: true,
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
      this.options.days = 365
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
        .filter(page => page.type === 'post' && page.status !== 'preview')
        .sort(sortBy('date', 'desc'))
        .filter(isVisible)

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
@import "../../../styles/variables";

.homeThumbs {

  .thumbnailWall {
    margin: 3rem 0;
  }

  a {
    color: $grey-lighter;
    text-decoration: underline;
  }

  a.active {
    color: $accentColor;
    text-decoration: none;

    &:after {
      //content: "*";
    }
  }
}
</style>
