export interface YiguanaObjectApi {
  list(...args): Promise<any>
  create(...args): Promise<any>
  read(...args): Promise<any>
  update(...args): Promise<any>
  del(...args): Promise<any>
  like(...args): Promise<any>
  view(...args): Promise<any>
}
