function meta (name, content) {
  return ['meta', { name, content }]
}

function link (rel, href) {
  return ['link', { rel, href }]
}

module.exports = {
  isDev: process.env.NODE_ENV !== 'production',
  meta,
  link,
}
