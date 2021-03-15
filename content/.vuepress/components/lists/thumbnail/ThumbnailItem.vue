<template>
  <article class="thumbnailItem boxy">

    <!-- image -->
    <div class="thumbnailItem__image">
      <router-link :to="page.path" draggable="false">
        <MediaImage :source="source"/>
      </router-link>
    </div>

    <!-- content -->
    <div class="thumbnailItem__content">
      <h3 class="thumbnailItem__title">
        {{ title }}
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
    title () {
      return this.page.frontmatter.shortTitle || this.page.title
    },

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
  margin-bottom: 20px;
  background: white;

  padding: 0;
  border-radius: 4px;
  overflow: hidden;

  @include shadow-md;

  // box-shadow: 0 8px 8px 3px rgba($grey-lightest, .4);

  @include md {
    box-shadow: 0 5px 6px rgba(59, 92, 143, 0.05);
  }

  a {
    display: block;
    font-size: 0;
    overflow: hidden;

    &:hover {
      img {
        transform: scale(1.07);
        transition-duration: .3s;
      }
    }
  }

  img {
    width: 100%;
    transition: all .6s cubic-bezier(0.180, 0.300, 0.125, 0.985);
    border-radius: 0;
  }

  &__content {
    padding: .85rem 1rem 1rem;
    min-height: 4.4rem;

    h3 {
      font-size: 1.2em;
      margin: 0 0 .5rem;
      line-height: 1.1; // 1.3 is more comfortable, but this allows cards to tile better
    }
  }

  p {
    margin: 0;
    line-height: 1.5;
    font-size: .8rem;
    opacity: .6;
  }

  @include sm {
    padding: 0 0 20px;
    margin-bottom: 20px;
    border: none;
    box-shadow: none;

    &:not(:last-child) {
      border-bottom: 1px dashed $borderColor;
    }

    img {
      border-radius: 4px;
    }

    &__content {
      min-height: unset;
      padding-left: .25rem;
      padding-right: .25rem;

      h3 {
        font-size: 1.5em;
        margin: 0 -.5rem .5rem 0
      }
    }
  }

}

.thumbnailItem.shadow {
  box-shadow:
      0 0px 4px rgba(0, 0, 30, .04),
      0 5px 8px rgba(0, 0, 60, 0.02),
      0 10px 16px -10px rgba(30, 0, 50, 0.02),
      0 25px 18px -15px rgba(20, 20, 80, .04);
}

</style>
