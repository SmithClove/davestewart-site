<template>

</template>

<script>
import { makeTree } from '../store/services/tree.js'
import { isVisible } from '../store/config/status'

export default {
  computed: {
    tree () {
      return makeTree(this.$pages.filter(isVisible))
    }
  }
}
</script>

<style scoped>

</style>
