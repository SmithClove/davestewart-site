<template>
  <SiteWrapper layout="page">
    <h1>404</h1>
    <p class="description">Looks like that link goes nowhere...</p>
    <div class="content__default">
      <p>Try these instead:</p>
      <ul>
        <li><router-link to="/">Home page</router-link></li>
        <li><router-link to="/tags">Search by tag</router-link></li>
        <li><router-link to="/all">Site map</router-link></li>
      </ul>
    </div>
  </SiteWrapper>
</template>

<script>
export default {
  props: {
  }
}
</script>
