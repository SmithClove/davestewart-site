<template>
  <nav class="navHamburger">
    <span class="navHamburger__button" @click="visible = !visible">
      <svg width="15px" height="16px" viewBox="0 0 15 16">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect id="background" fill="#FFFFFF" x="0" y="0.5" width="15" height="15"></rect>
              <rect id="bar-1" fill="currentColor" x="2" y="3" width="11" height="2"></rect>
              <rect id="bar-2" fill="currentColor" x="2" y="7" width="11" height="2"></rect>
              <rect id="bar-3" fill="currentColor" x="2" y="11" width="11" height="2"></rect>
          </g>
      </svg>
    </span>

    <div v-if="visible" class="navHamburger__dropdown">
      <router-link v-for="link in links"
                   :key="link.path"
                   :to="link.path"
                   class="navHamburger__item"
      >
        <span class="navHamburger__text">{{ link.title }}</span>
        <span v-if="link.desc" class="navHamburger__desc">{{ link.desc }}</span>
      </router-link>
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
    links () {
      const paths = [
        '/bio/',
        '/blog/',
        '/products/',
        '/projects/',
        '/work/',
        '/archive/',
        '/sitemap/',
      ]
      return paths.map(path => this.$site.pages.find(page => page.path === path))
        .map(page => {
          return {
            path: page.path,
            title: getValue(page, 'frontmatter.breadcrumb') || getValue(page, 'frontmatter.shortTitle') || page.title,
            desc: getValue(page, 'frontmatter.description'),
          }
        })
    },
  },

  methods: {
    onMouseDown (event) {
      if (!this.$el.contains(event.target)) {
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.navHamburger {
  position: relative;
  margin-right: .5rem;

  &__button {
    cursor: pointer;
    color: $grey-light;
    &:hover {
      color: $accentColor;
    }
  }

  &__dropdown {
    position: absolute;
    top: -10px;
    left: -10px;
    background: white;
    padding: .5rem;
    outline: 1px solid $grey-lightest;
    border-radius: 2px;
    @include shadow-thumb;
    z-index: 100;
  }

  &__item {
    display: block;
    white-space: nowrap;
    padding: .5rem !important;
    margin: 0 0 .5rem;
    border-radius: 3px;

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
