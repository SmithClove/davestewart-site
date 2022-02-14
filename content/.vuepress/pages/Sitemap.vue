<template>

</template>

<script>
import { makeTree } from '../store/services/tree.js'

export default {
  computed: {
    tree () {
      return makeTree(this.$pages)
    }
  }
}
</script>

<style scoped>

</style>
