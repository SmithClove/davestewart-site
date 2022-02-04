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
import { isPublished, isWithinDays } from './store/helpers.js'
import { resolveMeta } from './utils/media.js'
import { isProd } from './utils/config.js'
import { Status } from './store/status.js'

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

  // ensure all pages have a status property
  siteData.pages.forEach(page => {
    const fm = page.frontmatter
    if (!fm.layout && !fm.status) {
      if (isPublished(page)) {
        fm.status = isWithinDays(page)
          ? Status.NEW
          : Status.PUBLISHED
      }
      else {
        fm.status = Status.DRAFT
      }
    }
  })

  // remove hidden, draft, or unpublished pages dep. on env.
  const pages = [...siteData.pages]
  for (const page of pages) {
    const { status } = page.frontmatter
    const hidden = status === Status.HIDDEN
    const hiddenInProd = (status === Status.DRAFT || status === Status.UNPUBLISHED) && isProd
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
