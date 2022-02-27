<template>
  <nav class="navSite">

    <!-- button -->
    <div class="navSite__button" @click="visible = !visible">
      <svg width="15px" height="14px" viewBox="0 0 15 14">
        <rect id="bar-1" fill="currentColor" x="2" y="3" width="11" height="2"></rect>
        <rect id="bar-2" fill="currentColor" x="2" y="7" width="11" height="2"></rect>
        <rect id="bar-3" fill="currentColor" x="2" y="11" width="11" height="2"></rect>
      </svg>
    </div>

    <!-- background -->
    <div v-if="visible" class="navSite__background" @mousedown="hide"></div>

    <!-- dropdown -->
    <div ref="dropdown" v-if="visible" class="navSite__dropdown">
      <div class="navSite__sections">
        <div v-for="section in sections" :key="section.name" class="navSite__section">
          <div class="navSite__header">{{ section.name }}</div>
          <router-link v-for="link in section.links"
                       :key="link.path"
                       :to="link.path"
                       class="navSite__item"
                       @click.native="hide"
          >
            <span class="navSite__text">{{ link.title }}</span>
            <span v-if="link.desc" class="navSite__desc">{{ link.desc }}</span>
          </router-link>
        </div>
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
        section('Portfolio', [
          '/products/',
          '/projects/',
          '/work/',
          '/archive/',
        ]),
        section('Site', [
          '/search/',
          '/sitemap/',
        ]),
      ]
    },
  },

  methods: {
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.navSite {
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

  // ---------------------------------------------------------------------------------------------------------------------
  // dropdown
  // ---------------------------------------------------------------------------------------------------------------------

  &__background {
    @include fit;
    position: fixed;
    background: #FFFD;
  }

  &__dropdown {
    box-sizing: border-box;
    position: fixed;
    background: white;
    outline: 1px solid $grey-lightest;
    border-radius: 2px;
    z-index: 100;

    @include shadow-lg;

    @include sm {
      padding: .5rem;
      width: calc(100% - 20px);
      font-size: 1.3em;
      top: 10px;
      left: 10px;
    }

    @include md-up {
      position: absolute;
      max-width: calc(100% - 20px);
      padding: 1rem .25rem;
      top: 40px;
      left: 10px;
      height: auto;
      font-size: 1.15em;
    }

    @include full {
      left: -10px;
    }
  }

  @include md-up {
    &__sections {
      display: flex;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // sections
  // ---------------------------------------------------------------------------------------------------------------------

  @include sm {
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
  }

  @include md-up {
    &__section {
      border-right: 1px dashed $grey-lightest;
      padding: 0 .5rem;
      width: max-content;

      &:last-child {
        border: none;
      }
    }
  }

  &__header {
    padding: .5rem;
    font-weight: bold;
    margin-bottom: .5rem;
    font-size: .9em;

    @include sm {
      display: none;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // items
  // ---------------------------------------------------------------------------------------------------------------------

  &__item {
    display: block;
    padding: .5rem !important;
    margin: 0 0 .5rem;
    border-radius: 3px;

    @media screen and (max-height: 600px) {
      margin: 0;
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

  a.router-link-exact-active[href="/"] *,
  a.router-link-active:not([href="/"]) * {
    color: $grey-light;
  }

  a span {
    margin: 0;
  }
}

</style>
