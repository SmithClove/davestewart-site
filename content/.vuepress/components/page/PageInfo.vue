<template>
  <UiControls class="pageInfo">
    <PageDate v-if="date" :date="date" @click="search"/>
    <TagList v-if="tags" :tags="tags" @click="search"/>
  </UiControls>
</template>

<script>
export default {
  computed: {
    date () {
      return this.$fm('date')
    },

    tags () {
      return this.$fm('tags')
    },
  },

  methods: {
    search (href) {
      this.$router.push(href)
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/variables';

.pageInfo {
  font-family: $titleFont;
  font-size: 16px;
  flex-wrap: nowrap !important;
}
</style>
