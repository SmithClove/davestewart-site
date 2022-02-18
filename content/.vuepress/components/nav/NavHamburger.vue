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
      <p v-for="link in links" :key="link.path" class="navHamburger__item" :class="isDivider(link.path) ? 'divider' : ''">
        <router-link class="navHamburger__link" :to="link.path" :title="link.desc">{{ link.title }}</router-link>
        <span v-if="link.desc" class="navHamburger__desc">{{ link.desc }}</span>
      </p>
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
    isDivider (path) {
      return ['/blog/', '/sitemap/'].includes(path)
    },

    onMouseDown (event) {
      if (event.target.tagName.toLowerCase() !== 'a') {
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
    padding: .5rem .25rem;
    outline: 1px solid $grey-lightest;
    border-radius: 2px;
    @include shadow-thumb;
    z-index: 100;
  }

  &__item {
    white-space: nowrap;
    padding: .25rem;
    //font-size: 1.2em;
    margin-bottom: .5rem;

    &.divider {
      //border-top: 1px solid $grey-lightest;
      //margin-top: .25rem;
      //padding-top: .5rem;
    }
  }

  &__link {
    display: block;
    font: $titleFont;
    font-weight: 700;
  }

  &__desc {
    font-size: .75em;
    color: $grey-light;
    padding-left: 6px;
  }

  a.router-link-exact-active {
    color: $grey-light;
    cursor: default;
    pointer-events: none;
  }
}

</style>
