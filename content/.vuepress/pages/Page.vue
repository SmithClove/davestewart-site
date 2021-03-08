<template>
  <div class="layout__page">
    <PageHero />
    <h1>{{ $page.title }}</h1>
    <PageInfo/>
    <Content class="pageContent" />
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>
