export function table(tableName: string, data: any[]) {
  console.log(`> ${tableName}`)
  console.table(data)
}
