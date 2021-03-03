<template>
  <div class="linkIcons">
    <a v-for="item in items"
       class="linkIcon"
       target="_blank"
       :href="item.href"
       :style="`background-color: ${item.color}`"
    ><span :style="`background-image:url(/assets/icons/${item.name}.svg)`">

    </span></a>
  </div>
</template>

<script>
function link (name, color, href) {
  return { name, color, href }
}

// https://simpleicons.org/?q=product
const links = [
    link('twitter', '#1DA1F2', 'https://twitter.com/dave_stewart'),
    link('github', '#181717', 'https://github.com/davestewart'),
    link('linkedin', '#0A66C2', 'https://www.linkedin.com/in/davestewartuk/'),
]

export default {
  computed: {
    items () {
      return links
    }
  },

}
</script>

<style lang="scss">
@import "../../styles/variables";

.linkIcons {
  a {
    display: inline-block;
    margin-right: 8px;
    font-size: 0;

    span {
      display: block;
      padding: 4px;
      width: 24px;
      height: 24px;
      font-size: 0;
      margin: 0;
      background-size: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-color: darken($borderColor, 5%);
      transition: .5s background-color;

      &:hover, &:focus {
        transition: .1s background-color;
        background-color: unset;
      }
    }

  }

}
</style>
