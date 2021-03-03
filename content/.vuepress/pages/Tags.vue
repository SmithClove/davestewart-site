<template>
  <SiteWrapper layout="tags" class="tagIndex">
    <h1>{{ tag ? `Posts for tag “${tag}”` : 'All tags' }}</h1>
    <p class="description">Browse pages by tag</p>

    <div class="tagIndex__columns">
      <div class="tagIndex__tags">
        <TagList :tags="$store.tags" :selected="tag"/>
      </div>
      <div class="tagIndex__pages">
        <ThumbnailWall v-if="filtered.length"
                       :pages="filtered"
                       :cols="2"
        />
        <p v-else>Choose a tag from the list on the left</p>
      </div>
    </div>
  </SiteWrapper>
</template>

<script>
import { fm } from '../utils/app.js'

export default {
  computed: {
    tag () {
      return this.$route.params.name
    },

    filtered () {
      return this.$store.pages.filter(page => {
        return fm(page, 'tags', []).includes(this.tag)
      })
    },
  },
}
</script>

<style lang="scss">
.tagIndex {
  &__columns {
    margin-top: 2rem;
    display: flex;
  }

  &__tags {
    flex: 1;
    width: 25%;
    margin-right: 20px;
    text-align: right;
  }

  &__pages {
    flex: 3;
    width: 75%;

    p {
      margin: 0;
    }
  }

  .tagList__tag {
    display: inline-block;
    margin: .1em 0;
  }
}
</style>
