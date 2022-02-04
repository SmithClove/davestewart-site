import { makePages, makeTags } from './services/helpers.js'
import { makeTree, flattenTree } from './services/tree.js'

export function makeStore (data) {
  const tags = makeTags(data.pages)
  const pages = makePages(data.pages)
  const tree = makeTree(pages)
  const sorted = flattenTree(tree)

  return {
    sorted,
    tree,
    pages,
    tags
  }
}
