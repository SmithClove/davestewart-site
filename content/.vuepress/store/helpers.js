import sort from 'fast-sort'
import { getValue } from '../utils/object.js'
import { sortBy } from '../utils/array.js'

export function makeTags (pages) {
  // add tags
  const hash = pages.reduce((hash, page) => {
    const tags = getValue(page, 'frontmatter.tags')
    if (tags) {
      tags.forEach(tag => {
        hash[tag] = true
      })
    }
    return hash
  }, {})
  return Object.keys(hash).sort()
}

export function makePages (pages) {
  return sort(pages).asc('path')
}

