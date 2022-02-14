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
    if (value !== null) {
      try {
        return typeof value === 'string'
          ? JSON.parse(value)
          : value
      }
      catch (err) {
        console.warn(`Warning: Invalid JSON for storage.get('${key}'): `, JSON.stringify(value))
      }
    }
    return defaults
  },

  remove (key) {
    s.removeItem(key)
  }
}
