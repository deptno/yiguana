export function tap(fx) {
  return (args) => {
    fx(args)

    return args
  }
}