export function createUpdateSet(obj: any, symbolCode = 97) {
  const [exp, keys, values] = Object
    .entries(obj)
    .reduce((sets, [key, value]) => {
      if (typeof value !== 'undefined') {
        if (value || value === 0) {
          const [exp, keys, values] = sets
          const symbol = String.fromCharCode(symbolCode++)
          const [symbolKey, symbolValue] = [`#${symbol}`, `:${symbol}`]

          exp.push(`${symbolKey} = ${symbolValue}`)
          keys[symbolKey] = key
          values[symbolValue] = value
        }
      }
      return sets
    }, [
      [] as string[],
      {} as any,
      {} as any
    ])

  return [
    `SET ${exp.join(', ')}`,
    keys,
    values,
  ]
}
