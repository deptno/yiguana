import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {Reply as TReply} from '../../../../../src/entity/reply'
import * as R from 'ramda'
import {Reply} from './Reply'
import {ReplyWriter} from '../board/ReplyWriter'

export const Replies: FunctionComponent<Props> = props => {
  const {commentId} = props
  const [{items, nextToken}, setResponse] = useState({items: [] as TReply[], nextToken: undefined})
  const getComments = useCallback(() => {
    if (commentId) {
      fetch(`/api/comment/${commentId}/replies`)
        .then(response => response.json())
        .then(R.tap(R.compose(console.table, R.prop('items'))))
        .then(setResponse)
    }
  }, [commentId])

  useEffect(getComments, [commentId])

  return (
    <div className="comment-writer mb2 ph2 ph3-ns pv3 bg-white flex flex-column b--hot-pink bt bw1">
      <div className="flex flex-column bg-white">
        <h2 className="ma0 f5">
          <i className="far fa-comment-dots"/> 답글 ({items.length})
        </h2>
        <ReplyWriter commentId={commentId} onCreate={getComments}/>
      </div>
      <div className="">
        <div className="pointer hover-hot-pink" onClick={getComments}>
          <i className="fas fa-sync-alt"/> 새 답글 확인
        </div>
        {items.map(reply => <Reply key={reply.hk} data={reply}/>)}
      </div>
    </div>
  )
}

type Props = {
  commentId: string
}
