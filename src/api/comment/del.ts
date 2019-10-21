import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {PostInput} from '../../store/dynamodb/post'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function del(store: YiguanaStore, ep: EntityFactory, input: DelInput) {
  return store.removeComment(input.data)
}

export type DelInput = {
  data: YiguanaDocumentHash
}
