import React, {forwardRef, RefForwardingComponent, useCallback, useEffect, useImperativeHandle, useState} from 'react'
import {Reply as TReply} from '../../../../../src/entity/reply'
import * as R from 'ramda'
import {Reply} from './Reply'
import {api} from '../../pages/api/lib/api'

const RepliesRefComponent: RefForwardingComponent<RepliesHandle, Props> = (props, ref) => {
  const {commentId} = props
  const [{items, nextToken}, setResponse] = useState({items: [] as TReply[], nextToken: undefined})
  const getComments = useCallback(() => {
    if (commentId) {
      api(`/api/comment/${commentId}/replies`)
        .then(R.tap(R.compose(console.table, R.prop('items'))))
        .then(setResponse)
        .catch(alert)
    }
  }, [commentId])
  const like = (id) => {
    api<TReply>(`/api/reply/${id}/like`, {method: 'post'})
      .then(reply => {
        setResponse({
          items: items.map(c => {
            if (c.hk === reply.hk) {
              return reply
            }
            return c
          }),
          nextToken
        })
      })
      .catch(alert)
  }

  useEffect(getComments, [commentId])
  useImperativeHandle(ref, () => ({getComments}), [commentId])

  return (
    <div className="pa2 flex flex-column lh-copy bg-near-white br2">
      <div className="ph2 ph3-ns pv1 bg-white flex flex-column">
        <div className="flex bg-white mv2">
          <div className="pointer hover-hot-pink mh2 ml-auto" onClick={getComments}>
            <i className="fas fa-sync-alt"/> 새 답글 확인
          </div>
        </div>
        {items.map(reply => <Reply key={reply.hk} data={reply} onLike={like}/>)}
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
