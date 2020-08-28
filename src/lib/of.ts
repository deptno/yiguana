export function of(prop: string) {
  return (args) => {
    return {
      [prop]: args,
    }
  }
}