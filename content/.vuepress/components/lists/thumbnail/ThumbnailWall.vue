<template>
  <div class="thumbnailWall">
    <masonry :cols="columns" gutter="20">
      <ThumbnailItem v-for="page in pages"
                     :key="page.key"
                     :page="page"
      />
    </masonry>
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
    }
  },

  computed: {
    columns () {
      if (this.cols > 2) {
        return {default: 3, 700: 2, 450: 1}
      }
      if (this.cols === 2) {
        return {default: 2, 450: 1}
      }
      return 1
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.thumbnailWall {

}
</style>
