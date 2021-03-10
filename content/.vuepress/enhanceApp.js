// imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMasonry from 'vue-masonry-css'
import smoothscroll from 'smoothscroll-polyfill'
import GlobalEvents from 'vue-global-events'
import './plugins/vuepress.js'

// theme
import './styles/index.scss'

// helpers
import { $fm } from './utils/app.js'
import { makeStore } from './store'

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

  // mixins
  Vue.prototype.$fm = $fm
  Vue.prototype.$store = makeStore(siteData)

  // components
  require('./components')
}
