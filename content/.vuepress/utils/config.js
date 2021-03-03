function meta (name, content) {
  return ['meta', { name, content }]
}

function link (rel, href) {
  return ['link', { rel, href }]
}

function page (path, component, title, description) {
  return { path, component, title, description }
}

module.exports = {
  isDev: process.env.NODE_ENV !== 'production',
  meta,
  link,
  page,
}
