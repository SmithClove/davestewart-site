<template>
  <a class="footerBranding" href="/bio" @click.prevent="onClick">
    <SiteIcon class="footerBranding__icon"/>
    <div class="footerBranding__text">
      <span>Dave Stewart</span>
      <span>Web Developer + Indie Maker</span>
    </div>
  </a>
</template>

<script>
export default {
  methods: {
    onClick (event) {
      event.currentTarget.blur()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$router.push('/bio').catch(() => {})
      // setTimeout(() => , 750)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.footerBranding {
  display: flex;
  color: unset;
  text-decoration: none !important;
  padding: 5px;
  margin: -5px;

  &__icon {
    height: 32px;
    width: auto;
    fill: $grey-light;
  }

  &__text {
    height: 32px;
    margin-left: .5rem;
    line-height: 1;
    color: $grey-light;

    :first-child {
      display: block;
      font-family: $titleFont;
      font-weight: 600;
      font-size: 1.4em;
      opacity: .8;
    }

    :last-child {
      display: block;
      font-size: .75em;
      opacity: .6;
    }
  }

  &:hover {
    svg {
      fill: $accentColor;
    }

    span {
      color: $textColor;
    }
  }

  &__icon,
  &__text span {
    @include hover;
  }
}
</style>
