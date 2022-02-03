<template>
  <div v-if="show" class="previewInfo">
    <blockquote>
      <h2>This is a preview post!</h2>
      <p>That means I'm still working on it, and I'd love your feedback:</p>
      <ul>
        <li>does it read well?</li>
        <li>does the content make sense?</li>
        <li>could I have made any points better, or quicker?</li>
        <li>what would you change?</li>
      </ul>
      <p>Let me know via <a href="https://twitter.com/messages/compose?recipient_id=16294165">Twitter</a>.</p>
      <p>Thanks!</p>
      <p><SiteIcon class="accent"/></p>
    </blockquote>
  </div>
</template>

<script>
import { Status } from '../../store/status.js'
import { isProd } from '../../utils/config.js'
import SiteIcon from '../site/SiteIcon.vue'

export default {
  components: { SiteIcon },
  data () {
    return {
      show: false
    }
  },

  mounted () {
    if (isProd && this.$page.frontmatter.status === Status.PREVIEW) {
      this.show = true
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.previewInfo {

  h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    color: $accentColor;
  }

  p {
    margin: 1.25rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 1rem 1rem 0 2rem;
    line-height: 1.4rem;
  }

  li {
    list-style: square;
    margin-bottom: .25em;

    p {
      margin: 0;
    }
  }
}
</style>
