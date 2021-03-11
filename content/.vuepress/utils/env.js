export function isMac () {
  return navigator.platform.toLowerCase().includes('mac')
}

// this really means "is small screen"
export function isMobile () {
  return window.innerWidth < 450 || window.innerHeight < 450
}

export function isDesktop () {
  return window.innerWidth > 450
}

export function isClient () {
  return globalThis.window
}

export function isServer () {
  return !isClient()
}
