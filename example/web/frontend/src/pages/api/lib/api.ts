export function api<T>(input: RequestInfo, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      authorization: localStorage.user
    }
  })
    .then<T>(async response => {
      if (response.status >= 400) {
        throw new Error(await response.text())
      }

      return response.json()
    })
}