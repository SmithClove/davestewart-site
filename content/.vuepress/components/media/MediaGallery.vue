<template>
  <div class="mediaGallery" :style="containerStyle">

    <!-- slides -->
    <div class="mediaGallery__slidesContainer" :style="slideContainerStyle">
      <div class="mediaGallery__slides" :style="mediaStyle">
        <div v-for="(image, i) in source"
             :key="image.src"
             class="mediaGallery__slide">
          <MediaImage :source="image" v-show="index === i"/>
        </div>
      </div>
      <div class="mediaGallery__slidesNav">
        <div class="mediaGallery__slidesPrev" @click="prev"></div>
        <div class="mediaGallery__slidesView" @click="view"></div>
        <div class="mediaGallery__slidesNext" @click="next"></div>
      </div>
    </div>

    <!-- navigation -->
    <div class="mediaGallery__nav">
      <!-- prev -->
      <span class="mediaGallery__navButton mediaGallery__navPrev"
            @click.prevent.stop="prev"
      >Prev</span>

      <!-- dots -->
      <div class="mediaGallery__pagination">
        <a v-for="(image, i) in source"
           :key="i"
           :class="{ 'mediaGallery__page--active' : index === i}"
           class="mediaGallery__page"
           @click.prevent="index = i"
        >
          <span class="mediaGallery__dot"></span>
        </a>
      </div>

      <!-- next -->
      <span class="mediaGallery__navButton mediaGallery__navNext"
            @click.prevent.stop="next"
      >Next</span>
    </div>

    <!-- caption -->
    <div v-if="hasCaption" class="mediaGallery__caption">
      {{ captionText }}
    </div>

  </div>
</template>

<script>
import { stopEvent } from '../../utils/dom'
import { offset } from '../../utils/array'
import media from './index.js'

export default {
  extends: media('gallery'),

  data () {
    return {
      index: 0,
    }
  },

  computed: {
    hasCaption () {
      return this.source.some(image => image.caption)
    },

    captionText () {
      return this.source[this.index].caption
    },

    slideContainerStyle () {
      const { width, height } = this.source[0] || {}
      return `padding-bottom: calc(${height} / ${width}* 100%)`
    },
  },

  mounted () {
    document.addEventListener('keydown', this.onKeyDown)
  },

  destroyed () {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    next () {
      this.index = offset(this.index, 1, this.source, true)
    },

    prev () {
      this.index = offset(this.index, -1, this.source, true)
    },

    view () {

    },

    onKeyDown (event) {
      const only = !(event.metaKey || event.altKey || event.ctrlKey)
      const key = event.key
      if (only) {
        if (key === 'ArrowLeft') {
          stopEvent(event)
          this.prev()
        }
        if (key === 'ArrowRight') {
          stopEvent(event)
          this.next()
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

$colorHover: #888;

.mediaGallery {
  margin: 0 auto 3rem;
  position: relative;

  .pageContent & {
    margin-top: 2rem;
  }

  // slides
  &__slidesContainer {
    font-size: 0;
    position: relative;
    overflow: hidden;

    > * {
      position: absolute;
      top: 0;
    }

    * {
      width: 100%;
      height: 100%;
    }
  }

  &__slide {
    position: absolute;
    width: 100%;
    top: 0;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      //-webkit-backface-visibility: hidden;
      //-webkit-transform: translateZ(0) scale(1, 1);
    }
  }

  &__slides[style*="aspect-ratio"] .mediaGallery__slide {
    position: absolute;
  }

  // slides navigation
  &__slidesNav {
    width: 100%;
    height: 100%;
    display: flex;

    > * {
      height: 100%;
      width: 50%;
    }
  }

  &__slidesPrev {
    cursor: w-resize;
  }

  &__slidesView {
    cursor: zoom-in;
  }

  &__slidesNext {
    cursor: e-resize;
  }

  // button navigation
  &__nav {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__navButton {
    border: none;
    color: #ccc;
    background: transparent;
    user-select: none;
    cursor: pointer;
    transition-duration: 0.3s;

    &:hover {
      color: $colorHover;
    }
  }

  // pagination
  &__pagination {
    margin: 0;
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  &__page {
    margin: 0 3px;
    padding: 7px;
    cursor: pointer;

    span {
      background-color: #eee;
      border: none;
      border-radius: 100%;
      display: block;
      height: 10px;
      font-size: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      transition-duration: 1.8s;
      width: 10px;
      outline: none;
    }

    &--active span,
    &:hover span {
      background-color: $colorHover;
      box-shadow: 0 0 0 7px rgba(0, 0, 0, 0.1);
      transition-duration: 0.3s;
    }
  }

  // caption
  &__caption {
    border-top: 1px dotted #CCC;
    margin: 1rem 0 0;
    padding: 1rem 0 0;
    text-align: center;
    color: $accentColor;
  }

}
</style>
