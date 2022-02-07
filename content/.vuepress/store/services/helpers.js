import sort from 'fast-sort'
import { getValue } from '../../utils/object.js'
import { tagGroups } from '../config/tags.js'

export function makeTags (pages) {
  // get tag "other" group
  const other = tagGroups.find(group => group.title === 'Other')

  // add grouped tags to hash
  const grouped = tagGroups.reduce((hash, group) => {
      group.tags.forEach(tag => hash[tag] = true)
      return hash
    }, {})

  // add tags
  const hash = pages.reduce((hash, page) => {
    // grab the page's tags
    const tags = getValue(page, 'frontmatter.tags')

    // if we have tags, process them
    if (tags) {
      tags.forEach(tag => {
        // add tags + count to hash
        if (hash[tag]) {
          hash[tag] = 0
        }
        hash[tag]++

        // update tag groups "other" group
        if (!grouped[tag]) {
          other.tags.push(tag)
          grouped[tag] = true
        }
      })
    }

    // return
    return hash
  }, {})

  // return just the array of tags
  return Object.keys(hash).sort()
}

export function makePages (pages) {
  return sort(pages).asc('path')
}

