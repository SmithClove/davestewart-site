// provide proxy for server
const noop = () => ({})
const s = globalThis.localStorage || { setItem: noop, getItem: noop, removeItem: noop }

// actual storage
export const storage = {
  set (key, value) {
    s.setItem(key, JSON.stringify(value))
  },

  get (key, defaults = undefined) {
    const value = s.getItem(key)
    return value !== null
      ? JSON.parse(value)
      : defaults
  },

  remove (key) {
    s.removeItem(key)
  }
}
