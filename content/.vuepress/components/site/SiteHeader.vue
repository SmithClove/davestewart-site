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
.siteHeader {
  .layout__inner {
    //padding: .5rem 1rem;
  }

  // used to give all items reasonable outline padding
  a, .breadcrumb__text {
    padding: 2px 6px;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__left {
    flex-grow: 1;
  }

  &__right {
  }
}
</style>
