import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {YiguanaDocument} from '../dynamodb/yiguana-document'

export interface YiguanaObjectApi<
  T,
  GK,
  GU = unknown,
  G = Partial<GK> & NextKey,
  Y = YiguanaDocument,
  H = Pick<YiguanaDocument, 'hk'>,
  > {
  list(gsi: G): Promise<PaginationResult<T>>
  create(...args): Promise<T>
  read(...args): Promise<T>
  update(...args): Promise<T>
  del(...args): Promise<T>
  like({data: H}): Promise<T>
  unlike({data: H}): Promise<T>
  view({data: H}): Promise<T>
}

type NextKey = {
  exclusiveStartKey?: Exclude<any, string | number>
}