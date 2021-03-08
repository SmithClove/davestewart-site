import Vue from 'vue'
import { storage } from '../utils/storage.js'

function makeQuery () {
  return {
    viewMode: 'date',

    text: '',
    textOp: 'and',

    tags: [],
    tagsOp: 'and',
    tagsMode: 'off',

    path: '',
    year: '',
  }
}

export function makeSearchData () {
  return new Vue({
    data () {
      // variables
      const route = this.$route
      const tags = route.query.tags

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
        settings: {
          showTags: !!tags,
          tagsMode: tags.length
            ? query.tagsMode || 'list'
            : 'off',
        },
        options: {
          viewMode: ['date', 'tree'],
          tagsMode: ['off', 'list', 'groups'],
        },
      }
    },

    watch: {
      query: {
        handler: 'onQueryChange',
        deep: true,
      },

      'query.tagsMode' (value) {
        const showTags = value !== 'off'
        this.settings.showTags = showTags
        if (showTags) {
          this.settings.tagsMode = value
        }
        if (!showTags) {
          this.query.tags = []
        }
      },
    },

    methods: {
      onQueryChange (value) {
        const defaults = makeQuery()
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
          viewMode: this.query.viewMode,
          tagsMode: this.query.tagsMode,
        })
      },

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

      clear () {
        this.query = makeQuery()
      },
    },
  })
}
