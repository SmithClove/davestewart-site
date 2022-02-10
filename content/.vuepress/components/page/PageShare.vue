<template>
  <div class="pageShare">
    <a :href="href" target="_blank" title="Share on Twitter"></a>
  </div>
</template>

<script>
export default {
  props: {
    page: Object,

    url: String,

    text: String,

    tags: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    href () {
      const page = this.page
      const url = `https://davestewart.co.uk${page.path}`
      const text = encodeURIComponent(`${page.title}\n\n${page.desc}\n\n`)
      const tags = page.frontmatter.tags || []
      return `https://twitter.com/share?text=${text}&url=${url}&hashtags=${tags.join(',')}`
    }
  }
}
</script>

<style lang="scss">
.pageShare {
  display: inline-block;
  flex-shrink: 0;

  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 0;
    line-height: 0;
    background-image:url('/assets/icons/twitter-blue.svg');
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  span {
    flex-shrink: 0;
  }
}
</style>
