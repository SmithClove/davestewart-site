/**
 * Default setup
 *
 * +- docs
 *    +- .vuepress
 *        +- theme
 *        +- public
 *        +- dest
 */
module.exports = {
  sourceDir: '$src',
  vuepressDir: '$src/.vuepress',
  themeDir: '$src/.vuepress/theme',
  publicDir: '$src/.vuepress/public',
  destDir: '$src/.vuepress/dest',
}

/**
 * Nuxt-like
 *
 * +- app
 * +- dest
 * +- content
 * +- public
 * +- theme
 */
module.exports = {
  sourceDir: 'content',
  vuepressDir: 'app',
  themeDir: 'theme',
  publicDir: 'public',
  destDir: 'dest',
}

/**
 * Developer-centric
 *
 * +- dest
 * +- public
 * +- src
 *    +- vuepress
 *    +- theme
 *    +- docs
 */
module.exports = {
  sourceDir: 'src/docs',
  vuepressDir: 'src/vuepress',
  themeDir: 'src/theme',
  publicDir: 'public',
  destDir: 'dest',
}

/**
 * Author-centric
 *
 * +- content
 * +- site
 * +- vuepress
 *    +- theme
 *    +- public
 */
module.exports = {
  sourceDir: 'src/docs',
  vuepressDir: 'src/vuepress',
  themeDir: 'src/theme',
  publicDir: 'public',
  destDir: 'dest',
}

/**
 * Vuepress-centric
 *
 * +- content
 * +- dest
 * +- vuepress
 *      +- app
 *      +- public
 *      +- theme
 */
module.exports = {
  sourceDir: 'content',
  vuepressDir: 'vuepress/app',
  themeDir: 'vuepress/theme',
  publicDir: 'vuepress/public',
  destDir: 'dest',
}
