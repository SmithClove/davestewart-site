<template>
  <div class="thumbnailWall">
    <VueMasonry :cols="columns" gutter="20">
      <div v-for="page in pages" :key="page.regularPath">
        <ThumbnailItem :page="page"/>
      </div>
    </VueMasonry>
  </div>
</template>

<script>
import ThumbnailItem from './ThumbnailItem.vue'

export default {
  components: {
    ThumbnailItem,
  },

  props: {
    pages: Array,

    cols: {
      type: Number,
      default: 3,
    },
  },

  computed: {
    columns () {
      if (this.cols > 2) {
        return { default: 3, 740: 2, 430: 1 }
      }
      if (this.cols === 2) {
        return { default: 2, 430: 1 }
      }
      return 1
    },
  },

  mounted () {
    // fix bug in vue masonry css
    this.$el.querySelectorAll('.thumbnailItem .thumbnailItem').forEach(e => {
      const remove = e.parentNode
      const parent = e.parentNode.parentNode
      parent.appendChild(e)
      parent.removeChild(remove)
    })
  }
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.thumbnailWall {
  margin-top: 1rem;
}
</style>
