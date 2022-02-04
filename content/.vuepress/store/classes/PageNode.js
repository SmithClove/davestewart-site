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
  constructor (parent, children = []) {
    super()
    Object.setPrototypeOf(this, parent)
    this.pages = children
    if (children.length) {
      this.children = children
    }
  }

  toJSON () {
    return toObject(this)
  }
}
