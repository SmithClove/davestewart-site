<template>
  <footer class="siteFooter">
    <div class="layout__inner">
      <div class="branding">
        <router-link to="/" class="branding__link">
          <SiteIcon />
        </router-link>
        <div class="branding__text">
          <strong>Dave Stewart</strong>
          <br>
          <span>Web Developer and Indie Maker</span>
        </div>
      </div>
      <LinkIcons/>
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
    padding-top: 1.5rem;
  }

  .branding {
    display: flex;
    align-items: center;

    .siteIcon {
      height: 33px;
      width: auto;
    }

    &__link {
      img {
        width: 38px;
        height: 38px;
        padding: 2px;
      }
    }

    &__text {
      margin-left: .75rem;
      line-height: 1.1;

      strong {
        font-weight: 600;
        font-size: 1.4em;
        opacity: .8;
      }

      span {
        font-size: .8em;
        opacity: .6;
      }
    }
  }
}
</style>
