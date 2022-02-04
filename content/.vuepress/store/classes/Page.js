import { Status } from '../config/status.js'
import { toObject } from '../../utils/object.js'
import { slicePath } from '../../utils/path.js'
import { isWithinDays } from '../../utils/time.js'
import { Frontmatter } from './Frontmatter.js'

// ---------------------------------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @param {Page}  page
 */
function setType (page) {
  page.type = page.frontmatter.layout === 'folder'
    ? 'folder'
    : 'page'
}

/**
 * @param {Page}  page
 */
function setParentPath (page) {
  const hasMedia = (page.relativePath || '').endsWith('/index.md')
  const regularPath = page.regularPath
  page.parentPath = page.type === 'folder'
    ? slicePath(regularPath, 2)
    : hasMedia
      ? slicePath(regularPath, 2)
      : slicePath(regularPath, 1)
}

/**
 * @param {Page}  page
 */
function setPermalink (page) {
  if (!page.frontmatter.layout && page.regularPath.startsWith('/blog/') && !page.frontmatter.permalink) {
    const slug = page.regularPath.replace(/\/$/, '').split('/').pop()
    page.path = `/blog/${slug}/`
  }
}

/**
 * @param {Page}  page
 */
function setStatus (page) {
  const { layout, date, hidden, preview } = page.frontmatter
  // default status
  page.status = ''

  // add status to posts (pages without layout)
  if (!layout) {
    if (hidden) {
      page.status = Status.HIDDEN
    }
    else if (preview) {
      page.status = Status.PREVIEW
    }
    else if (date) {
      if (date > today) {
        page.status = Status.SCHEDULED
      }
      else if (isWithinDays(page)) {
        page.status = Status.NEW
      }
    }
    else {
      page.status = Status.DRAFT
    }
  }
}

const today = new Date().toISOString().replace(/T.+?Z/, 'T00:00:00.000Z')

/**
 *
 * @param {Page} page
 */
function setDate (page) {
  if (!page.frontmatter.date) {
    page.frontmatter.date = page.status === Status.PREVIEW
      ? today.replace('T00', 'T01')
      : today
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Page class
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @property  {Frontmatter}   frontmatter
 * @property  {string}        title             Title of the page
 * @property  {string}        path              URL of the page
 * @property  {string}        type              The type of page, can be "folder" or "page"
 * @property  {string}        regularPath       File path to the file's folder
 * @property  {string}        parentPath        File path to the file's parent folder
 * @property  {string}        relativePath      File path to the file
 * @property  {string[]}      headers           All markdown page headings
 * @property  {string}        status            The status that determines if the page will be visible
 * @property  {number}       [order]            The order of the page in any list
 */
export class Page {
  constructor (props = undefined) {
    if (props) {
      // remove headers
      if (props.headers && props.headers.length) {
        props.headers = []
      }

      // set initial properties
      Object.assign(this, {
        ...props,
        frontmatter: new Frontmatter(props.frontmatter)
      })

      // set derived properties
      setType(this)
      setParentPath(this)
      setStatus(this)
      setDate(this)
      setPermalink(this)
    }
  }

  get desc () {
    return this.frontmatter.description
  }

  get order () {
    return this.frontmatter.order
  }

  toJSON () {
    return toObject(this)
  }
}
