const Status = {
  // has a date, is published, and within 30 days of being published
  NEW: 'new',

  // has a date, but not yet published, so hidden on production
  SCHEDULED: 'scheduled',

  // no date, but visible on production
  PREVIEW: 'preview',

  // hidden on production, visible in development
  DRAFT: 'draft',

  // hidden everywhere
  HIDDEN: 'hidden',
}

function isPublished (page) {
  return ![Status.DRAFT, Status.HIDDEN, Status.SCHEDULED].includes(page.status)
}

function isVisible (page) {
  return isPublished(page) && page.status !== Status.PREVIEW // page.frontmatter.date
}

module.exports = {
  Status,
  isPublished,
  isVisible,
}
