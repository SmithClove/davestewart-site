<template>
  <nav class="pageSiblings" v-if="index > -1">
    <div class="layout__inner">
      <!-- prev -->
      <div v-if="prev" class="pageSiblings__prev">
        <router-link :to="prev.path">{{ prev.title }}</router-link>
      </div>
      <span v-else></span>

      <!-- next -->
      <div v-if="next" class="pageSiblings__next">
        <router-link :to="next.path">{{ next.title }}</router-link>
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
    onKeyDown (event) {
      const keys = getKeys(event)
      if (keys.shift && !keys.meta && !keys.alt && !keys.ctrl) {
        if (keys.left) {
          this.$router.push(this.prev.path)
        }
        else if (keys.right) {
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
  display: inline-block;
  width: 10px;
  height: 14px;
  line-height: 1;
  margin: 0 2px;
  background: url('../../assets/breadcrumb-arrow.svg') no-repeat;
  background-position-y: 80%;
  vertical-align: bottom;
  content: ' ';
}

.pageSiblings {
  //padding-bottom: 1rem;
  //border-top: 1px solid $grey-lightest;

  .layout__inner {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  &__prev a:before {
    @include arrow;
    transform: scale(-1.4, 1.4) translate(5px, 0);
  }

  &__next a:after {
    @include arrow;
    transform: scale(1.4, 1.4) translate(5px, 0);
  }
}
</style>
