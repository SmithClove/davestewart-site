// imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMasonry from 'vue-masonry-css'
import smoothscroll from 'smoothscroll-polyfill'

// theme
import './styles/index.scss'

// helpers
import { $fm } from './utils/app.js'
import { makeStore } from './store'
import { pages } from './pages'

/**
 * @param {Vue}         Vue       the version of Vue being used in the VuePress app
 * @param {object}      options   the options for the root Vue instance
 * @param {VueRouter}   router    the router instance for the app
 * @param {object}      siteData  site metadata
 */
export default ({ Vue, options, router, siteData }) => {
  // plugins
  Vue.use(VueMasonry)
  smoothscroll.polyfill()

  // mixins
  Vue.prototype.$fm = $fm
  Vue.prototype.$store = makeStore(siteData)

  // components
  require('./components')

  // add routes
  pages.forEach(page => router.addRoute(page))
}
