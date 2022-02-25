<template>
  <nav class="navHamburger">

    <!-- button -->
    <div class="navHamburger__button" @click="visible = !visible">
      <svg width="15px" height="14px" viewBox="0 0 15 14">
        <rect id="bar-1" fill="currentColor" x="2" y="3" width="11" height="2"></rect>
        <rect id="bar-2" fill="currentColor" x="2" y="7" width="11" height="2"></rect>
        <rect id="bar-3" fill="currentColor" x="2" y="11" width="11" height="2"></rect>
      </svg>
    </div>

    <!-- background -->
    <div v-if="visible" class="navHamburger__background"></div>

    <!-- dropdown -->
    <div ref="dropdown" v-if="visible" class="navHamburger__dropdown">
      <div v-for="section in sections" :key="section.name" class="navHamburger__section">
        <router-link v-for="link in section.links"
                     :key="link.path"
                     :to="link.path"
                     class="navHamburger__item"
        >
          <span class="navHamburger__text">{{ link.title }}</span>
          <span v-if="link.desc" class="navHamburger__desc">{{ link.desc }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { getValue } from '../../utils/object.js'

export default {
  data () {
    return {
      visible: false
    }
  },

  watch: {
    visible (value) {
      if (value) {
        document.addEventListener('mouseup', this.onMouseDown)
      }
      else {
        document.removeEventListener('mouseup', this.onMouseDown)
      }
    },

    '$route.path' () {
      this.visible = false
    }
  },

  computed: {
    sections () {
      // helper
      const section = (name, paths) => {
        return {
          name,
          links: paths
            .map(path => this.$site.pages.find(page => page?.path === path))
            .map(page => {
              const desc = page.path === '/'
                ? 'Back to the Home page'
                : getValue(page, 'frontmatter.description')
              return {
                path: page.path,
                title: getValue(page, 'frontmatter.breadcrumb') || getValue(page, 'frontmatter.shortTitle') || page.title,
                desc,
              }
            })
        }
      }

      // return links
      return [
        section('Info', [
          '/',
          '/bio/',
          '/blog/',
        ]),
        section('Work', [
          '/products/',
          '/projects/',
          '/work/',
          '/archive/',
        ]),
        section('Site', [
          '/sitemap/',
          '/search/',
        ]),
      ]
    },
  },

  methods: {
    onMouseDown (event) {
      if (this.$refs.dropdown) {
        if (!this.$refs.dropdown.contains(event.target)) {
          this.visible = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.navHamburger {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 2.5rem;
    min-height: 2.5rem;
    border-right: 1px solid $grey-lightest;
    cursor: pointer;
    color: $grey-light;

    &:hover {
      color: $accentColor;
    }
  }

  &__background {
    @include fit;
    position: fixed;
    background: #FFFD;
  }

  &__dropdown {
    position: absolute;
    background: white;
    padding: .5rem;
    outline: 1px solid $grey-lightest;
    border-radius: 2px;
    z-index: 100;
    font-size: 1.15em;

    @include shadow-lg;

    @include sm {
      font-size: 1.3em;
      box-sizing: border-box;
      width: calc(100vw - 20px);
      top: 10px;
      left: 10px;
    }

    @include md-up {
      top: 5px;
      left: 5px;
      width: auto;
      height: auto;
    }
  }

  &__section {
    border-bottom: 1px solid $grey-lightest;
    padding: .5rem 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border: none;
    }
  }

  &__item {
    display: block;
    white-space: nowrap;
    padding: .5rem !important;
    margin: 0 0 .5rem;
    border-radius: 3px;

    @include md-up {
      padding-right: 2rem !important;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background: mix($grey-lightest, white, 50%);
      text-decoration: none;
    }
  }

  &__text {
    display: block;
    font: $titleFont;
    font-weight: 700;
  }

  &__desc {
    font-size: .75em;
    color: $grey;
  }

  a.router-link-exact-active * {
    color: $grey-light;
    cursor: default;
    pointer-events: none;
  }
}

</style>
