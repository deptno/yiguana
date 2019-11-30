import {createApi} from './api'
export {createApi} from './api'

export {User, Comment, Post, Report} from './entity'
export {EEntityStatus} from './dynamodb'

export function createYiguana() {
  return createApi
}
