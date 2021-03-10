import { sortBy } from '../utils/array.js'
import { slicePath } from '../utils/path.js'

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
// classes
// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @property  {string}  type
 * @property  {string}  title
 * @property  {string}  desc
 * @property  {string}  path
 * @property  {string}  parent
 * @property  {string}  date
 * @property  {number}  order
 */
class TreeNode {
  static fromPage (page) {
    // variables
    const { title, frontmatter, path, relativePath } = page
    const { date, description, order } = frontmatter

    // properties
    const layout = frontmatter.layout || ''
    const type = layout.toLowerCase() === 'folder'
      ? 'folder'
      : (relativePath || '').endsWith('/index.md')
        ? 'pageFolder'
        : 'page'
    const parent = type === 'folder'
      ? slicePath(path, 2)
      : type === 'pageFolder'
        ? slicePath(path, 2)
        : slicePath(path, 1)

    // data
    const data = {
      type: type === 'folder'
        ? 'folder'
        : 'page',
      title,
      desc: description,
      frontmatter,
      path,
      regularPath: path,
      parent,
      date,
      // hasMedia: type === 'pageFolder',
      order,
    }

    // return
    return new TreeNode(data)
  }

  constructor (data) {
    Object.assign(this, data)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param pages
 * @returns {TreeNode[]}
 */
export function makeTreeNodes (pages) {
  return pages.map(TreeNode.fromPage)
}

function nest (items, path) {
  return items
    .filter(item => item.parent === path)
    .map(function (parent) {
      return {
        ...parent,
        pages: nest(items, parent.path),
      }
    })
    .map(node => {
      if (node.pages.length === 0) {
        delete node.pages
      }
      return node
    })
    .sort(sortBy('date', 'desc'))
    .sort(sortBy('order'))
}

/**
 *
 * @param pages
 * @returns {TreeNode[]}
 */
export function makeTree (pages) {
  let nodes = makeTreeNodes(pages)
  const root = nodes.shift()
  return nest(nodes, root.path)
}

export function flattenTree (items, output = []) {
  items.forEach(item => {
    if (item.pages) {
      flattenTree(item.pages, output)
    }
    if (item.type === 'page') {
      output.push(item)
    }
  })
  return output
}

