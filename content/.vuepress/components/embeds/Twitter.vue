<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { embed } from './embed.js'

export default {
  extends: embed('https://platform.twitter.com/widgets.js'),
}
</script>

<style>
.twitter-tweet {
  display: block;
  margin: 2rem auto !important;
}
</style>
