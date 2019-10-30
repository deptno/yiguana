export const get = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  }
}
export const set = (key: string, newValue) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, newValue)
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue,
      oldValue: get(key),
    }))
  }
}
