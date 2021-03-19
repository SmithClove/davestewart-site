// fix bug
import pageComponents from '@internal/page-components'

// @see https://github.com/vuejs/vuepress/issues/1173#issuecomment-470534176
// @see https://github.com/vuejs/vuepress/issues/2139
export default ({ Vue }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
