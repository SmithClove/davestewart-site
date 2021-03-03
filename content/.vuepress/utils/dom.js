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
