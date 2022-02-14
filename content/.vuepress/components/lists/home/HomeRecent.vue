<template>
  <ThumbnailWall :pages="pages"/>
</template>

<script>
import { isPublished } from '../../../store/config/status.js'
import { sortBy } from '../../../utils/array.js'
import { isWithinDays } from '../../../utils/time.js'

export default {
  computed: {
    pages () {
      return this.$site.pages
        .filter(page => page.type === 'post')
        .filter(isPublished)
        .filter(page => isWithinDays(page.date, 356 / 2))
        .sort(() => Math.random() - .5)
        .sort(sortBy('date', 'desc'))
    },
  }
}
</script>

<style>

</style>
