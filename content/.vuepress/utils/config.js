function script (src, options) {
  return ['script', { src, ...options }]
}

function meta (name, content) {
  return ['meta', { name, content }]
}

function link (rel, href) {
  return ['link', { rel, href }]
}

function plugin (name, options) {
  return arguments.length > 1
    ? [name, options]
    : name
}

module.exports = {
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production',
  script,
  meta,
  link,
  plugin,
}
