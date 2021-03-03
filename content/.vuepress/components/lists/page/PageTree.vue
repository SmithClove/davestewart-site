<template>
  <div class="pageTree" :data-depth="depth">
    <div v-if="title" class="pageTree__header">
      <Heading :level="depth + 1" class="pageTree__title">
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
                :depth="depth + 1"
        />
    </div>

    <div v-if="pages.length" class="pageTree__pages">
      <PageList :pages="pages"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getValue } from '../../../utils/object.js'
import PageItem from './PageItem.vue'

const Heading = Vue.component('Heading', {
  functional: true,

  props: {
    level: Number,
    required: true,
  },

  render (h, ctx) {
    return h(`h${ctx.props.level}`, ctx.data, ctx.slots().default)
  }
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
      default: () => []
    },
    depth: {
      type: Number,
      default: 0,
    }
  },

  computed: {
    xdesc () {
      return this.page.desc || getValue(this.page, 'frontmatter.description')
    },

    folders () {
      return this.items.filter(item => item.type === 'folder')
    },

    pages () {
      return this.items.filter(item => item.type === 'page')
    },
  }
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.pageTree {
  margin-bottom: .5em;

  // HEADER

  &__header {
    margin: 1rem -1rem .5rem;
    padding: .5rem 1rem;
    border-bottom: 1px dashed $borderColor;
  }

  &__title {
    margin: 0;
    font-size: 1.3rem;
    a {
      color: black;
    }
  }

  &__desc {
    margin-top: .75em;
  }

  h2 {
    font-size: 1.8rem;
    a {
      color: $textColor;
    }
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
    margin: .5rem 2rem;
  }

  .pageList {
    margin-left: 0;
  }

  .pageItem {
    margin-bottom: .25em;
  }
}
</style>
