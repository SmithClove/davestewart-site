// imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMasonry from 'vue-masonry-css'
import smoothscroll from 'smoothscroll-polyfill'
import GlobalEvents from 'vue-global-events'
import './plugins/vuepress/components.js'

// theme
import './styles/index.scss'

// helpers
import { $fm } from './utils/app.js'
import { makeStore } from './store'
import { isPublished } from './store/helpers.js'
import { resolveMeta } from './utils/media.js'

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
    Vue.use(VueMasonry)
    smoothscroll.polyfill()
    Vue.component('GlobalEvents', GlobalEvents)
  }

  // components
  require('./components')

  // filter drafts
  siteData.pages
    .map((page, index) => isPublished(page) ? -1 : index)
    .reverse()
    .filter(index => index > -1)
    .forEach(index => siteData.pages.splice(index, 1))

  // remove headers
  siteData.pages
    .forEach((page, index) => {
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
