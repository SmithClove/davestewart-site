<template>
  <div class="homeRecent">
    <p>But let's get you started with some <a href="#recent" @click.prevent="setRecent">recent</a> / <a href="#random" @click.prevent="setRandom">random</a> projects + posts:</p>
    <ThumbnailWall :pages="pages"/>
  </div>
</template>

<script>
import { isPublished } from '../../../store/config/status.js'
import { sortBy } from '../../../utils/array.js'
import { isWithinDays } from '../../../utils/time.js'

export default {
  data () {
    return {
      days: 0,
      random: 0,
      total: 6,
      pages: [],
    }
  },

  created () {
    this.setRecent()
  },

  methods: {
    setRecent () {
      this.days = 365 / 2
      this.random = false
      this.update()
    },

    setRandom () {
      this.days = 365 * 5
      this.random = true
      this.update()
    },

    update () {
      let pages = this.$site.pages
        .filter(page => page.type === 'post')
        .filter(isPublished)
        .sort(sortBy('date', 'desc'))

      if (this.days) {
        pages = pages.filter(page => isWithinDays(page.date, this.days))
      }

      if (this.random) {
        pages = pages.sort(() => Math.random() - .5)
      }

      if (this.total) {
        pages = pages.slice(0, this.total)
      }

      this.pages = pages
    }
  }
}
</script>

<style>

</style>
