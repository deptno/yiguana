export function createOrderKey(key: OrderKey) {
  const {boardName, category = ''} = key
  const date = new Date().toISOString()

  return [boardName, category, date].join('#')
}
export function stringifyOrderKey(key: OrderKey) {
  const {boardName, category = ''} = key
  return [boardName, category].join('#')
}
export function parseOrderKey(key: string): OrderKey {
  return {} as OrderKey
}
type OrderKey = {
  boardName: string
  category?: string
}
