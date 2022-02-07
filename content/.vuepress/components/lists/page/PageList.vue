<template>
  <ul class="pageList">
    <PageItem v-for="page in this.pages" :page="page" />
  </ul>
</template>

<script>
import PageItem from './PageItem.vue'

export default {
  components: {
    PageItem
  },

  props: {
    pages: Array
  },
}
</script>

<style lang="scss">
.pageList {
  margin: 0 0 0 2rem;
  padding: 0;
  list-style: none;
}
</style>
