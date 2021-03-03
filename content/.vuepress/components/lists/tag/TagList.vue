<template>
  <div v-if="tags.length" class="tagList">
    <router-link v-for="tag in tags"
                 class="tagList__tag"
                 :class="{ selected: tag === selected }"
                 :key="tag"
                 :to="`/tags/${tag}`"
    >{{ tag.replace(/-/, ' ') }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default () {
        return []
      },
    },

    selected: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
.tagList {
  word-break: keep-all;
  font-size: 0;

  &__tag {
    font-size: 14px;
    display: inline-block;
    padding: .3em .5em;
    vertical-align: middle;

    &.selected {
      background: var(--theme);
      color: white !important;
      border-radius: 4px;
      text-decoration: none !important;
    }
  }

}
</style>
