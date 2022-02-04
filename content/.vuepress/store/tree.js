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
    const { title, frontmatter, regularPath, relativePath, path, status } = page
    const { date, description, order } = frontmatter

    // properties
    const layout = frontmatter.layout || ''
    const type = layout.toLowerCase() === 'folder'
      ? 'folder'
      : (relativePath || '').endsWith('/index.md')
        ? 'pageFolder'
        : 'page'
    const parentPath = type === 'folder'
      ? slicePath(regularPath, 2)
      : type === 'pageFolder'
        ? slicePath(regularPath, 2)
        : slicePath(regularPath, 1)

    // data
    const data = {
      type: type === 'folder'
        ? 'folder'
        : 'page',
      title,
      desc: description,
      frontmatter,
      regularPath,
      parentPath,
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

function nest (items, regularPath) {
  return items
    .filter(item => item.parentPath === regularPath)
    .map(function (parent) {
      return {
        ...parent,
        pages: nest(items, parent.regularPath),
      }
    })
    .filter(node => {
      return node.type === 'folder'
        ? node.pages.length > 0
        : true
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
  // convert to tree nodes
  const nodes = makeTreeNodes(pages)

  // get root (will have the shortest path)
  const root = nodes.reduce(function (output, input) {
    return output.regularPath.length < input.regularPath.length ? output : input
  })

  // remove root from array
  nodes.splice(nodes.indexOf(root), 1)

  // build structure
  return nest(nodes, root.regularPath)
}

export function flattenTree (items, output = []) {
  items.forEach(item => {
    if (item.type === 'page') {
      output.push(item)
    }
    if (item.pages) {
      flattenTree(item.pages, output)
    }
  })
  return output
}

