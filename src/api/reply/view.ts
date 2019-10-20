import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'

export async function view(store: YiguanaStore<Post>, ep: EntityFactory, input: PostUserInput) {
  try {
    const content = await ep.createPostContent(input)
    const post = ep.createPost({data: content})
    const result = store.addPost({data: post})

    return result
  } catch (e) {
    console.error(e)
  }

  /* ramda version
   return ep.createPostContent(input)
   .then(R.objOf('data'))
   .then(ep.createPost)
   .then(R.objOf('post'))
   .then(store.addPost)
   .catch(console.error)
   */
}

export type ApiAddPost = (input: PostUserInput) => Promise<unknown>
