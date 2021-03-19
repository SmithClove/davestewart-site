<template>
  <span class="shield">
    <a ref="link" :href="href" target="_blank" class="shield__link">
      <img ref="img"
           class="shield__image"
           :src="src"
           :alt="repo"
           :title="repo"
           @load="onLoad">
    </a>
  </span>
</template>

<script>
import { storage } from '../../utils/storage.js'

export default {
  props: {
    repo: String,
  },

  computed: {
    src () {
      return `https://img.shields.io/github/stars/${this.repo}?color=%23ea4848&label=Stars%3A&logo=github`
    },

    href () {
      return `https://github.com/${this.repo}#readme`
    },

    key () {
      return `badges/${this.repo}`
    }
  },

  mounted () {
    const width = storage.get(this.key)
    if (width) {
      this.$refs.link.style.width = width + 'px'
    }
  },

  methods: {
    onLoad () {
      const img = this.$refs.link
      img.style.width = ''
      this.$nextTick(() => {
        const width = img.offsetWidth
        storage.set(this.key, width)
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.shield {
  min-width: 80px;

  &__link {
    display: block;
    height: 20px;
    border-radius: 4px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAMAAABMHminAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDQyREQ5Rjk4MDY4MTFFQkFCMDlFNDE2ODQxNDYyMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDQyREQ5RkE4MDY4MTFFQkFCMDlFNDE2ODQxNDYyMTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNDJERDlGNzgwNjgxMUVCQUIwOUU0MTY4NDE0NjIxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNDJERDlGODgwNjgxMUVCQUIwOUU0MTY4NDE0NjIxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuCBNcoAAAHvUExURVNTU0ZGRkRERFFRUdU9P9c+QdA5POBGSN5ERkVFRU9PT9I7PUdHR9lAQ+JISvPz81JSUttCRFRUVElJSdpBRONJS9xDRUtLS1BQUOFHSU1NTUNDQ9g/Qk5OTtM8PkxMTEpKSt9FR+RJTNE6PNY+QEhISM84O93d3enp6V1dXcbGxsfHx1ZWVm1tbTg4OISEhP7+/t7e3lxcXLCwsDc3N4+Pj4qKijY2Nj4+PltbWzw8PJKSkmRkZObm5srKylVVVfn5+Z2dna6uru7u7tjY2HV1dbu7u25uboeHh3x8fIiIiHJycss4O2BgYDk5OaOjo6+vr5GRkeBJS56enuvr6zo6OldXV29vb2VlZcnIyVlZWfX19bOys////2FhYejo6DIyMmNjY3Z2duXl5X9/f+Hh4UBAQD8/P9XV1WZmZrm5uTMzM/b29tra2ry8vDs7O83Nzff399nZ2e/v77Gxsc/Pz3R0dJaWll5eXmlpaV9fX/Ly8sPDw5qamtfX1/r6+tbW1mtra9DQ0IaGhs7OzqysrMzMzPHx8fDw8JWVldHR0XFxccvLyz09PcHBwYODg+rq6rS0tEFBQVpaWqCgoHt7e6amppCQkEJCQvj4+GxsbH19fWdnZ8XFxYKCgqWkpaurq6qqqjU1NYCAgN/f3+BTAqoAAAKfSURBVHjapJP1U+NAGIY3KdY2dEv3eqEtIQEulzo13N0OO9wdzt3d3d39D73dTdLLMAMTes+7mefNly+T/lIAXCQuVyZ2l5a6tZRq3ej9usD/4Ha48VGjd4PTwqvOjC+Hw+PQ8Gh9k1UBp0VL5cupqdlKi3MH8eR68FGjd4PTAhaViAIpSsRinlyTgEJbYWGh7ZMfavhvkntyhV2qt75K8krwUaN3o3UBG2FcgR29oZaWUG8HVMbp6PeJlfsL3bbvEdvW5JkECILgFeognCcWhHMQ1hG/bp4cqKrpERqX8RwEyBp9bquxUNP73dtToAt4CUEYD9PiDcdhkDhwBD+Rme6TC2ufK9tuvBj0Cs11DVdWGw6MVnjrr8/T5QKTAJEA4TtR4wyEROjHg0PnL4ls8EuUEVMDG5dd3rn3VvbUxbHahNg04qK7u0wCeAKEnbxGJ4TUtU3Dx2Zu86E+ng/fvXa0uV+MvULSm/hIhONRNaI7+SYBksRLUhAq1BIPFBiUaGfWj7+9w4ceS3zj1eroWoCP4Xn1UkvDQ0nblYqK8os08rW+yaoAIiQhHKINDEGYJKVrWERichb9/IZQ+0E5cDohxfC4j326mkRNg+pr2SYBSJZllPBXPILlMqogfxSnjGR04dZHZeaZjOr/tPcsj8bvtSVQDM+frJxtdMn9cwGZvJe9JxsfNXo3OC3AUcr9NRMWjpvAHymnA7aqCkWjDPfhl299Y4xLHbZyi3icqvWlrJx10UqXskwCOIbmufJ1kuG68DcYbcJYVVs5hmG59JRh/vWs4ix81Ojd4LQAozHdusQw9a3TzA6wF9vxUaN3o3UB/IMzjr3Mjo8avRucFmBZ1prplbM9ZboA68PrvsySszcHHzV6N3ifrr8CDACA+qu2wJ+r4QAAAABJRU5ErkJggg==) top left;
    background-size: 100px 20px;
  }

  &:hover {
    opacity: .9;
  }

  &, * {
    font-size: 0;
  }
}
</style>
