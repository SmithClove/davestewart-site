<template>
  <li class="pageItem">
    <router-link :to="page.path" class="pageItem__title">{{ page.title }}</router-link>
    <span v-if="desc" class="pageItem__desc">{{ desc }}</span>
  </li>
</template>

<script>
import { getValue } from '../../../utils/object.js'

export default {
  props: {
    page: Object,
  },

  computed: {
    desc () {
      return this.page.desc || getValue(this.page, 'frontmatter.description')
    }
  }
}
</script>

<style lang="scss">
.pageItem {
  margin-bottom: .75em;
  list-style-type: disc;

  &__title {
    margin: 0;
    position: relative;
    line-height: 1.6em;
  }

  &__desc {
    display: block;
    margin: 0;
    font-size: .8em;
    color: #888888;
    line-height: 1.4em;
  }
}
</style>
