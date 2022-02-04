// imports
import VueMasonry from 'vue-masonry-css'
import smoothscroll from 'smoothscroll-polyfill'
import GlobalEvents from 'vue-global-events'
import './plugins/vuepress/components.js'

// theme
import './styles/index.scss'

// helpers
import { $fm } from './utils/app.js'
import { makeStore } from './store'
import { Status } from './store/status.js'
import { resolveMeta } from './utils/media.js'
import { isWithinDays } from './utils/time.js'
import { isProd } from './utils/config.js'

/**
 * @param {Vue}         Vue       the version of Vue being used in the VuePress app
 * @param {object}      options   the options for the root Vue instance
 * @param {VueRouter}   router    the router instance for the app
 * @param {object}      siteData  site metadata
 * @param {boolean}     isServer  is this enhancement applied in server-rendering or client
 */
export default ({ Vue, options, router, siteData, isServer }) => {
  // plugins
  if (!isServer) {
    Vue.use(VueMasonry, { name: 'VueMasonry' })
    smoothscroll.polyfill()
    Vue.component('GlobalEvents', GlobalEvents)
  }

  // components
  require('./components')

  // ensure all pages have status and date
  const today = new Date().toISOString().replace(/T.+?Z/, 'T00:00:00.000Z')
  siteData.pages.forEach(page => {
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

      // ensure all pages have date for sorting
      if (!page.frontmatter.date) {
        page.frontmatter.date = page.status === Status.PREVIEW
          ? today.replace('T00', 'T01')
          : today
      }
    }
  })

  // remove hidden, draft, or unpublished pages dep. on env.
  const pages = [...siteData.pages]
  for (const page of pages) {
    const status = page.status
    const hidden = status === Status.HIDDEN
    const hiddenInProd = (status === Status.DRAFT || status === Status.SCHEDULED) && isProd
    if (hidden || hiddenInProd) {
      console.log(`Removing: [${status}] ${page.title}`)
      // modify array directly as siteData.pages is read-only
      const index = siteData.pages.findIndex(p => p === page)
      siteData.pages.splice(index, 1)
    }
  }

  // set permalink of all blog posts
  siteData.pages
    .forEach(page => {
      if (!page.frontmatter.layout && page.regularPath.startsWith('/blog/') && !page.frontmatter.permalink) {
        const slug = page.regularPath.replace(/\/$/, '').split('/').pop()
        page.path = `/blog/${slug}/`
      }
    })

  // remove headers
  siteData.pages
    .forEach(page => {
      if (page.headers && page.headers.length) {
        page.headers = []
      }
    })

  // update meta tags with compiled images
  const assets = {}
  siteData.pages.forEach(page => resolveMeta(page, assets))

  // mixins
  Vue.prototype.$fm = $fm
  Vue.prototype.$store = makeStore(siteData)
}
