<template>
  <div v-show="visible" class="preview" :class="{ active, raised }">
    <transition name="preview__fade">
      <div v-if="active"
           class="preview__background"
           @mousedown.self="hide"></div>
    </transition>
    <div ref="offset" class="preview__offset">
      <div ref="container" class="preview__container"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getKeys, isEscape, onTransitionEnd, stopEvent } from '../../utils/events.js'
import { fitRect, getRect } from '../../utils/geom.js'
import { setElementBounds} from '../../utils/dom.js'

const noop = () => {}

const els = {
  offset: null,
  container: null,
  placeholder: null,
  source: null,
}

export default {
  data () {
    return {
      // is the "actual" state
      active: false,

      // is the "animation" state
      visible: false,

      // added when the overlay is raised
      raised: false,

      // is transitioning (don't allow additional clicks)
      isTransitioning: false,

      // values to remember for when we hide
      size: null,
      scrollY: 0,
    }
  },

  watch: {
    visible (value) {
      document.body.classList.toggle('modal-active', value)
    },

    active (value) {
      document.body.classList.toggle('modal-raised', value)
    },
  },

  created () {
    Vue.prototype.$preview = this
  },

  methods: {
    /**
     * Show an element full screen
     * @param {HTMLElement} source
     */
    show (source) {
      // bail if already transitioning
      if (this.isTransitioning) {
        return
      }

      // hide if shown
      if (this.visible) {
        return this.hide()
      }

      // create placeholder
      const placeholder = document.createElement('div')
      placeholder.id = 'placeholder'

      // cache elements so we can return them
      els.offset = this.$refs.offset
      els.container = this.$refs.container
      els.placeholder = placeholder
      els.source = source

      // get source size
      const size = this.size = source.getBoundingClientRect()

      // set placeholder size (use % and padding to attempt to keep aspect ratio)
      // this won't be perfect, because the gallery component doesn't keep its aspect
      // ratio when it scales, due to the pagination controls on the bottom
      const bounds = source.getBoundingClientRect()
      placeholder.style.width = '100%'
      placeholder.style.paddingBottom = (bounds.height / bounds.width * 100) + '%'

      // replace source with placeholder
      source.parentElement.insertBefore(placeholder, source)
      els.container.appendChild(source)

      // set container bounds
      setElementBounds(els.container, size)
      requestAnimationFrame(() => {
        this.updateContainerBounds()
      })

      // show and add listeners
      this.visible = true
      this.active = true
      this.addListeners()

      // set up movement data
      els.offset.style.transform = ''
      this.scrollY = window.scrollY

      // begin the transition
      this.isTransitioning = true
      onTransitionEnd(els.container, () => {
        this.isTransitioning = false
        this.raised = true
      })
    },

    hide (immediate) {
      // replace placeholder with source
      const { container, placeholder, source } = els
      const parentElement = placeholder.parentElement

      // set bounds
      setElementBounds(container, placeholder.getBoundingClientRect())

      // change state
      this.active = false
      this.raised = false

      // route change
      if (immediate) {
        window.removeEventListener('scroll', this.onPageScroll)
        container.innerHTML = ''
        this.visible = false
      }

      // scroll
      else {
        this.isTransitioning = true
        onTransitionEnd(els.container, () => {
          // remove final listener
          window.removeEventListener('scroll', this.onPageScroll)

          // update element
          if (parentElement) {
            parentElement.insertBefore(source, placeholder)
            parentElement.removeChild(placeholder)
          }

          // update
          this.isTransitioning = false
          this.visible = false
        })
      }
    },

    updateContainerBounds () {
      // variables
      const container = els.container
      const el = this.$el

      // determine window bounds
      const hd = getRect(1920, 1080)
      const viewport = getRect(el.offsetWidth, el.offsetHeight)
      const safe = getRect(viewport.width * .9, viewport.height * .9)
      const content = fitRect(this.size, safe)

      // set container bounds
      content.x = (viewport.width - content.width) / 2
      content.y = (viewport.height - content.height) / 2
      setElementBounds(container, content)
    },

    addListeners () {
      // main listeners
      window.addEventListener('resize', this.onResize)
      window.addEventListener('orientationchange', this.onResize)
      window.addEventListener('keyup', this.onKeyUp)
      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('scroll', this.onInitialScroll)
      const unwatch = this.$watch('$route.path', this.onRoute)

      // additional listener to keep track of scrolling when the user has cancelled
      window.addEventListener('scroll', this.onPageScroll)

      // set up remove
      this.removeListeners = function () {
        window.removeEventListener('resize', this.onResize)
        window.removeEventListener('orientationchange', this.onResize)
        window.removeEventListener('keyup', this.onKeyUp)
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('scroll', this.onInitialScroll)
        unwatch()
      }
    },

    removeListeners: noop,

    onResize () {
      this.updateContainerBounds()
    },

    onRoute () {
      this.removeListeners()
      this.hide(true)
    },

    onKeyUp (event) {
      if (isEscape(event)) {
        this.removeListeners()
        this.hide()
      }
    },

    onKeyDown (event) {
      stopEvent(event)
      const keys = getKeys(event)
      if (!keys.shift && !keys.left && !keys.right) {
        this.removeListeners()
        this.hide()
      }
    },

    onInitialScroll () {
      this.removeListeners()
      this.hide()
    },

    onPageScroll () {
      // keep track of page scrolling so we can fake the position of the container if the user scrolls
      els.offset.style.transform = `translateY(${this.scrollY - window.scrollY}px)`
    },

  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

.preview {
  z-index: 90;
  position: fixed;
  overflow-y: visible;
  @include fit;

  &__background {
    @include fit;
    position: absolute;
    background: rgba(white, 1); // .95
  }

  &__container {
    position: absolute;
    transition: .35s all;
  }

  // don't animate when raised; otherwise weird things happen when resizing
  &.raised .preview__container {
    transition: none;
  }

  &__fade-enter-active,
  &__fade-leave-active {
    transition: opacity .4s;
  }

  &__fade-enter,
  &__fade-leave-to {
    opacity: 0;
  }
}

#placeholder {
  // outline: 5px dashed red;
}
</style>
