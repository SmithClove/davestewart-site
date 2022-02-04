<template>
  <ul class="pageList">
    <PageItem v-for="page in filtered" :page="page" />
  </ul>
</template>

<script>
import PageItem from './PageItem.vue'
import { isDev } from '../../../utils/config.js'
import { Status } from '../../../store/config/status.js'

export default {
  components: {
    PageItem
  },

  props: {
    pages: Array
  },

  computed: {
    isDev () {
      return isDev
    },

    filtered () {
      return this.pages
        .filter(page => page.status !== Status.DRAFT)
        .filter(page => page.status === Status.PREVIEW ? isDev : true)
    }
  }
}
</script>

<style lang="scss">
.pageList {
  margin: 0 0 0 2rem;
  padding: 0;
  list-style: none;
}
</style>
