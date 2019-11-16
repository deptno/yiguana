import React, {FunctionComponent, useEffect, useState} from 'react'
import {Comment} from './Comment'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {Reply as TReply} from '../../../../../src/entity/reply'
import {CommentWriter} from '../board/CommentWriter'
import {Reply} from './Reply'
import {useLazyQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const Comments: FunctionComponent<Props> = props => {
  const {postId} = props
  const [{items, cursor}, setResponse] = useState({items: [] as (TComment | TReply)[], cursor: undefined})
  const [getCommentsQuery, {data}] = useLazyQuery(gql`
    query ($postId: String!, $cursor: String) {
      comments(postId: $postId, cursor: $cursor) {
        items {
          hk
          rk
          content
          postId
          userId
          createdAt
          updatedAt
          children
          likes
          user {
            id
            ip
            name
            pw
          }
          commentId
          deleted
        } cursor
        firstResult
      }
    }
  `)
  const getComments = () => getCommentsQuery({variables: {postId}})
  const [likeMutation, {data: liked}] = useMutation(gql`
    mutation ($hk: String!) {
      likeComment(hk: $hk) {
        children
        commentId
        content
        createdAt
        deleted
        hk
        likes
        postId
        rk
        updatedAt
        user {
          id
          ip
          name
          pw
        }
        userId
      }
    }
  `)

  useEffect(getComments, [postId])
  useEffect(() => {
    if (data) {
      setResponse(data.comments)
    }
  }, [data])

  const like = (hk) => {
    likeMutation({variables: {hk}}).catch(console.error)
  }
  useEffect(() => {
    if (liked) {
      console.log({liked})
      setResponse({
        items: items.map(c => {
          if (c.hk === liked.likeComment.hk) {
            return liked.likeComment
          }
          return c
        }),
        cursor,
      })
    }
  }, [liked])

  return (
    <>
      <div className="mh2 mv3 flex flex-column">
        <span className="mb2">
          <i className="far fa-comment-dots"/>댓글
          <small className="mh2">
            <i className="fas fa-sync-alt"/> 새 댓글 확인
          </small>
        </span>
        <ul className="list ph0">
          {items.map(commentOrReply => {
            if ((commentOrReply as TReply).commentId) {
              return (
                <li key={commentOrReply.hk} className="pl4 comment mv2 f6 flex">
                  <div className="flex-auto flex flex-column">
                    <Reply key={commentOrReply.hk} data={commentOrReply as TReply} onLike={like}
                           onDelete={getComments}/>
                  </div>
                </li>
              )
            }
            return (
              <Comment
                key={commentOrReply.hk}
                data={commentOrReply as TComment}
                onLike={like}
                onCreate={getComments}
              />
            )
          })}
        </ul>
      </div>
      <div className="comment-writer mv3 ph2 ph3-ns pv3 bg-white flex flex-column mt3 pv3 b--hot-pink bt bw1">
        <CommentWriter postId={postId} onCreate={getComments}/>
      </div>
    </>
  )
}

type Props = {
  postId: string
}
