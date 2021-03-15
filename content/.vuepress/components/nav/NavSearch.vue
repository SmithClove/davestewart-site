<template>
  <nav class="siteSearch">
    <router-link v-if="!isOnSearchPage" to="/search/">Search</router-link>
    <a v-else href="#" class="dimmed" @click="close">Back</a>
    <GlobalEvents @keyup="onKeyUp" />
  </nav>
</template>

<script>
import { isChar, isEscape, isInput } from '../../utils/events.js'

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

      // skip if modal is showing
      if (document.body.classList.contains('modal-active')) {
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
