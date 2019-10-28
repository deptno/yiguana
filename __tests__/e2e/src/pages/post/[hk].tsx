import React, {useCallback, useEffect, useState} from 'react'
import {NextPage} from 'next'
import {Post as TPost} from '../../../../../src/entity/post'
import {Comments} from '../../components/post/Comments'
import {useRouter} from 'next/router'
import * as R from 'ramda'
import {LineLink} from '../../components/board/LineLink'
import {Post} from '../../components/post/Post'

const PostPage: NextPage<Props> = props => {
  const {query} = useRouter()
  const postId = query.hk as string
  const [post, setPost] = useState<TPost>()
  const getPost = useCallback(() => {
    if (postId) {
      fetch(`/api/post/${postId}`)
        .then(response => response.json())
        .then(R.tap(console.log))
        .then(setPost)
    }
  }, [postId])

  useEffect(getPost, [postId])

  return (
    <div className="pa3 flex-column">
      <Post data={post} setPost={setPost}/>
      <LineLink href="/">목록으로</LineLink>
      <Comments postId={postId}/>
    </div>
  )
}
export default PostPage

type Props = {}
