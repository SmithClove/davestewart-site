function slicePath (path, reduce = 1) {
  return path
    .split('/')
    .slice(0, -reduce)
    .join('/') + '/'
}

module.exports = {
  slicePath
}
