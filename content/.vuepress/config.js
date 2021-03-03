const hq = require('alias-hq')
const { description } = require('../../package')
const { link, meta, isDev } = require('./utils/config.js')

/**
 * @see https://v1.vuepress.vuejs.org/config/#title
 * @see https://v1.vuepress.vuejs.org/config/#description
 * @see https://v1.vuepress.vuejs.org/config/#head
 * @see https://v1.vuepress.vuejs.org/theme/default-theme-config.html
 * @see https://v1.vuepress.vuejs.org/zh/plugin/
 * @see https://github.com/markdown-it/markdown-it
 */
module.exports = {
  title: 'Dave Stewart',

  description: description,

  globalLayout: require('path').resolve(__dirname, './layouts/Global.vue'),

  head: [
    meta('theme-color', '#ea4848'),
    meta('apple-mobile-web-app-capable', 'yes'),
    meta('apple-mobile-web-app-status-bar-style', 'black'),
    link('shortcut icon', '/favicon.svg'),
  ],

  configureWebpack: {
    devtool: isDev
      ? 'source-map'
      : undefined,
    resolve: {
      alias: hq.get('webpack'),
    },
  },

  plugins: [
    require('./plugins/media.js'),
  ],

  markdown: {
    typographer: true,

    anchor: {
      permalink: false,
    },

    extendMarkdown: md => {
      md.use(require('./plugins/strip-h1.js'))
    },
  },
}
