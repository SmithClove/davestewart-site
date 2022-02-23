<template>
  <div class="codepen"
     :data-height="height"
     :data-slug-hash="hash"
     data-user="davestewart"
     data-theme-id="light"
     data-default-tab="result"
     :style="`height: ${height}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;`"
  >
    <span>
      See the Pen <a :href="`https://codepen.io/davestewart/pen/${hash}`"> {{ title }}</a>
      by Dave Stewart (<a href="https://codepen.io/davestewart">@davestewart</a>)
      on <a href="https://codepen.io">CodePen</a>.
    </span>
  </div>
</template>

<script>
import { embed } from './embed.js'
export default {
  extends: embed('https://cpwebassets.codepen.io/assets/embed/ei.js'),

  props: {
    hash: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    height: {
      type: [String, Number],
      required: true
    }
  },
}
</script>

<style>
.cp_embed_wrapper {
  margin: 2rem auto;
}
</style>
