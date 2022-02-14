const Status = {
  // has a date, is published, and within 30 days of being published
  NEW: 'new',

  // has a date, is published
  // PUBLISHED: 'published',

  // has a date, but not yet published, so hidden on production
  SCHEDULED: 'scheduled',

  // no date, but visible on production
  PREVIEW: 'preview',

  // hidden on production, visible in development
  DRAFT: 'draft',

  // hidden everywhere
  HIDDEN: 'hidden',
}

module.exports = {
  Status,
  isPublished (page) {
    return ![Status.DRAFT, Status.HIDDEN, Status.SCHEDULED].includes(page.status)
  }
}
