export function objOf(prop: string) {
  return (args) => {
    return {
      [prop]: args,
    }
  }
}