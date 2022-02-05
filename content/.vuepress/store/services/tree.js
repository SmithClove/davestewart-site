import { sortBy } from '../../utils/array.js'
import { PageNode } from '../classes/PageNode.js'

function nest (items, regularPath) {
  return items
    // return only immediate children
    .filter(item => item.parentPath === regularPath)

    // assign child pages
    .map(function (parent) {
      const pages = nest(items, parent.regularPath)
      parent.setPages(pages)
      return parent
    })

    // only add folders with children (some may be drafts, so excluded from the production build
    .filter(node => {
      return node.type === 'folder'
        ? node.pages?.length > 0
        : true
    })

    // sort by date
    .sort(sortBy('date', 'desc'))

    // soft by order
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

