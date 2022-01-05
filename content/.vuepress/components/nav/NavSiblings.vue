<template>
  <nav class="pageSiblings">
    <div class="layout__inner" v-if="index > -1">
      <!-- prev -->
      <div v-if="prev" class="pageSiblings__prev">
        <span class="arrow"></span>
        <router-link :to="prev.path">{{ getTitle(prev) }}</router-link>
      </div>
      <span v-else></span>

      <!-- next -->
      <div v-if="next" class="pageSiblings__next">
        <router-link :to="next.path">{{ getTitle(next) }}</router-link>
        <span class="arrow"></span>
      </div>
    </div>
  </nav>
</template>

<script>
import { getKeys } from '../../utils/events.js'

export default {
  computed: {
    index () {
      const sorted = this.$store.sorted
      return Array.isArray(sorted)
        ? sorted.findIndex(page => page.regularPath === this.$page.regularPath)
        : -1
    },

    prev () {
      return this.index > -1
        ? this.$store.sorted[this.index - 1]
        : null
    },

    next () {
      return this.index > -1
        ? this.$store.sorted[this.index + 1]
        : null
    }
  },

  mounted () {
    document.addEventListener('keydown', this.onKeyDown)
  },

  methods: {
    getTitle (page) {
      return page.frontmatter.shortTitle || page.title
    },

    onKeyDown (event) {
      const { shift, meta, alt, ctrl, left, right } = getKeys(event)
      if (shift && !meta && !alt && !ctrl) {
        if (left && this.prev) {
          this.$router.push(this.prev.path)
        }
        else if (right && this.next) {
          this.$router.push(this.next.path)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

@mixin arrow {
  content: ' ';
  display: block;
  width: 10px;
  height: 18px;
  margin: 0 2px;
  background: url('../../assets/breadcrumb-arrow.svg') no-repeat;
}

.pageSiblings {

  line-height: 1.4em;
  vertical-align: top;

  .layout__inner {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border-top: 1px solid $grey-lightest;
  }

  a, span {
    display: block;
  }

  &__prev {
    display: flex;
    padding-right: .5rem;
    span:before {
      @include arrow;
      transform: scale(-1.4, 1.4) translate(5px, 3px);
    }
  }

  &__next {
    display: flex;
    padding-left: .5rem;
    text-align: right;
    span:after {
      @include arrow;
      transform: scale(1.4, 1.4) translate(5px, 3px);
    }
  }
}
</style>
