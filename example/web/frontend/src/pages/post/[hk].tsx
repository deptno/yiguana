import React, {useCallback, useEffect, useState} from 'react'
import {NextPage} from 'next'
import {Post as TPost} from '../../../../../../lib/entity'
import {Comments} from '../../components/post/Comments'
import {useRouter} from 'next/router'
import {LineLink} from '../../components/board/LineLink'
import {Post} from '../../components/post/Post'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import queryPost from '../../../../../../graphql/query/post.graphql'

const PostPage: NextPage<Props> = props => {
  const {query} = useRouter()
  const postId = query.hk as string
  const [post, setPost] = useState<TPost>()
  const [getPostQuery, {data, loading}] = useLazyQuery(gql`${queryPost}`)
  const getPost = useCallback(() => {
    if (postId) {
      getPostQuery({variables: {hk: postId}})
    }
  }, [postId])

  useEffect(getPost, [postId])
  useEffect(() => {
    if (data) {
      setPost(data.post)
    }
  }, [data])

  return (
    <div className="pa3 flex-column">
      <Post data={post}/>
      <LineLink href="/">목록으로</LineLink>
      <Comments postId={postId} count={post?.children}/>
    </div>
  )
}
export default PostPage

type Props = {}
