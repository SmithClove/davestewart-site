import { Status } from '../config/status.js'
import { toObject } from '../../utils/object.js'
import { slicePath } from '../../utils/path.js'
import { isWithinDays } from '../../utils/time.js'
import { Frontmatter } from './Frontmatter.js'

// ---------------------------------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Set the type of the page so it can be filtered in search, etc
 *
 * @param {Page}  page
 */
function setType (page) {
  const layout = page.frontmatter.layout
  if (layout === 'post' || !layout) {
    page.type = 'post'
  }
  else {
    page.type = layout === 'folder'
      ? 'folder'
      : 'page'
  }
}

const today = new Date().toISOString().replace(/T.+?Z/, 'T00:00:00.000Z')

/**
 * Set the page date so it can be sorted chronologcally
 * @param {Page} page
 */
function setDate (page) {
  if (!page.frontmatter.date) {
    page.frontmatter.date = today
  }
}

/**
 * Set the visibility status so it can be omitted from production
 *
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
      page.frontmatter.date = today.replace('T00', 'T01')
    }
    else if (date) {
      if (date > today) {
        page.status = Status.SCHEDULED
      }
      else if (isWithinDays(page.frontmatter.date)) {
        page.status = Status.NEW
      }
    }
    else {
      page.status = Status.DRAFT
    }
  }
}

/**
 * Optionally set permalinks
 *
 * @param {Page}  page
 */
function setPermalink (page) {
  // permalink blog articles to a flat hierarchy
  if (page.regularPath.startsWith('/blog/') && page.type === 'post' && !page.frontmatter.permalink) {
    const slug = page.regularPath.replace(/\/$/, '').split('/').pop()
    page.path = `/blog/${slug}/`
  }
}

/**
 * Set parent path so page can be placed in a hierarchy
 *
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

// ---------------------------------------------------------------------------------------------------------------------
// Page class
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @property  {Frontmatter}   frontmatter
 * @property  {string}        title             Title of the page
 * @property  {string}        path              URL of the page
 * @property  {string}        type              The type of page, can be "folder", "page" or "post
 * @property  {string}        regularPath       File path to the file's folder
 * @property  {string}        parentPath        File path to the file's parent folder
 * @property  {string}        relativePath      File path to the file
 * @property  {string[]}      headers           All markdown page headings
 * @property  {string}        status            The status that determines if the page will be visible
 * @property  {number}       [order]            The order of the page in any list
 */
export class Page {
  /**
   * Constructor
   * @param   {object}  [props]   Optional props, as PageNode sets prototype, so doesn't want to overwrite
   */
  constructor (props = undefined) {
    if (props) {
      // remove headers as they create page anchors
      if (props.headers && props.headers.length) {
        props.headers = []
      }

      // set initial properties
      Object.assign(this, {
        ...props,
        frontmatter: new Frontmatter(props.frontmatter)
      })

      // set derived properties
      // note: order is important as some properties (i.e. status) depend on others (i.e. date)
      setType(this)
      setStatus(this)
      setDate(this)
      setPermalink(this)
      setParentPath(this)
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
