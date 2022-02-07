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
import { Status } from './store/config/status.js'
import { resolveMeta } from './utils/media.js'
import { isProd } from './utils/config.js'
import { Page } from './store/classes/Page.js'

// ---------------------------------------------------------------------------------------------------------------------
// main function
// ---------------------------------------------------------------------------------------------------------------------

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

  // TODO upgrade page data here, rather than on tree nodes
  //      review all .layout === 'folder'

  // upgrade pages
  siteData.pages.forEach((page, index, array) => {
    array[index] = new Page(page)
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

  // update meta tags with compiled images
  const assets = {}
  siteData.pages.forEach(page => resolveMeta(page, assets))

  // mixins
  Vue.prototype.$fm = $fm
  Vue.prototype.$store = makeStore(siteData)
}
