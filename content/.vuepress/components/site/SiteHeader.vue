<template>
  <header class="siteHeader">
    <div class="layout__inner">
      <div class="siteHeader__left">
        <SiteBreadcrumbs/>
      </div>
      <div class="siteHeader__right">
        <router-link to="/tags" title="Search by tag">Tags</router-link>
        <router-link to="/all" title="Site map">Site</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.siteHeader {
  &__left {
  }

  &__right {
    > * {
      margin-left: 1.5em;
    }
  }
}
</style>
