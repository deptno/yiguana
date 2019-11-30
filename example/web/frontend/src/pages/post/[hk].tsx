import React, {useCallback, useEffect, useState} from 'react'
import {NextPage} from 'next'
import {Post as TPost} from '../../../../../../src/entity/post'
import {Comments} from '../../components/post/Comments'
import {useRouter} from 'next/router'
import * as R from 'ramda'
import {LineLink} from '../../components/board/LineLink'
import {Post} from '../../components/post/Post'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const PostPage: NextPage<Props> = props => {
  const {query} = useRouter()
  const postId = query.hk as string
  const [post, setPost] = useState<TPost>()
  const [getPostQuery, {data, loading}] = useLazyQuery(gql`
    query ($postId: String!) {
      post(hk: $postId) {
        hk
        rk
        title
        likes
        views
        children
        category
        createdAt
        content
        userId
        user {
          id
          name
        }

        status
      }
    }`)
  const getPost = useCallback(() => {
    if (postId) {
      getPostQuery({variables: {postId}})
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
