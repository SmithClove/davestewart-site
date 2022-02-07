<template>
  <li class="pageItem">
    <span class="pageItem__title" :data-status="page.status ? page.status : undefined">
      <router-link :to="page.path">{{ page.title }}</router-link>
    </span>
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
@import "../../../styles/variables";

.pageItem {
  margin-bottom: .75em;
  list-style-type: disc;

  @include sm {
    font-size: 1rem;
  }

  &__title {
    margin: 0;
    position: relative;
    line-height: 1.6em;

    // for focus outline
    &:focus {
      padding: 2px 6px;
      margin: -2px -6px;
    }

    &[data-status]:after {
      position: relative;
      left: .75em;
      top: -.75em;
      font-size: .55em;
    }
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
