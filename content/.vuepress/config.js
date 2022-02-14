const hq = require('alias-hq')
const { getValue } = require('./utils/object.js')
const { description } = require('../../package')
const { link, meta, script, isDev } = require('./utils/config.js')
const { setType, setDate, setStatus, setParentPath, setGetters, setPermalink } = require('./store/classes/Page.js')

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
    // mobile
    meta('theme-color', '#ea4848'),
    meta('apple-mobile-web-app-capable', 'yes'),
    meta('apple-mobile-web-app-status-bar-style', 'black'),
    meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'),

    // site
    link('shortcut icon', '/favicon.svg'),

    // analytics
    script('/stats/js', {
      'data-domain': 'davestewart.co.uk',
      'data-api': '/stats/api/event',
      async: 1,
      defer: 1,
    })
  ],

  shouldPrefetch (file, type) {
    return type === 'script' || type === 'style' || type === 'font'
  },

  extendPageData (page) {
    setType(page)
    setDate(page)
    setStatus(page)
    setGetters(page)
    setParentPath(page)
    setPermalink(page)
  },

  additionalPages: [
    {
      path: '/search/',
      title: 'Search',
      frontmatter: {
        layout: 'search'
      }
    },
    {
      path: '/sitemap/',
      title: 'Site map',
      frontmatter: {
        layout: 'folder',
        regularPath: '/',
        format: 'text'
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

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 1024 * 3
        return options
      })
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
          const path = getValue(media, 'opengraph.path') || getValue(media, 'featured.path') || getValue(media, 'thumbnail.path')
          return path
            ? page.regularPath + path.replace(/\.\//, '')
            : '/assets/img/site-preview.png'
        }
      ]
    }],
    ['@renovamen/vuepress-plugin-reading-time', {
      wordsPerMinuteEN: 200,
      includes: ['/blog/*']
    }]
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
