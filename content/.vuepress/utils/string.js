export function plural (num, word, includeNumber = true) {
  if (num !== 1) {
    word = word + 's'
  }
  return includeNumber
    ? `${num} ${word}`
    : word
}

export function capitalize (value = '') {
  return String(value).replace(/\w/, c => c.toUpperCase())
}

export function slugify (value = '') {
  return value.replace(/\W+/g, '-').replace(/^-|-$/g, '')
}
