<template>
  <div class="layout__search">

    <GlobalEvents
        @keydown.capture="onKeyDown"
        @keyup.esc="onEscape"
    />

    <client-only>
      <h1 class="search__title">
        <span>Search</span>
        <span v-if="searchTitle">: <span class="accent">{{ searchTitle }}</span></span>
      </h1>

      <!-- description -->
      <p class="description" style="display: flex">
        <span>{{ pageDescription }}</span>
      </p>

      <!-- parameters -->
      <div class="search__parameters">

        <!-- clear -->
        <button class="search__clear"
                :class="{ active: canReset }"
                @click.prevent="reset">
          <span>&times;</span>
        </button>

        <div class="searchControls">
          <UiControls class="only-sm">
            <!-- search input -->
            <div class="searchControls__text">
              <UiInput v-model="query.text"
                       placeholder="Type to filter..."
              />
            </div>
          </UiControls>

          <!-- controls -->
          <UiControls>

            <!-- search input -->
            <div class="searchControls__text only-md-up">
              <UiInput v-model="query.text"
                       placeholder="Type to filter..."
              />
            </div>

            <!-- tags -->
            <div class="searchControls__tags">
              <UiRadio name="filter"
                       label="Tags"
                       :count="query.tags.length ? query.tags.length : ''"
                       :countState="options.showTags ? 0 : 1"
                       :options="options.filter"
                       v-model="query.filter"
              />
            </div>

            <!-- sorting -->
            <div class="searchControls__sort">
              <UiRadio
                name="sort"
                :options="options.sort"
                v-model="query.sort"
              />
            </div>

            <!-- format -->
            <div class="searchControls__format">
              <UiRadio
                name="format"
                :options="options.format"
                v-model="query.format"
              />
            </div>

          </UiControls>
        </div>


        <!-- tags -->
        <SlideUpDown ref="tagsContainer"
                     :active="options.showTags"
                     :duration="400"

        >
          <TagMatrix class="search__tags"
                     :mode="query.filter"
                     :selected="query.tags"
                     :pages="filtered"
                     @toggle="toggleTag"
                     @click="setTag"/>
        </SlideUpDown>
      </div>

      <div class="layout__folder">

        <div v-if="itemsAsList.length" class="search__results">

          <!-- by date -->
          <div v-if="query.sort === 'date'" class="search__date">
            <div v-for="group in itemsByYear" class="pageTree" :data-mode="query.format">
              <div class="pageTree__header">
                <a :name="group.title"></a>
                <h2 class="pageTree__title">{{ group.title }}</h2>
              </div>
              <div class="pageTree__pages">
                <ThumbnailWall v-if="query.format === 'image'" :pages="group.items"/>
                <PageList v-else :pages="group.items"/>
              </div>
            </div>
          </div>

          <!-- by folder -->
          <div v-else-if="query.sort === 'path'" class="search__tree">
            <PageTree :format="query.format" :items="itemsAsTree"/>
          </div>

          <!-- thumbnails -->
          <div v-else-if="query.sort === 'thumbs'" class="search__list">
            <ThumbnailWall :pages="itemsAsList"/>
          </div>

        </div>

        <div v-else class="search__noResults">
          <p>No results for those search parameters!</p>
        </div>

      </div>
    </client-only>
    <!-- header -->
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
import { getNavigation, isChar, isInput, navigateLinks, stopEvent } from '../utils/events.js'
import { isClient, isDesktop, isMobile } from '../utils/env.js'
import { groupBy, sortBy } from '../utils/array.js'
import { getElements} from '../utils/dom.js';
import { isVisible } from '../store/config/status'
import { makeTree } from '../store/services/tree.js'
import { storage } from '../utils/storage.js'
import { plural } from '../utils/string.js'
import { clone } from '../utils/object.js'
import { fm } from '../utils/app.js'

function makeTextFilter (text, useOr = true) {
  text = text.trim()
  if (text === '') {
    return () => true
  }
  const matches = text.toLowerCase().match(/\S+/g) || []
  const predicates = matches.map(text => {
    return text.startsWith('/')
        ? page => page.regularPath && page.regularPath.includes(text)
        : page => ((page.title || '') + (page.frontmatter && page.frontmatter.description || '')).toLowerCase().includes(text)
  })
  return useOr
      ? page => predicates.some(fn => fn(page))
      : page => predicates.every(fn => fn(page))
}

function makeTagsFilter (tags, useOr = false) {
  const orQuery = page => fm(page, 'tags', []).some(tag => tags.includes(tag))
  const andQuery = page => {
    const pageTags = fm(page, 'tags', [])
    return tags.every(tag => pageTags.includes(tag))
  }
  return useOr
      ? orQuery
      : andQuery
}

function makeQuery () {
  return {
    text: '',
    textOp: 'and',

    tags: [],
    tagsOp: 'and',

    filter: 'off',
    sort: 'date',
    format: 'text',

    path: '',
    year: '',
  }
}

