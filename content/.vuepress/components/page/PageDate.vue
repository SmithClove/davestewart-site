<template>
  <div v-if="date" class="pageDate">
    <span class="pageDate__text" :title="relative">{{ formatted }}</span>
  </div>
</template>

<script>
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

export default {
  props: {
    date: {
      type: String
    }
  },

  computed: {
    dateObject () {
      return new Date(this.date)
    },

    relative () {
      return formatDistance(this.dateObject, new Date())

    },

    formatted () {
      return format(this.dateObject, 'MMMM yyyy')
    }
  },
}
</script>

<style lang="scss">
.pageDate__text {
  display: inline-block;
  padding: .3em .5em;
  white-space: nowrap;
}
</style>

