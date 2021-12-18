<template>
  <ul class="pageList">
    <PageItem v-for="page in filtered" :page="page" />
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

  computed: {
    filtered () {
      return this.pages
        .filter(page => !page.frontmatter.preview)
        .filter(page => !page.frontmatter.draft)
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
