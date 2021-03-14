<template>
  <div v-if="component" class="pageHero">
    <component :is="component" scale />
  </div>
</template>

<script>
import MediaEmbed from '../media/MediaEmbed.vue'
import MediaVideo from '../media/MediaVideo.vue'
import MediaGallery from '../media/MediaGallery.vue'
import MediaFeatured from '../media/MediaFeatured.vue'
import { getSource } from '../../utils/media.js'

export default {
  props: {
    media: {
      type: String,
      default: 'gallery'
    }
  },

  computed: {
    // returns a object or string
    preferred () {
      const media = this.$fm('media')
      if (media) {
        const hero = this.$fm('hero')
        return media[hero] || media[this.media] || media.gallery || media.video || media.featured
      }
    },

    /**
     * Determines correct component to display based on
     * frontmatter.hero and content of frontmatter.media
     */
    component () {
      const source = this.preferred
      const media = getSource(source)
      if (media) {
        if (Array.isArray(source)) {
          return MediaGallery
        }
        if (media.type === 'image') {
          return MediaFeatured
        }
        if (media.type === 'embed') {
          return MediaEmbed
        }
        if (media.type === 'video') {
          return MediaVideo
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/_variables.scss";

.pageHero {
  margin-bottom: 3rem;
  @include sm {
    margin-bottom: 2rem;
  }
}
</style>
