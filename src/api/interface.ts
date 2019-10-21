import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {YiguanaDocument} from '../dynamodb/yiguana-document'
import {User} from '../entity/user'

export interface YiguanaObjectApi<
  T extends YiguanaDocument,
  GK,
  GU = unknown,
  G = Partial<GK> & NextKey,
  Y = YiguanaDocument,
  H = Pick<YiguanaDocument, 'hk'>,
  > {
  list(gsi: G): Promise<PaginationResult<T>>
  create(input: {data, user: User}): Promise<T>
  read(input: {data: {hk: string}}): Promise<T>
  update(input: {data: H & Partial<T>, user?: User}): Promise<T|undefined> // post 그리고 comment에서 같이 쓰기 위해 일단 user optional 처리
  del(input: {data: H, user: User}): Promise<boolean>
  like(input: {data: H}): Promise<T|undefined>
  unlike(input: {data: H}): Promise<T|undefined>
  view(input: {data: H}): Promise<T|undefined>
}

type NextKey = {
  exclusiveStartKey?: Exclude<any, string | number>
}
