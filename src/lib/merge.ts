export function merge(args1) {
  return (args2) => {
    return {
      ...args1,
      ...args2,
    }
  }
}