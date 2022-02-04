<template>
  <div class="searchTags" :data-mode="mode">

    <!-- list -->
    <div v-if="component === 'list'" class="searchTags__list">
      <TagList
               :tags="tags"
               :selected="selected"
               :valid="valid"
               @click="setTag"
               @toggle="toggleTag"
      />
    </div>

    <!-- groups -->
    <div v-if="component === 'groups'" class="searchTags__groups">
      <div v-for="group in groups" class="tagGroup">
        <label>{{ group.title }}:</label>
        <TagList :tags="group.tags"
                 :selected="selected"
                 :valid="valid"
                 @click="setTag"
                 @toggle="toggleTag"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { tagGroups } from '../../../store/config/tags.js'
import TagItem from './TagItem.vue'

const components = ['list', 'groups']

export default {
  components: {
    TagItem,
  },

  props: {
    mode: {
      type: String,
      default: 'list',
      validator (value) {
        return ['off', ...components].includes(value)
      },
    },

    selected: {
      type: Array,
      default () {
        return []
      },
    },

    pages: {
      type: Array,
      default () {
        return []
      },
    },
  },

  data () {
    return {
      component: 'list'
    }
  },

  computed: {
    tags () {
      return this.$store.tags
    },

    groups () {
      return tagGroups
    },

    valid () {
      return this.pages.reduce((output, page) => {
        const tags = page.frontmatter.tags
        if (tags && tags.length) {
          tags.forEach(tag => {
            if (!output.includes(tag)) {
              output.push(tag)
            }
          })
        }
        return output
      }, [])
    },
  },

  watch: {
    mode: {
      immediate: true,
      handler (value) {
        if (components.includes(value)) {
          this.component = value
        }
      }
    }
  },

  methods: {
    setTag (...args) {
      this.$emit('click', ...args)
    },

    toggleTag (...args) {
      this.$emit('toggle', ...args)
    },
  },
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.searchTags {
  > * {
    margin-left: 15px;
    border-left: 4px solid $grey-lightest;
    padding: 8px;
  }

  a {
    font-size: .8rem;
  }

  .tagList__tag {
    display: inline-block;
    margin: .1em .1em;
  }

  &__groups {
    padding-left: 15px;
  }

  .tagGroup {
    display: flex;
    font-size: 12px;

    label {
      align-items: center;
      display: flex;
      min-width: 70px;
      font-weight: 600;
    }

    .tagList {
      display: inline-block;
      padding: 0 0 0 .5rem;
    }
  }
}
</style>
