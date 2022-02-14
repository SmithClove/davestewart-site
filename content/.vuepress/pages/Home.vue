<template>
  <div class="layout__home layout__page home">
    <img class="home__splash" :src="require('../assets/home-splash-small.svg')">
    <h1>I'm Dave</h1>
    <Content id="content" class="pageContent" />
  </div>
</template>

<style lang="scss">
@import "../styles/variables";

.home {

  .homeRecent,
  .pageContent {

    > ul,
    > p {
      font-size: 1.7rem;
      line-height: 1.2em !important;
      font-family: $titleFont !important;
      font-weight: 500;

      @include sm {
        font-size: 1.4rem;
      }
    }

    ul {
      padding-left: 1rem;
    }

    li {
      font-size: .8em !important;
    }
  }

  &__splash {
    width: 100%;
    aspect-ratio: 840/400;
    pointer-events:none;
    user-select: none;
  }
}
</style>
