import { makePages, makeTags } from './helpers.js'

export function makeStore (data) {
  const tags = makeTags(data.pages)
  const pages = makePages(data.pages)
  return {
    pages,
    tags
  }
}
