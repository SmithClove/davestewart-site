export function getElements (selector, element = undefined) {
  return Array.from((element || document).querySelectorAll(selector))
}

export function setElementBounds (element, bounds) {
  element.style.width = px(bounds.width)
  element.style.height = px(bounds.height)
  element.style.left = px(bounds.x)
  element.style.top = px(bounds.y)
}

export function copyLayout (source, target) {
  const style = document.defaultView.getComputedStyle(source, '')
  const props = ['width', 'height', 'margin', 'padding']
  props.forEach(key => {
    target.style[key] = style[key]
  })
}

export function px (value) {
  value = String(value)
  return !value.endsWith('px')
    ? value + 'px'
    : value
}

export function createElement (tagName, attrs = {}) {
  const el = document.createElement(tagName)
  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key])
  })
  return el
}
