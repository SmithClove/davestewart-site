<template>
  <div class="siteToTop" :class="{ clicked }" @click="onClick">
    <span>
      <svg xmlns="http://www.w3.org/2000/svg"
           height="21"
           viewBox="0 0 34 21">
        <path fill="current" fill-rule="nonzero" d="M.976 16.848c0-.892.356-1.747.986-2.372l12.59-12.613a3.346 3.346 0 014.886 0L32.02 14.468c.64.626 1 1.481 1.004 2.385a3.342 3.342 0 01-.998 2.37 3.336 3.336 0 01-2.36.973 3.338 3.338 0 01-2.36-.975L17.046 8.963 6.683 19.223a3.336 3.336 0 01-2.36.973 3.346 3.346 0 01-3.348-3.348z" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clicked: false
    }
  },

  methods: {
    onClick () {
      this.clicked = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => this.clicked = false, 1000)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.siteToTop {
  position: fixed;
  bottom: 0;
  right: 0;
  transition: .6s opacity;
  cursor: default;
  opacity: 0;
  font-size: 12px;

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

  body.is-scrolled &:not(.clicked) {
    cursor: pointer;
    transition: .3s opacity;
    opacity: 1;
  }
}
</style>
