<template>
  <nav class="siteSearch">
    <router-link v-if="!isOnSearchPage" to="/search/">
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
          <polygon id="handle" transform="translate(15.666905, 15.666905) rotate(-315.000000) translate(-15.666905, -15.666905) " points="11.6669048 14.0669048 19.6669048 14.0669048 19.6669048 17.2669048 11.6669048 17.2669048"></polygon>
          <path d="M8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 Z M8,2.35294118 C4.88121553,2.35294118 2.35294118,4.88121553 2.35294118,8 C2.35294118,11.1187845 4.88121553,13.6470588 8,13.6470588 C11.1187845,13.6470588 13.6470588,11.1187845 13.6470588,8 C13.6470588,4.88121553 11.1187845,2.35294118 8,2.35294118 Z" id="Oval-2"></path>
        </g>
      </svg>
    </router-link>

    <a v-else href="#" class="dimmed" @click.prevent="close">
      Exit
      <!--
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g fill="currentColor" fill-rule="evenodd">
          <g id="Group" transform="translate(3.989592, 3.929081)">
            <polygon id="bar" transform="translate(6.010408, 6.010408) rotate(-315.000000) translate(-6.010408, -6.010408) " points="-0.98959236 4.51040764 13.0104076 4.51040764 13.0104076 7.51040764 -0.98959236 7.51040764"></polygon>
            <polygon id="bar" transform="translate(6.010408, 6.010408) rotate(-225.000000) translate(-6.010408, -6.010408) " points="-0.98959236 4.51040764 13.0104076 4.51040764 13.0104076 7.51040764 -0.98959236 7.51040764"></polygon>
          </g>
        </g>
      </svg>
      -->
    </a>
    <GlobalEvents @keydown="onKeyDown" />
  </nav>
</template>

<script>
import { isModifier, isInput } from '../../utils/events.js'

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

    onKeyDown (event) {
      // skip if on search page or input
      if ((this.isOnSearchPage || isInput(event))) {
        return
      }

      // skip if modal is showing
      if (document.body.classList.contains('modal-active')) {
        return
      }

      // open search if keyboard combo hit
      if (isModifier(event) && event.key === 'k') {
        event.preventDefault()
        return this.search()
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.siteSearch {
  display: flex;
  align-items: center;
  height: 100%;

  a {
    padding: .5rem .75rem;
    color: $grey-light !important;
    &:hover {
      color: $accentColor !important;
    }
  }

  svg {
    transform: translateY(2px);
  }
}
</style>
