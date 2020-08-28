export function tapAwait<O>(fx) {
  return (args: O): Promise<O> => {
    return fx(args).then(() => args)
  }
}