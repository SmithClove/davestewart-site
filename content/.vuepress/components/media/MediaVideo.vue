<template>
  <div v-if="url" class="mediaVideo">
    <iframe
        :src="url"
        :style="mediaStyle"
        sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
        allowFullScreen/>
  </div>
</template>

<script>
import media from './index.js'

export default {
  extends: media('video'),

  computed: {
    url () {
      const src = this.source.src
      if (typeof src === 'string') {
        if (/vimeo/.test(src)) {
          return `${src}?title=0&amp;byline=0&amp;portrait=0&amp;color=000000`
        }
        if (/youtube|youtu.be/.test(src)) {
          return `${src}?rel=0&modestbranding=1&autohide=1&showinfo=0`
        }
        return src
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

.mediaVideo {
  margin-bottom: 1rem;
  font-size: 0;

  iframe {
    @include striped(#EEE, #FFF);
    width: 100%;
    border: 0;
  }
}
</style>
