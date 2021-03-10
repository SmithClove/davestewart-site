import { getValue } from './object.js'

// ---------------------------------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------------------------------

export function fm (page, path, defaultValue) {
  const value = getValue(page.frontmatter, path)
  return typeof value !== 'undefined'
    ? value
    : defaultValue
}

// ---------------------------------------------------------------------------------------------------------------------
// mixins
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @augments Vue
 * @param   {string}  path
 * @param   {*}       defaultValue
 * @returns {*}
 */
export function $fm (path, defaultValue) {
  return fm(this.$page || {}, path, defaultValue)
}
