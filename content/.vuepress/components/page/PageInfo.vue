<template>
  <UiControls class="pageInfo">
    <PageDate v-if="date" :date="date" @click="search"/>
    <PageStats v-if="duration" v-bind="duration"/>
    <PageShare v-if="isPublic" :page="$page" />
    <Shield v-if="repo" :repo="repo" class="only-md-up"/>
    <TagList v-if="tags" :tags="tags" @click="search"/>
  </UiControls>
</template>

<script>
import { isPublic } from '../../store/config/status.js'

export default {
  computed: {
    date () {
      return this.$fm('date')
    },

    repo () {
      return this.$fm('github')
    },

    tags () {
      return this.$fm('tags')
    },

    duration () {
      return this.$page.readingTime || ''
    },

    isPublic () {
      return isPublic(this.$page)
    }
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

.uiControls.pageInfo {
  font-family: $titleFont;
  font-size: 16px;
  flex-wrap: nowrap !important;
  margin-top: 1.25rem;
  margin-left: -17.5px;

  .shield {
    padding: 0 18px;
  }
}
</style>
