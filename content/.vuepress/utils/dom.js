import { isMac } from './env.js'

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
  return event.key.toLowerCase().startsWith('esc')
}

export function getKeyText (event) {
  const charCode = event.keyCode || event.which
  return String.fromCharCode(charCode) || ''
}
