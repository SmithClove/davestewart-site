import { sortBy } from '../../utils/array.js'
import { PageNode } from '../classes/PageNode.js'

// ---------------------------------------------------------------------------------------------------------------------
// options
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Tree sorting options
 *
 * @typedef   {Object}  TreeOptions
 * @property  {string}  include
 * @property  {string}  exclude
 * @property  {string}  sortKey
 * @property  {string}  sortOrder
 * @property  {string}  maxDepth
 */

/**
 *
 * @returns {TreeOptions}
 */
export function makeTreeOptions () {
  return {
    include: '',
    exclude: '',
    sortKey: '',
    sortOrder: '',
    maxDepth: -1,
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param   {PageNode[]}  items
 * @param   {string}      regularPath
 * @returns {PageNode[]}
 */
function nest (items, regularPath) {
  return items
    .filter(item => item.parentPath === regularPath)
    .map(function (parent) {
      const pages = nest(items, parent.regularPath)
      parent.setPages(pages)
      return parent
    })
    .filter(node => {
      return node.type === 'folder'
        ? node.pages.length > 0
        : true
    })
    .sort(sortBy('frontmatter.date', 'desc'))
    .sort(sortBy('order'))
}

/**
 * Turns a flat list of Pages into nested list of PageNodes
 *
 * @param   {Page[]}      pages
 * @returns {PageNode[]}
 */
export function makeTree (pages) {
  // convert to tree nodes
  const nodes = pages.map(page => new PageNode(page))

  // get root (will have the shortest path)
  const root = nodes.reduce(function (output, input) {
    return output.regularPath.length < input.regularPath.length ? output : input
  })

  // remove root from array
  nodes.splice(nodes.indexOf(root), 1)

  // build structure
  return nest(nodes, root.regularPath)
}

/**
 * Turns a nested list of PageNodes into a flat list of Pages
 *
 * @param   {PageNode[]}  nodes
 * @param   {PageNode[]}      pages
 * @returns {PageNode[]}
 */
export function flattenTree (nodes, pages = []) {
  nodes.forEach(item => {
    if (item.type === 'post') {
      pages.push(item)
    }
    if (item.pages) {
      flattenTree(item.pages, pages)
    }
  })
  return pages
}

