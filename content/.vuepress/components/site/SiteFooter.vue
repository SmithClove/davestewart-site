<template>
  <footer class="siteFooter">
    <div class="layout__inner">
      <FooterBranding />
      <FooterIcons/>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
.siteFooter {
  .layout__inner {
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    align-items: start;
  }
}
</style>
