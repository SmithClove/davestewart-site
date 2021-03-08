import { isMac } from './env.js'

export function getElements (selector, element = undefined) {
  return Array.from((element || document).querySelectorAll(selector))
}

export function monitorScroll (sourceSelector, targetSelector, top = 0, className = 'is-scrolled') {
  if (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  ) {
    const source = document.querySelector(sourceSelector)
    const target = document.querySelector(targetSelector)
    const observer = new IntersectionObserver(entries => {
      target.classList.toggle(className, window.pageYOffset > top)
    })
    observer.observe(source)
  }
}

export function stopEvent (event) {
  event.preventDefault()
  event.stopImmediatePropagation()
}

export function isModifier (event) {
  return event.shiftKey || (isMac() && event.metaKey) || (!isMac() && event.ctrlKey)
}

export function isNotModifier (event) {
  return !(event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
}

export function isInput (event) {
  return 'input textarea'.split(' ').includes(event.target.tagName.toLowerCase())
}

export function isEscape (event) {
  return String(event.key || key.which).toLowerCase().startsWith('esc')
}

export function isChar (event) {
  return isNotModifier(event) && getKeyChar(event) !== ''
}

export function getKeyChar (event) {
  return event.key.length === 1
    ? event.key
    : ''
}

export function getKeys (event) {
  const tab = event.key === 'Tab'
  const enter = event.key === 'Enter'
  const up = event.key === 'ArrowUp'
  const down = event.key === 'ArrowDown'
  const left = event.key === 'ArrowLeft'
  const right = event.key === 'ArrowRight'
  const shift = event.shiftKey
  const tabPrev = tab && shift
  const tabNext = tab && !shift
  const char = getKeyChar(event)
  const key = event.key

  return {
    tab,
    tabPrev,
    tabNext,
    enter,
    up,
    down,
    left,
    right,
    shift,
    char,
    key,
  }
}

export function getNavigation (event, axis = 'xy') {
  // keys
  const { tabPrev, tabNext, up, down, left, right, enter } = getKeys(event)

  // geometry
  const col = axis.includes('y')
  const row = axis.includes('x')

  // intentions
  const before = col
    ? left
    : row
      ? up
      : up || left
  const after = col
    ? right
    : row
      ? down
      : down || right
  const x = left
    ? -1
    : right
      ? 1
      : 0
  const y = up
    ? -1
    : down
      ?
      1 : 0
  const dir = col
    ? (up ? -1 : down ? 1 : 0)
    : row
      ? (left ? -1 : right ? 1 : 0)
      : 0

  // return
  return {
    up,
    down,
    left,
    right,
    enter,
    before: before || tabPrev,
    after: after || tabNext,
    prev: dir < 0,
    next: dir > 0,
    axis,
    row,
    col,
    dir,
    x,
    y,
  }
}

export function navigateLinks (event, links, objBefore, objAfter, mode = 'xy') {
  // variables
  const navigation = getNavigation(event, mode)
  const { dir, prev, next, before, after } = navigation

  if (before && objBefore) {
    stopEvent(event)
    return objBefore.focus()
  }

  else if (after && objAfter) {
    stopEvent(event)
    return objAfter.focus()
  }

  else if (prev || next) {
    stopEvent(event)
    const index = links.indexOf(event.target)
    if (index > -1) {
      const target = links[index + dir]
      if (target) {
        return target.focus()
      }
      else {
        if (prev && objBefore) {
          return objBefore.focus()
        }
        else if (next && objAfter) {
          return objAfter.focus()
        }
      }
    }
  }
}
