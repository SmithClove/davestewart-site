import { toObject } from '../../utils/object.js'
import { Page } from './Page.js'

/**
 * @property  {Page[]}  children    Any children this page has
 */
export class PageNode extends Page {
  /**
   *
   * @param {Page}      parent
   * @param {page[]}    [children]
   */
  constructor (parent) {
    super(parent)
    // Object.setPrototypeOf(this, parent)
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
