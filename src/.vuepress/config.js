const { description } = require('../../package')

/**
 * @see https://v1.vuepress.vuejs.org/config/#title
 * @see https://v1.vuepress.vuejs.org/config/#description
 * @see https://v1.vuepress.vuejs.org/config/#head
 * @see https://v1.vuepress.vuejs.org/theme/default-theme-config.html
 * @see https://v1.vuepress.vuejs.org/zh/plugin/
 */
module.exports = {
  title: 'Dave Stewart',

  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    // settings
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,

    // navigation
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Config',
        link: '/config/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],

    // sidebar
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },

  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
