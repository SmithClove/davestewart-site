const hq = require('alias-hq')
const { description } = require('../../package')
const { link, meta, script, isDev } = require('./utils/config.js')

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
    meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'),
    link('shortcut icon', '/favicon.svg'),
    script('https://plausible.io/js/plausible.js', {
      'data-domain': 'davestewart.co.uk',
      async: 1,
      defer: 1,
    })
  ],

  shouldPrefetch (file, type) {
    return type === 'script' || type === 'style' || type === 'font'
  },

  additionalPages: [
    {
      path: '/search/',
      title: 'Search',
      frontmatter: {
        layout: 'search'
      }
    }
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
    require('./plugins/vuepress/media.js').plugin,
    [require('./plugins/vuepress/metatags.js'), {
      site: {
        name   : 'Dave Stewart',
        twitter: 'dave_stewart',
      },
      canonical_base: 'https://davestewart.co.uk',
      image_sources: [
        (page) => {
          const media = page.frontmatter.media
          const thumb = media && media.thumbnail && media.thumbnail.path
          return thumb
            ? '~' + page.regularPath + thumb.replace(/\.\//, '')
            : ''
        }
      ]
    }],
  ],

  markdown: {
    typographer: true,

    anchor: {
      permalink: false,
    },

    extendMarkdown: md => {
      md.use(require('./plugins/markdown/titles.js').plugin)
    },
  },
}
