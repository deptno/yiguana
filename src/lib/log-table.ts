export function logTable(width: number, items: any[]) {
  const loggingItems = items.map(t => {
    return Object.entries(t).reduce((obj, [key, value]) => {
      obj[shorter(width, key)] = typeof value === 'string'
        ? shorter(width, value)
        : value
      return obj
    }, {})
  })
  console.table(loggingItems)
}

export function shorter(width: number, v: string) {
  if (v.length > width) {
    const halfWidth = ~~(width / 2) - 1

    return v.slice(0, halfWidth) + '..' + v.slice(v.length - halfWidth)
  }
  return v
}