<template>
  <div class="pageTree"
       :data-format="format"
       :data-depth="depth"
       :data-pages="pages.length"
       :data-folders="folders.length"
  >
    <div v-if="title" class="pageTree__header">
      <Heading :level="depth + 1" class="pageTree__title">
        <a :name="id"></a>
        <router-link :to="path">{{ title }}</router-link>
      </Heading>
      <span v-if="desc" class="pageTree__desc">{{ desc }}</span>
    </div>

    <div v-if="folders.length" class="pageTree__folders">
      <PageTree v-for="page in folders"
                :title="page.title"
                :path="page.path"
                :desc="page.desc"
                :items="page.pages"
                :format="format"
                :depth="depth + 1"
      />
    </div>

    <div v-if="pages.length" class="pageTree__pages">
      <ThumbnailWall v-if="format === 'image'" :pages="pages"/>
      <PageList v-else :pages="pages"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getValue } from '../../../utils/object.js'
import { slugify } from '../../../utils/string.js'
import PageItem from './PageItem.vue'

const Heading = Vue.component('Heading', {
  functional: true,

  props: {
    level: {
      type: Number,
      required: true,
    },
  },

  render (h, ctx) {
    return h(`h${ctx.props.level}`, ctx.data, ctx.slots().default)
  },
})

export default {
  name: 'PageTree',

  components: {
    PageItem,
    Heading,
  },

  props: {
    title: String,
    path: String,
    desc: String,
    items: {
      type: Array,
      default: () => [],
    },
    format: {
      type: String,
      default: 'image',
      validator: value => ['image', 'text'].includes(value)
    },
    depth: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    id () {
      return slugify(this.path.replace(this.$page.path, ''))
    },

    xdesc () {
      return this.page.desc || getValue(this.page, 'frontmatter.description')
    },

    folders () {
      return this.items.filter(item => item.type === 'folder')
    },

    pages () {
      return this.items.filter(item => item.type === 'page')
    },
  },
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.pageTree {
  margin-bottom: .5em;

  // HEADER

  &__header {
    //margin: 1rem -1rem .5rem;
    //padding: .5rem 1rem;
    //border-bottom: 1px dashed $borderColor;
    margin: .5rem 0;
    padding: .5rem 0;
  }

  &__title {
    margin: 0;
    font-size: 1.3rem;

    a {
      color: $textColor !important;
    }
  }

  &__desc {
    margin-top: .75em;
  }

  h2 {
    font-size: 1.8rem;
  }

  &__desc {
    display: block;
    font-size: .8em;
    color: #888888;
  }

  // ITEMS

  &__folders {
    margin-left: 2rem;
  }

  &[data-depth="0"] > &__folders {
    margin-left: 0;
  }

  &__pages {
    margin: .5rem 0 0 2rem;
  }

  &[data-format="image"] &__pages,
  &[data-format="image"] &__folders {
    margin-left: 0;
  }

  // for thumbnails, only indent the first level
  &[data-format="image"][data-depth="1"] {
    > .pageTree__folders,
    > .pageTree__pages {
      margin-left: 2rem;
    }
  }

  .pageList {
    margin-left: 0;
  }

  .pageItem {
    margin-bottom: .25em;
  }

  @include sm {
    &[data-format="image"] {
      .pageTree__folders,
      .pageTree__pages {
        margin-left: 0 !important;
      }
    }
  }

}
</style>
