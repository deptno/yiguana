import React, {FunctionComponent, useCallback, useContext, useMemo, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Reply as TReply} from '../../../../src/entity/reply'
import {StorageContext} from '../../context/StorageContext'
import {Member} from '../../../../src/entity/user'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import cx from 'classnames'
import {BlockRequest} from '../BlockRequest'
import * as R from 'ramda'

export const Reply: FunctionComponent<Props> = props => {
  const {data, onLike, onDelete} = props
  const {hk, rk, content, createdAt, likes, user, userId, deleted} = data
  const {ip, name} = user
  const [showReporter, setShowReporter] = useState(false)
  const context = useContext(StorageContext)
  const deletable = useMemo(() => {
    if ('id' in context.user) {
      return (context.user as Member)?.id === userId
    }
    return true
  }, [context.user])
  const [deleteComment] = useMutation(gql`
    mutation ($commentId: String!) {
      deleteComment(commentId: $commentId) {
        hk
      }
    }
  `)
  const del = useCallback((e) => {
    e.stopPropagation()
    if (confirm('Do you want to delete this comment?')) {
      deleteComment({variables: {commentId: hk}}).then(onDelete)
    }
  }, [hk])

  return (
    <div className="comment mv2 f6 flex">
      <figure className="dn db-ns mv0 ml0 mr2">
        <img
          className="br2"
          src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAQAAACTbf5ZAAAAjElEQVR42u3PQQEAAAQEMNe/qwpU8Lc1WHrqlQgLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLC18twDrnkZ76JJMAAAAASUVORK5CYII='}
          width={40}
          height={40}
        />
      </figure>
      <div className={cx('flex-auto flex flex-column', {'black-30': deleted})}>
        <header className="pa2 flex lh-copy bg-near-white br2 br--top">
          <strong className="">{name}</strong>
          <div className="ml-auto">
            <span>
              <i className="mh1 pv1 far fa-clock black-60"/>{formatDistanceToNow(parseISO(createdAt), {locale})} 전
            </span>
            ﹒
            <span>{ip}</span>
            {!deleted && (
              <>
                ﹒
                <a className="pointer" onClick={() => onLike(hk)}>공감({likes})</a>
                ﹒
                <span>언급(미구현)</span>
                ﹒
                <a className="red" onClick={() => setShowReporter(!showReporter)}>신고</a>
                ﹒
                {deletable && <a className="red pointer" onClick={del}>삭제</a>}
              </>
            )}
          </div>
        </header>
        <main className="pa2 bg-white br2 br--bottom">
          <pre className="ma0 pa2" dangerouslySetInnerHTML={{__html: content}}/>
        </main>
        <pre className="debug">{JSON.stringify(data, null, 2)}</pre>
        {showReporter && <BlockRequest data={R.pick(['hk', 'rk'], data)}/>}
      </div>
    </div>
  )
}

type Props = {
  parent?: boolean
  data: TReply
  onLike(id: string): void
  onDelete(): void
}
