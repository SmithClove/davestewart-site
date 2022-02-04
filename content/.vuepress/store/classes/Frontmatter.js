import { toObject } from '../../utils/object.js'

/**
 * @typedef {object}  Record
 */

/**
 * @property  {string}        title
 * @property  {string}        description
 * @property  {string}        [breadcrumb]
 * @property  {string}        layout
 * @property  {string}        mode
 * @property  {string}        format
 * @property  {number}       [order]
 * @property  {Record[]}      media
 * @property  {Record}        meta
 * @property  {string}        date
 * @property  {boolean}       preview
 * @property  {boolean}       hidden
 */
export class Frontmatter {
  constructor (props) {
    Object.assign(this, props)
  }

  toJSON () {
    return toObject(this)
  }
}