const paths = {
  searchable: [
    '/archive/',
    '/products/',
    '/projects/',
    '/work/',
    '/blog/',
  ]
}

export default {
  components: {
    SlideUpDown,
  },

  data () {
    // variables
    const route = this.$route
    const tags = route.query.tags || []

    // build query from current route
    const query = {
      ...makeQuery(),
      ...route.query,
      tags: Array.isArray(tags)
          ? tags
          : [tags],
    }

    // load only if on client
    if (isClient()) {
      const storage = require('../utils/storage.js').storage
      const saved = storage.get('search', {})
      Object.assign(query, saved)
    }

    // return all settings
    return {
      query,
      options: {
        filter: ['off', 'list', 'groups'],
        sort: ['date', 'path'],
        format: ['text', 'image'],
        showTags: query.filter !== 'off',
      },
    }
  },

  computed: {
    prepared () {
      // properties
      let items = this.$store.pages.filter(isVisible)

      // filter folders
      items = items.filter(item => {
        const regularPath = item.regularPath
        return regularPath === '/' || paths.searchable.some(path => regularPath.startsWith(path))
      })

      // sort by date
      items = items.sort(sortBy('date', 'desc'))

      // return
      return items
    },

    filtered () {
      // properties
      let items = this.prepared
      let { text, tags } = this.query

      // filter tags
      if (tags.length) {
        items = items.filter(makeTagsFilter(tags))
      }

      // text
      if (text) {
        items = items.filter(makeTextFilter(text))
      }

      // return
      return items
    },

    itemsAsList () {
      return this.filtered.filter(item => item.type === 'post')
    },

    itemsByYear () {
      const items = this.itemsAsList.filter(item => item.regularPath !== '/')
      return groupBy(items, 'date', date => date && date.substr(0, 4))
    },

    itemsAsTree () {

      function walk (page, callback, parent) {
        const pages = page.pages
        if (Array.isArray(pages)) {
          for (let i = pages.length - 1; i >= 0; i--) {
            const child = pages[i]
            walk(child, callback, page)
            callback(child, page, i)
          }
        }
      }

      // filtering callbacks
      const { text, tags } = this.query
      const filterText = makeTextFilter(text)
      const filterTags = makeTagsFilter(tags)

      // variables
      const pages = makeTree(this.prepared)
      const root = { pages: clone(pages) }

      // filter tree
      walk(root, function (page, parent, index) {
        // does this page contain the text
        const result = filterText(page) && filterTags(page)

        // if not, delete it
        if (!result) {
          if (!page.pages || page.pages.length === 0) {
            parent.pages.splice(index, 1)
          }
        }
      })

      // finally, return
      return root.pages
    },

    isFiltered () {
      return this.prepared.length === this.filtered.length
    },

    canReset () {
      const query = makeQuery()
      return this.query.text !== query.text
          || this.query.tags.length > 0
          // || this.query.filter !== query.filter
    },

    searchTitle () {
      const { text, tags } = this.query
      const parts = []
      if (text) {
        parts.push(text)
        // parts.push(text.match(/\w+/g).join(', '))
      }
      if (tags.length) {
        parts.push(tags.join(' + '))
      }
      return parts.join(' & ')
    },

    pageDescription () {
      return this.isFiltered
          ? 'Everything on the site'
          : plural(this.itemsAsList.length, 'item')
    },
  },

  watch: {
    query: {
      handler: 'onQueryChange',
      deep: true,
    },

    'query.filter' (value) {
      const showTags = value !== 'off'
      this.options.showTags = showTags
      if (!showTags) {
        // this.query.tags = []
      }
    },
  },

  mounted () {
    // grab data from query
    const query = this.query

    // title
    document.title = 'Search | Dave Stewart'
    this.$watch('searchTitle', function (value) {
      document.title = `Search${value ? ' ' + value : ''} | Dave Stewart`
    })

    // focus search
    if (!isMobile() && !this.canReset) {
      this.$nextTick(() => {
        this.focus()
      })
    }

    // scroll
    if (query.year) {
      this.query.sort = 'date'
      this.scrollTo(query.year)
    }

    if (query.path) {
      this.query.sort = 'path'
      this.scrollTo(query.path)
    }
  },

  methods: {
    // ---------------------------------------------------------------------------------------------------------------------
    // query
    // ---------------------------------------------------------------------------------------------------------------------

    onQueryChange (value) {
      // get original query
      const defaults = makeQuery()

      // build a new query that is only the changed properties
      const query = Object.keys(value).reduce((query, key) => {
        const d = defaults[key]
        const v = value[key]
        if (String(v) !== String(d)) {
          query[key] = v
        }
        return query
      }, {})

      // update router
      this.$router
          .replace({ path: '/search/', query })
          .catch(() => {})

      // save preferences
      storage.set('search', {
        filter: this.query.filter,
        sort: this.query.sort,
        format: this.query.format,
      })
    },

    reset () {
      const query = makeQuery()
      this.query.text = query.text
      this.query.tags = query.tags
      this.query.filter = query.filter
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // tags
    // ---------------------------------------------------------------------------------------------------------------------

    toggleTag (href, tag) {
      const index = this.query.tags.indexOf(tag)
      if (index === -1) {
        this.query.tags = [...this.query.tags, tag]
      }
      else {
        this.query.tags.splice(index, 1)
      }
    },

    setTag (href, tag) {
      this.query.tags = tag !== this.query.tags[0]
          ? [tag]
          : []
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // navigation
    // ---------------------------------------------------------------------------------------------------------------------

    focus () {
      const input = document.querySelector('.searchControls__text.only-md-up input')
      if (input) {
        input.focus()
      }
    },

    scrollTo (anchor) {
      setTimeout(() => {
        const element = document.querySelector(`a[name="${anchor}"]`)
        if (element) {
          const offset = document.querySelector('.siteHeader').offsetHeight
          const top = element.offsetTop - offset + 20
          window.scroll({ top, behavior: 'smooth' })
        }
      }, 600)
    },

    // ---------------------------------------------------------------------------------------------------------------------
    // keyboard
    // ---------------------------------------------------------------------------------------------------------------------

    onEscape (event) {
      if (isInput(event) && this.query.text) {
        this.query.text = ''
        return
      }
      if (this.canReset) {
        this.focus()
        this.reset()
        return
      }
      history.back()
    },

    onKeyDown (event) {
      // don't detect keystrokes on mobile because on a small screen,
      // it's weird when things start scrolling
      if (isMobile()) {
        return
      }

      // variables
      const isLink = event.target.tagName === 'A'
      const { enter, down, x, y } = getNavigation(event)

      // elements
      const target = event.target
      const controls = getElements('.searchControls a[href]')
      const pages = getElements('.search__results .pageItem a[href]')
      const tags = getElements('.search__tags a[href]')

      // helper functions
      const focusPage = (navigate) => {
        const page = pages[0]
        if (page) {
          page.focus()
          if (navigate) {
            setTimeout(() => page.click(), 150)
          }
        }
      }

      // text field
      if (isInput(event)) {
        // enter or down
        if (enter || down) {
          stopEvent(event)
          return focusPage(enter)
        }
      }

      // ignore enter on links
      if (isLink && enter) {
        return
      }

      // is a focused link
      else if (isLink && (x || y)) {
        if (pages.includes(target)) {
          return navigateLinks(event, pages, this, this, 'y')
        }
        else if (controls.includes(target)) {
          return navigateLinks(event, controls, this, this.options.showTags ? tags[0] : pages[0], 'x')
        }
        else if (tags.includes(target)) {
          return navigateLinks(event, tags, controls[0], pages[0], 'x')
        }
      }

      // any other typing
      if (isChar(event)) {
        this.focus()
      }
    },
  },
}
</script>

<style lang="scss">
@import "../styles/variables";

.search {

  .layout__folder {
    margin-top: 1rem;
  }

  &__title {
    padding-right: 3rem;
  }

  &__clear {
    position: absolute;
    top: 22px;
    right: 20px;
    padding: .6rem;
    font-size: 35px;
    line-height: 1rem;

    border: none;
    background: none;
    outline: none;
    font-family: $titleFont;

    color: $grey-lightest;
    text-decoration: none;
    cursor: default;
    font-weight: 400;
    user-select: none;

    span {
      height: 0;
      width: 0;
    }

    &.active {
      color: black;
      cursor: pointer;
      &:hover {
        color: $accentColor;
      }
    }
  }

  &__clear,
  &__parameters a {
    transition: .2s all;
  }

  &__tags {
    padding: 1rem 0 .5rem;
  }

  &__tree {
    // hide descriptions for empty thumbnail folders
    .pageTree[data-pages="0"] > .pageTree__header > .pageTree__desc {
      display: none;
    }
  }

  &__noResults {
    padding: 3rem;
    line-height: 1.6;
    text-align: center;
    font-family: $titleFont;
    font-size: 1.25rem;
    color: $grey-light;
  }

  .pageItem a:focus {
    outline: none;
    box-shadow: 0 0 0 2px $grey-lightest;
    border-radius: 2px;
  }
}

.searchControls {
  @include md-up {
    margin-left: -1rem;
  }

  &__text {

    @include sm {
      &,
      .uiInput {
          width: 100%;
      }
    }

    @include md-up {
      width: 150px;
    }
  }

  @include sm {
    .uiControls {
      flex-wrap: nowrap;
      margin: 0 -1rem .5rem;
    }
    .uiControls > * {
      padding: 5px;
    }
  }
}

</style>
