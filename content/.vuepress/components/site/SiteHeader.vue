<template>
  <header class="siteHeader">
    <div class="siteHeader__background">
      <div class="layout__inner">
        <div class="siteHeader__left">
          <SiteBreadcrumbs/>
        </div>
        <div class="siteHeader__right">
          <SiteSearch/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "../../styles/variables";

.siteHeader {
  font-family: $titleFont;

  // used to give all items reasonable outline padding
  a, .breadcrumb__text {
    padding: 2px 6px;
  }

  .layout__inner {
    // pull in padding because breadcrumbs already contain bottom margin
    padding-bottom: .5rem;
  }

  &__left,
  &__right {
    display: flex;
    align-items: flex-start;
  }

  &__left {
    flex-grow: 1;
  }

  &__right {
  }
}

// animation
.siteHeader {
  opacity: 1;
  transition: .6s opacity; // slow-out
  transition-delay: .2s;

  // opacity
  body.modal-raised & {
    opacity: 0;
    transition: .2s opacity; // fast-in
  }

  // shadow
  &__background {
    transition: 1s box-shadow; // slow-out
  }

  body.is-scrolled & .siteHeader__background{
    box-shadow: 0 0 20px rgba(black, 0.07);
    transition: .3s box-shadow; // fast-in
  }
}

</style>
