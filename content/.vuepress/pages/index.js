const Search = require('./Search.vue').default

function page (path, component, title, description ) {
  return { path, component, title, description }
}

const pages = [
  page('/search/', Search, 'Search', "Search all projects"),
]

module.exports = {
  pages
}
