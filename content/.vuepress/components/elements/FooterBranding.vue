<template>
  <a class="footerBranding" href="/" @click.prevent="onClick">
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
      setTimeout(() => this.$router.push('/'), 750)
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

  &__icon {
    height: 32px;
    width: auto;
    fill: $grey-light;
  }

  &__text {
    height: 32px;
    margin-left: .5rem;
    margin-top: -1px;
    line-height: 1.15;
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
