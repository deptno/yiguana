import {YiguanaStore} from '../store/dynamodb/dynamodb'
import {Post} from '../entity/post'
import {EntityFactory} from '../entity'

export async function addComment(store: YiguanaStore<Post>, ep: EntityFactory, input: unknown) {

}

export type ApiAddComment = (input: unknown) => Promise<unknown>
