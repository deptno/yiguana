import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'
import {Comment} from './Comment'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {Reply as TReply} from '../../../../../src/entity/reply'
import * as R from 'ramda'
import {CommentWriter} from '../board/CommentWriter'
import {api} from '../../pages/api/lib/api'
import {Reply} from './Reply'

export const Comments: FunctionComponent<Props> = props => {
  const {postId} = props
  const [{items, nextToken}, setResponse] = useState({items: [] as (TComment | TReply)[], nextToken: undefined})
  const getComments = useCallback(() => {
    if (postId) {
      api(`/api/post/${postId}/comments`)
        .then(R.tap(R.compose(console.table, R.prop('items'))))
        .then(setResponse)
        .catch(alert)
    }
  }, [postId])
  const like = (id) => {
    api<TComment>(`/api/comment/${id}/like`, {method: 'post'})
      .then(comment => {
        setResponse({
          items: items.map(c => {
            if (c.hk === comment.hk) {
              return comment
            }
            return c
          }),
          nextToken,
        })
      })
      .catch(alert)
  }

  useEffect(getComments, [postId])

  return (
    <>
      <div className="comment-writer mv3 ph2 ph3-ns pv3 bg-white flex flex-column mt3 pv3 b--hot-pink bt bw1">
        <h2 className="mb2 f4">
          <i className="far fa-comment-dots"/>댓글
        </h2>
        <CommentWriter postId={postId} onCreate={getComments}/>
      </div>
      <div className="mh2 mv3 flex flex-column">
        <ul className="list ph0">
          <li className="pointer hover-hot-pink" onClick={getComments}>
            <i className="fas fa-sync-alt"/> 새 댓글 확인
          </li>
          {items.map(commentOrReply => {
            if ('commentId' in commentOrReply) {
              return (
                <li key={commentOrReply.hk} className="pl4 comment mv2 f6 flex">
                  <div className="flex-auto flex flex-column">
                    <Reply key={commentOrReply.hk} data={commentOrReply} onLike={like}/>
                  </div>
                </li>
              )
            }
            return <Comment key={commentOrReply.hk} data={commentOrReply} onLike={like}/>
          })}
        </ul>
      </div>
    </>
  )
}

type Props = {
  postId: string
}
