<template>
  <div class="scrollTop" @click="onClick">
    <span class="scrollTop__inner">
      <svg xmlns="http://www.w3.org/2000/svg"
           height="21"
           viewBox="0 0 34 21">
        <path fill="current" fill-rule="nonzero"
              d="M.976 16.848c0-.892.356-1.747.986-2.372l12.59-12.613a3.346 3.346 0 014.886 0L32.02 14.468c.64.626 1 1.481 1.004 2.385a3.342 3.342 0 01-.998 2.37 3.336 3.336 0 01-2.36.973 3.338 3.338 0 01-2.36-.975L17.046 8.963 6.683 19.223a3.336 3.336 0 01-2.36.973 3.346 3.346 0 01-3.348-3.348z"/>
      </svg>
    </span>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'

const elements = {
  footerOuter: null,
  footerInner: null,
  target: null,
}

export default {
  mounted () {
    // elements
    Object.assign(elements, {
      footerOuter: document.querySelector('.siteFooter'),
      footerInner: document.querySelector('.pageSiblings'),
      target: document.querySelector('.scrollTop__inner'),
    })

    // handlers
    window.addEventListener('scroll', this.onEvent.bind(this))
    window.addEventListener('resize', this.onEvent.bind(this))

    // update
    this.update()
  },

  methods: {
    update () {
      // choose top depending on breakpoint
      const isNarrow = window.innerWidth < (900 + 90 + 90)
      const top = isNarrow
        ? elements.footerInner.offsetTop
        : elements.footerOuter.offsetTop

      // calculations
      const scrollBottom = window.scrollY + window.innerHeight
      const offset = scrollBottom > top
        ? top - scrollBottom
        : 0

      // apply
      elements.target.style.top = offset + 'px'
    },

    onEvent: throttle(20, function () {
      this.update()
    }),

    onClick () {
      // scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // disable / reset styles etc
      const classList = this.$el.classList
      classList.add('disabled')
      setTimeout(() => classList.remove('disabled'), 1300)
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

.scrollTop {
  position: fixed;
  bottom: 0;
  right: 0;
  transition: .6s all;
  cursor: default;
  font-size: 12px;
  opacity: 0;

  &__inner {
    position: relative;
    //outline: 1px solid red;
  }

  svg {
    fill: $textColor;
    opacity: .25;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 50px;
    height: 50px;
    border-radius: 25px;

    &:hover svg {
      fill: $accentColor;
      opacity: 1;
    }
  }

  body.is-scrolled & {
    cursor: pointer;
    transition: .3s all;
    opacity: 1;
  }
}

.scrollTop.disabled {
  opacity: 0 !important;
  cursor: default !important;
  pointer-events: none;
  svg {
    fill: $textColor !important;
  }
}
</style>
