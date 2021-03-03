<template>
  <ul class="pageInfo">
    <li v-if="date" class="pageInfo__item">
      <PageDate :date="date"/>
    </li>
    <li v-if="tags" class="pageInfo__item">
      <TagList :tags="tags"/>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    date () {
      return this.$fm('date')
    },

    tags () {
      return this.$fm('tags')
    }
  }
}
</script>

<style lang="scss">
.pageInfo {
  display: flex;
  list-style: none;
  font-size: 14px;
  margin: 0 10px 0 -8px;
  padding: 0;

  * {
    line-height: 1.4em;;
  }

  &__item {
    padding: 5px 10px;
    vertical-align: middle;

    &:first-child {
      margin-left: -10px;
    }

    &:not(:first-child) {
      border-left: 1px solid #DDD;
    }
  }
}
</style>
