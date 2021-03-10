<template>
  <nav class="siteSearch">
    <router-link v-if="!isOnSearchPage" to="/search/">Search</router-link>
    <a v-else href="#" class="dimmed" @click="close">Back</a>
    <GlobalEvents @keyup="onKeyUp" />
  </nav>
</template>

<script>
import { isEscape, isInput, isChar } from '../../utils/dom.js'

export default {
  computed: {
    isOnSearchPage () {
      return this.$route.path.startsWith('/search')
    }
  },

  methods: {
    search (value = '') {
      const path = '/search/'
      const query = value
        ? `?text=${value.replace('/', '')}`
        : ''
      this.$router
          .push(path + query)
          .catch(() => {})
    },

    close () {
      history.back()
    },

    onKeyUp (event) {
      // skip if on search page or input
      if ((this.isOnSearchPage || isInput(event))) {
        return
      }

      // open search if keyboard combo hit
      if (event.key === '/' || isEscape(event)) {
        event.preventDefault()
        return this.search()
      }

      // any other typing
      else if (isChar(event)) {
        this.search(event.key)
      }
    }
  }
}
</script>
