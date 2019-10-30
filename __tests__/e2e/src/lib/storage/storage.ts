export const get = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  }
}
export const set = (key: string, value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value)
    window.dispatchEvent(new Event('storage'))
  }
}
