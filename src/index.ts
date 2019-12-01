import {createApi} from './api'

export {createApi} from './api'
export {EEntityStatus} from './type'
export {User, Comment, Post, Report} from './entity'
export {YiguanaDocument, YiguanaDocumentHash, YiguanaDocumentHashRange} from './dynamodb'

export function createYiguana() {
  return createApi
}
export {EEntity} from './type'