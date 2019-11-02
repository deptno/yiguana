import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from 'react'
import {Comment as CommentComponent} from './Comment'
import {Comment} from '../../../../../src/entity/comment'
import * as R from 'ramda'
import {CommentWriter} from '../board/CommentWriter'
import {api} from '../../pages/api/lib/api'

export const Comments: FunctionComponent<Props> = props => {
  const {postId} = props
  const [{items, nextToken}, setResponse] = useState({items: [] as Comment[], nextToken: undefined})
  const getComments = useCallback(() => {
    if (postId) {
      api(`/api/post/${postId}/comments`)
        .then(R.tap(R.compose(console.table, R.prop('items'))))
        .then(setResponse)
        .catch(alert)
    }
  }, [postId])

  useEffect(getComments, [postId])

  return (
    <>
      <div className="comment-writer mv3 ph2 ph3-ns pv3 bg-white flex flex-column mt3 pv3 b--hot-pink bt bw1">
        <h2 className="ma0 f4">
          <i className="far fa-comment-dots"/>댓글
        </h2>
        <CommentWriter postId={postId} onCreate={getComments}/>
      </div>
      <div className="mh2 mv3 flex flex-column">
        <ul className="list ph0">
          <li className="pointer hover-hot-pink" onClick={getComments}>
            <i className="fas fa-sync-alt"/> 새 댓글 확인
          </li>
          {items.map(comment => <CommentComponent key={comment.hk} data={comment}/>)}
        </ul>
      </div>
    </>
  )
}

type Props = {
  postId: string
}
