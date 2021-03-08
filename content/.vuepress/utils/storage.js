const s = localStorage

export const storage = {
  set (key, value) {
    s.setItem(key, JSON.stringify(value))
  },

  get (key, defaults = undefined) {
    const value = s.getItem(key)
    return value !== null
      ? JSON.parse(value)
      : defaults
  }
}
