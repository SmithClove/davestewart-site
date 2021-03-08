<template>
  <div class="mediaEmbed">
    <iframe :src="source.src" :style="mediaStyle" @load="onLoad"/>
  </div>
</template>

<script>
import media from './index.js'

export default {
  extends: media('featured'),

  methods: {
    onLoad (event) {
      event.target.style.opacity = 1
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.mediaEmbed {
  display: flex;
  width: 100%;
  border: none;
  margin-bottom: 3rem;

  @include striped(#EEE, #FFF);

  iframe {
    overflow: hidden;
    transition: .5s opacity;
    opacity: 0;
  }
}

</style>
