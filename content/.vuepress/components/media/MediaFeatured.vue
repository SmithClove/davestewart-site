<template>
  <div class="mediaFeatured">
    <MediaImage :source="source" class="mediaFeatured__image"/>
    <div v-if="source.text" class="mediaFeatured__text">
      {{ source.text }}
    </div>
  </div>
</template>

<script>
import media from './index.js'
import MediaImage from './MediaImage.js'

export default {
  extends: media('featured'),

  components: {
    MediaImage,
  },
}
</script>

<style lang="scss">
.mediaFeatured {
  width: 100%;
  font-size: 0;
  margin-bottom: 3rem;

  &__image {
    width: 100% !important;
  }

  &__text {
    padding: 1rem;
    text-align: center;
    font-size: 1rem;
  }
}

</style>
