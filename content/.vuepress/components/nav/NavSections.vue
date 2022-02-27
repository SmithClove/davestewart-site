<template>
  <nav class="navSections">
    <div v-for="section in sections" :key="section.name" class="navSections__section">
      <div v-if="headers" class="navSections__header">{{ section.name }}</div>
      <router-link v-for="link in section.links"
                   :key="link.path"
                   :to="link.path"
                   class="navSections__item"
                   @click.native="$emit('click')"
      >
        <span class="navSections__text">{{ link.title }}</span>
        <span v-if="link.desc" class="navSections__desc">{{ link.desc }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { getValue } from '../../utils/object.js'

export default {
  props: {
    headers: {
      type: Boolean,
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
        section('Ideation', [
          '/',
          '/bio/',
          '/blog/',
        ]),
        section('Creation', [
          '/products/',
          '/projects/',
          '/work/',
          '/archive/',
        ]),
        section('Navigation', [
          '/search/',
          '/sitemap/',
        ]),
      ]
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

.navSections {

  display: flex;
  width: 100%;

  @include md-up {
    &__sections {
      display: flex;
    }
  }

  @include sm {
    flex-direction: column;

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
      padding: 0 .5rem;
      width: 33.33%;
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
