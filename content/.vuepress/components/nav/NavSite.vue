<template>
  <nav class="navSite">

    <!-- button -->
    <div class="navSite__button" @click="visible = !visible">
      <svg width="15px" height="14px" viewBox="0 0 15 14">
        <rect id="bar-1" fill="currentColor" x="2" y="3" width="11" height="2"></rect>
        <rect id="bar-2" fill="currentColor" x="2" y="7" width="11" height="2"></rect>
        <rect id="bar-3" fill="currentColor" x="2" y="11" width="11" height="2"></rect>
      </svg>
    </div>

    <!-- background -->
    <div v-if="visible" class="navSite__background" @mousedown="hide"></div>

    <!-- dropdown -->
    <div ref="dropdown" v-if="visible" class="navSite__dropdown">
      <NavSections headers/>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },

  watch: {
    '$route.path' () {
      this.visible = false
    }
  },

  methods: {
    hide () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.navSite {
  height: 100%;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 2.5rem;
    min-height: 2.5rem;
    border-right: 1px solid $grey-lightest;
    cursor: pointer;
    color: $grey-light;
    z-index: 100;

    &:hover {
      color: $accentColor;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // dropdown
  // ---------------------------------------------------------------------------------------------------------------------

  &__background {
    @include fit;
    position: fixed;
    background: #FFFD;
  }

  &__dropdown {
    box-sizing: border-box;
    position: fixed;
    background: white;
    outline: 1px solid $grey-lightest;
    border-radius: 2px;
    z-index: 110;

    @include shadow-lg;

    @include sm {
      padding: .5rem;
      width: calc(100% - 20px);
      font-size: 1.3em;
      top: 10px;
      left: 10px;
    }

    @include md-up {
      position: absolute;
      max-width: calc(100% - 20px);
      padding: 1rem .25rem;
      top: 40px;
      left: 10px;
      height: auto;
      font-size: 1.15em;
    }

    @include full {
      left: -10px;
    }
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // sections
  // ---------------------------------------------------------------------------------------------------------------------

  .navSections {

    &__header {
      display: none;
      @include md-up {
        display: block;
      }
    }

    @include md-up {
      &__section {
        border-right: 1px dashed $grey-lightest;
        width: max-content;

        &:last-child {
          border: none;
        }
      }
    }

  }
}

</style>
