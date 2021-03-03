<template>
  <article class="thumbnailItem">

    <!-- image -->
    <div class="thumbnailItem__image">
      <router-link :to="page.path">
        <MediaImage :source="source" />
      </router-link>
    </div>

    <!-- content -->
    <div class="thumbnailItem__content">
      <h3 class="thumbnailItem__title">
        {{ page.title }}
      </h3>
      <p v-if="description">{{ description }}</p>
    </div>

  </article>
</template>

<script>
import media from '../../media'

export default {
  extends: media('thumbnail'),

  props: {
    page: Object,
  },

  computed: {
    description () {
      return this.page.frontmatter.description
    },
  },
}
</script>

<style lang="scss">
@import '../../../styles/variables';

.thumbnailItem {
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
  padding: 1rem;
  border: 1px dashed $borderColor;
  border-radius: 2px;
  margin-bottom: 20px;
  // transition: .6s border-color, .6s box-shadow, .6s transform;
  // box-shadow: 0 2px 6px rgba(0, 0, 0, .1);

  &__content {
    padding: 0 .1rem;
  }

  a {
    display: block;
    font-size: 0;
  }

  img {
    width: 100%;
  }

  &__title {
    margin: .75rem 0 .5rem;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    line-height: 1.5;
    font-size: .8rem;
    opacity: .6;
  }

  @media screen and (max-width: 400px) {
    padding: 0 0 20px;
    margin-bottom: 20px;
    border: none;
    &:not(:last-child) {
      border-bottom: 1px dashed $borderColor;
    }

    &__title {
      font-size: 1.6em;
    }
  }

}
</style>
