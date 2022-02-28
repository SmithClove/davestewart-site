<template>
  <footer class="siteFooter">
    <div class="layout__inner">
      <SiteBranding />
      <FooterIcons/>
    </div>
    <div class="layout__inner">
      <NavSections />
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "../../styles/variables";

.siteFooter {
  .layout__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-child {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    &:last-child {
      border-top: 1px dashed $grey-lightest;
      padding-top: .75rem;
      padding-bottom: 4rem;
    }
  }
}
</style>
