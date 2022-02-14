<template>
  <div class="layout__home home">
    <img class="home__splash" :src="require('../assets/home-splash-small.svg')">
    <h1>I'm Dave</h1>
    <Content id="content" class="pageContent"/>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";

.home {

  hr {
    border: none;
    height: 0;
    background: none;
    border-top: 3px dotted $grey-lightest;
  }

  .homeThumbs,
  .pageContent {

    > ul,
    > p {
      @include introText;
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
    pointer-events: none;
    user-select: none;
  }
}
</style>
