export function compose<I, O>(out: (one) => O, ...fns) {
  return (args: I): O => {
    const list = fns.slice()
    let result

    if (list.length > 0) {
      const fn = list.pop()
      result = fn(args)

      while (list.length > 0) {
        result = list.pop()(result)
      }

      return out(result)
    }
    return out(args)
  }
}