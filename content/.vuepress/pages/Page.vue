<template>
  <div class="page" :data-path="$page.path.substr(1, $page.path.length -2)">
    <PageHero />
    <h1>{{ $page.title }}</h1>
    <PageInfo/>
    <PreviewInfo />
    <Content class="pageContent" />

    <!-- comments -->
    <PageFeedback v-if="$page.frontmatter.date" websiteId="6366" title="So..." />
  </div>
</template>

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
