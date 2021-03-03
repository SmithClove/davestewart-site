<template>
  <div class="layout__page">
    <PageHero />
    <h1>{{ $page.title }}</h1>
    <PageInfo/>
    <Content />
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>
