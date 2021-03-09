export function isMac () {
  return navigator.platform.toLowerCase().includes('mac')
}

export function isMobile () {
  return window.innerWidth < 450
}

export function isDesktop () {
  return window.innerWidth > 450
}
