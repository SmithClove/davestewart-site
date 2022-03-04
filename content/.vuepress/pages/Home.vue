<template>
  <div class="layout__home home">
    <router-link to="/bio/" style="display: block">
      <Splash/>
    </router-link>
    <h1>I'm Dave,</h1>
    <Content id="content" class="pageContent"/>
  </div>
</template>

<style lang="scss">
@import "../styles/variables";

.home {

  h1 {
    font-weight: normal;
    margin-top: -.5rem;
  }

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

    /*
    p:first-of-type {
      margin-top: -.5rem;
      font-size: 2.4em;
    }
    */

    ul {
      padding-left: 1rem;
    }

    li {
      font-size: .8em !important;
    }
  }
}

// gallery font size
div[data-path="/"] {
  .mediaGallery__caption {
    font-family: $titleFont;
    font-size: 1.5rem;
    white-space: nowrap;

    @include sm {
      font-size: 1.2rem;
    }
  }
}
</style>
