<template>
  <div class="preview">
    <Modal :visible="visible" @mousedown.native.self="hide">
      <div ref="container" class="preview__container"></div>
    </Modal>
  </div>
</template>

<script>
import Vue from 'vue'
import { getRect, fitRect } from '../../utils/geom.js'
import { copyLayout } from '../../utils/dom.js'

const noop = () => {}

const els = {
  placeholder: null,
  source: null,
}

export default {
  data () {
    return {
      visible: false,
      sourceBounds: null,
    }
  },

  created () {
    Vue.prototype.$preview = this
  },

  methods: {
    /**
     * Show an element full screen
     * @param {HTMLElement} source
     * @param {Number}      width
     * @param {Number}      height
     */
    show (source) {
      // do nothing if already visible
      if (this.visible) {
        return this.hide()
      }

      // get size
      const size = source.getBoundingClientRect()

      // create placeholder
      const placeholder = document.createElement('div')
      copyLayout(source, placeholder)

      // cache elements so we can return them
      els.placeholder = placeholder
      els.source = source

      // replace source with placeholder
      source.parentElement.insertBefore(placeholder, source)
      const container = this.$refs.container
      container.appendChild(source)

      // set container bounds
      this.setBounds(source, size)

      // show and add listeners
      this.visible = true
      this.addListeners()

      // animate size
      setTimeout(() => {
        // container.style.width = 'calc(100vw - 100px)'
      }, 0)
    },

    hide () {
      // replace placeholder with source
      const { placeholder, source } = els
      placeholder.parentElement.insertBefore(source, placeholder)
      placeholder.parentElement.removeChild(placeholder)

      // hide and remove listeners
      this.visible = false
      this.removeListeners()
    },

    setBounds (source, size) {
      // variables
      const container = this.$refs.container

      // determine window bounds
      const outer = getRect(window.innerWidth * .9, window.innerHeight * .9)
      const inner = fitRect(size, outer)

      // add source here
      container.style.maxWidth = inner.width + 'px'
      container.style.maxHeight = inner.height + 'px'
      container.style.width = container.style.maxWidth
      container.style.height = container.style.maxheight
    },

    addListeners () {
      // watch for scroll and route navigation
      console.log('Added listeners')
      window.addEventListener('scroll', this.hide)
      const unwatch = this.$watch('$route.path', this.hide)

      // set up remove
      this.removeListeners = function () {
        console.log('removed listeners')
        window.removeEventListener('scroll', this.hide)
        unwatch()

        // replace remove listeners
        this.removeListeners = noop
      }
    },

    removeListeners: noop,
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.preview {
  .modal__background {
    background: white;
  }
}
</style>
