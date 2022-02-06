<template>
  <div class="layout__page">
    <PageHero />
    <h1>{{ $page.title }}</h1>
    <PageInfo/>
    <PreviewInfo />
    <Content class="pageContent" />
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

<style lang="scss">
.pageContent.is-scheduled {
  position: relative;
  height: 500px;
  overflow: hidden;

  &:after {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    bottom: 0;
    content: " ";
    background: linear-gradient(0deg, white, transparent);
  }
}
</style>
