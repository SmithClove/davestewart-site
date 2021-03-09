<template>
  <div class="layout__search">
    <h1 class="search__title">
      <div>
        <span>Search</span>
        <span v-if="searchTitle">: <span class="accent">{{ searchTitle }}</span></span>
      </div>
      <span class="search__clear"
         :class="{ active: canReset }"
         @click.prevent="reset">&times;</span>
    </h1>

    <p class="description" style="display: flex">
      <span>{{ pageDescription }}</span>
    </p>

    <GlobalEvents
        @keydown.capture="onKeyDown"
        @keyup.esc="onEscape"
    />

    <div>

      <UiControls class="searchControls">
        <div class="searchControls__text">
          <UiInput v-model="query.text"
                   placeholder="Type to filter...."
          />
        </div>

        <div class="searchControls__tags">
          <UiRadio name="filter"
                   label="Tags"
                   :count="query.tags.length ? query.tags.length : ''"
                   :countState="options.showTags ? 0 : 1"
                   :options="options.filter"
                   v-model="query.filter"
          />
        </div>

        <div class="searchControls__sort">
          <UiRadio
              name="sort"
              :options="options.sort"
              v-model="query.sort"
          />
        </div>

        <div class="searchControls__view">
          <UiRadio
              name="view"
              :options="options.view"
              v-model="query.view"
          />
        </div>

        <!--
        <div class="searchControls__reset" v-if="canReset">
          <a href="/search/"
                  class="btn btn-clear"
                  @click.prevent="reset">Clear
          </a>
        </div>
        -->

      </UiControls>

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
          <div v-for="group in itemsByYear" class="pageTree" :data-mode="query.view">
            <div class="pageTree__header">
              <a :name="group.title"></a>
              <h2 class="pageTree__title">{{ group.title }}</h2>
            </div>
            <div class="pageTree__pages">
              <ThumbnailWall v-if="query.view === 'image'" :pages="group.items"/>
              <PageList v-else :pages="group.items"/>
            </div>
          </div>
        </div>

        <!-- by folder -->
        <div v-else-if="query.sort === 'path'" class="search__tree">
          <PageTree :mode="query.view" :items="itemsAsTree"/>
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
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
import { getElements, getNavigation, isInput, isChar, navigateLinks, stopEvent, getKeyChar } from '../utils/dom.js';
import { groupBy, sortBy } from '../utils/array.js'
import { clone } from '../utils/object.js'
import { fm } from '../utils/app.js'
import { makeTree } from '../store/tree.js'
import { storage } from '../utils/storage.js'
import { plural } from '../utils/string.js'

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

    filter: 'hide',
    sort: 'date',
    view: 'text',

    path: '',
    year: '',
  }
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

    // return all settings
    return {
      query,
      options: {
        filter: ['hide', 'list', 'groups'],
        sort: ['date', 'path'],
        view: ['text', 'image'],
        showTags: query.filter !== 'hide',
      },
    }
  },

  computed: {
    prepared () {
      // properties
      let items = this.$store.pages

      // skip bio and blog
      const rxFilter = new RegExp('^/(blog|bio)/')
      items = items.filter(item => !rxFilter.test(item.regularPath))

      // sort by date
      items = items.sort(sortBy('frontmatter.date', 'desc'))

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

    itemsByYear () {
      return groupBy(this.filtered, 'frontmatter.date', date => date && date.substr(0, 4))
    },

    itemsAsList () {
      return this.filtered.filter(item => !!item.headers)
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

      // variables
      const pages = makeTree(this.prepared)
      const root = { pages: clone(pages) }

      // filtering callbacks
      const { text, tags } = this.query
      const filterText = makeTextFilter(text)
      const filterTags = makeTagsFilter(tags)

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
      }
      if (tags.length) {
        parts.push(tags.join(' + '))
      }
      return parts.join(' & ')
    },

    pageDescription () {
      return this.isFiltered
          ? 'All items'
          : plural(this.itemsAsList.length, 'item')
    },
  },

  watch: {
    query: {
      handler: 'onQueryChange',
      deep: true,
    },

    'query.filter' (value) {
      const showTags = value !== 'hide'
      this.options.showTags = showTags
      if (!showTags) {
        // this.query.tags = []
      }
    },
  },

  mounted () {
    // assign saved data
    const saved = storage.get('search', {})
    Object.assign(this.query, saved)

    // grab data from query
    const query = this.query

    // title
    document.title = 'Search | Dave Stewart'
    this.$watch('searchTitle', function (value) {
      document.title = `Search${value ? ' ' + value : ''} | Dave Stewart`
    })

    // focus search
    this.focus()

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
        view: this.query.view,
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
      const input = document.querySelector('input')
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

  &__clear {
    color: $grey-lightest;
    text-decoration: none;
    cursor: default;
    padding: 0 .8rem;
    font-weight: 400;
    &.active {
      color: black;
      cursor: pointer;
      &:hover {
        color: $accentColor;
      }
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
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

  @include md {
    &__text {
      input {
        width: 100px;
      }
    }
  }

  @include sm {
    &__tags {
      display: none !important;
    }

    .uiRadio__label {
      display: none !important;
    }
  }
}

</style>
