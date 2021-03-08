<template>
  <div class="siteSearch">
    <router-link to="/search/" @click.native="focus">Search</router-link>
  </div>
</template>

<script>
import { getKeyText, isEscape, isInput, isNotModifier } from '../../utils/dom.js'

export default {
  data () {
    return {
      value: ''
    }
  },

  computed: {
    isOnSearchPage () {
      return this.$route.path.startsWith('/search')
    }
  },

  mounted () {
    document.addEventListener('keyup', this.onKeyUp)
  },

  methods: {
    search () {
      this.$router.push(`/search/?text=${this.value.replace('/', '')}`)
    },

    focus (event) {
      const element = document.querySelector('#search')
      if (element) {
        element.focus()
      }
    },

    blur (event) {
      event.target.blur()
    },

    onKeyUp (event) {
     if (!isInput(event)) {

        // trigger search
        if (event.key === '/' || isEscape(event)) {
          event.preventDefault()
          return this.search()
        }

        // any other typing
        if (isNotModifier(event)) {
          const key = getKeyText(event).toLowerCase()
          if (key && key.length === 1 && key >= 'a' && key <= 'z') {
            this.value = key
            this.search()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.siteSearch {
  position: relative;
  input {
    position: absolute;
    top: -5px;
    right: 0;
  }
}
</style>
