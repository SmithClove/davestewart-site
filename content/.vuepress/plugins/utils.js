function isImage (path = '') {
  return /\.(ico|gif|bmp|svg|png|jpe?g)$/.test(path)
}

function isLocal (path = '') {
  return /\..+/.test(path)
}

function isRemote (path = '') {
  return /^https?:/.test(path)
}

module.exports = {
  isRemote,
  isLocal,
  isImage,
}
