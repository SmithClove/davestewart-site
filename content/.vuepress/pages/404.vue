<template>
  <div class="layout__page">
    <h1>404</h1>
    <p class="description">That link goes nowhere...</p>
    <div class="pageContent">
      <h3>But you have options!</h3>

      <section>
        <p>Try these links:</p>
        <ul>
          <li><router-link :to="`/search?text=${ path }`">Search for: "{{ path }}"</router-link></li>
          <li><router-link to="/">Home page</router-link></li>
          <li><router-link to="/bio">Bio</router-link></li>
        </ul>
      </section>

      <section style="margin-top: 2rem">
        <p>Or pick a random project!</p>
        <ThumbnailWall :pages="pages"/>
      </section>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pages () {
      return this.$store.pages
        .filter(page => page.frontmatter.media)
        .sort(() => Math.random() > .5 ? 1 : -2)
        .slice(0, 3)
    },

    path () {
      return this.$route.path.substr(1)
    }
  }
}
</script>
