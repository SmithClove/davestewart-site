import { toObject } from '../../utils/object.js'
import { Page } from './Page.js'

/**
 * @property  {Page[]}  pages    Any children this page has
 */
export class PageNode extends Page {
  /**
   *
   * @param {Page}      parent
   */
  constructor (parent) {
    super(parent)
  }

  setPages (pages) {
    if (Array.isArray(pages) && pages.length) {
      this.pages = pages
    }
  }

  toJSON () {
    return toObject(this)
  }
}
