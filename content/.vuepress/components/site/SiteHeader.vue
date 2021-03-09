<template>
  <header class="siteHeader">
    <div class="layout__inner">
      <div class="siteHeader__left">
        <SiteBreadcrumbs/>
      </div>
      <div class="siteHeader__right">
        <SiteSearch/>
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
</style>
