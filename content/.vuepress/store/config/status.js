const { isDev } = require('../../utils/config')

const Status = {
  // has a date, is published, and within 30 days of being published
  NEW: 'new',

  // has a date, but not yet published, so hidden on production
  SCHEDULED: 'scheduled',

  // no date, but visible on production
  PREVIEW: 'preview',

  // hidden on production, visible in development
  DRAFT: 'draft',

  // visible on production, but hidden in lists
  UNLISTED: 'unlisted',

  // hidden everywhere
  HIDDEN: 'hidden',
}

function isPublished (page) {
  return ![Status.DRAFT, Status.HIDDEN, Status.SCHEDULED].includes(page.status)
}

function isListed (page) {
  return page.status !== Status.UNLISTED || isDev
}

function isVisible (page) {
  return isPublished(page) && isListed(page)
}

module.exports = {
  Status,
  isPublished,
  isListed,
  isVisible,
}
