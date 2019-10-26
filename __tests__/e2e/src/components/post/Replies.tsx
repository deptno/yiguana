import React, {forwardRef, RefForwardingComponent, useCallback, useEffect, useImperativeHandle, useState} from 'react'
import {Reply as TReply} from '../../../../../src/entity/reply'
import * as R from 'ramda'
import {Reply} from './Reply'

const RepliesRefComponent: RefForwardingComponent<RepliesHandle, Props> = (props, ref) => {
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
  useImperativeHandle(ref, () => ({getComments}), [commentId])

  return (
    <div className="pa2 flex flex-column lh-copy bg-near-white br2">
      <div className="ph2 ph3-ns pv3 bg-white flex flex-column b--hot-pink bt bw1">
        <div className="flex bg-white mv2">
          <h2 className="ma0 f5">
            <i className="far fa-comment-dots"/> 답글 ({items.length})
          </h2>
          <div className="pointer hover-hot-pink mh2 ml-auto" onClick={getComments}>
            <i className="fas fa-sync-alt"/> 새 답글 확인
          </div>
        </div>
        {items.map(reply => <Reply key={reply.hk} data={reply}/>)}
      </div>
    </div>
  )
}
export const Replies = forwardRef(RepliesRefComponent)

type Props = {
  commentId: string
}
export type RepliesHandle = {
  getComments(): void
}
