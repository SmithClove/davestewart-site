export function embed (src) {
  return {
    mounted () {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.body.appendChild(script)
      this.script = script
    },

    destroyed () {
      if (this.script) {
        document.body.removeChild(this.script)
      }
    }
  }
}
