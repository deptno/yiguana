export function then<O>(out: (one) => O) {
  return async (args: PromiseLike<unknown>): Promise<O> => {
    return args.then(out)
  }
}