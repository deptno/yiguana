import React, {FunctionComponent, useCallback, useContext, useMemo, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Comment as TComment, Member} from '../../../../../../lib/entity'
import {ReplyWriter} from '../board/ReplyWriter'
import {StorageContext} from '../../context/StorageContext'
import {useMutation} from '@apollo/react-hooks'
import cx from 'classnames'
import gql from 'graphql-tag'
import {BlockRequest} from '../BlockRequest'
import * as R from 'ramda'

export const Comment: FunctionComponent<Props> = props => {
  const {data, onLike, onCreate} = props
  const {hk, rk, postId, content, userId, createdAt, updatedAt = createdAt, children, likes, user, status} = data
  const {name, ip} = user
  const deleted = status?.startsWith('blocked') || status?.startsWith('deleted')
  const [showWriter, setShowWriter] = useState(false)
  const [showReporter, setShowReporter] = useState(false)
  const context = useContext(StorageContext)
  const deletable = useMemo(() => {
    if (context.user) {
      if ('id' in context.user) {
        return (context.user as Member)?.id === userId
      }
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
      deleteComment({variables: {commentId: hk}}).then(onCreate)
    }
  }, [hk])

  return (
    <li className="comment mv2 f6 flex">
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
          <strong className="">{name} 님</strong>
          <div className="ml-auto">
            <span>
              <i
                className="mh1 pv1 far fa-clock black-60"/>{formatDistanceToNow(parseISO(updatedAt ?? createdAt), {locale})} 전
            </span>
            ﹒
            <span>{ip}</span>
            {!deleted && (
              <>
                ﹒
                <a className="pointer" onClick={() => onLike(hk)}>공감({likes})</a>
                ﹒
                <a className="pointer" onClick={() => setShowWriter(!showWriter)}>답글 작성</a>
                ﹒
                <a className="pointer red" onClick={() => setShowReporter(!showReporter)}>신고</a>
                ﹒
                {deletable && <a className="red pointer" onClick={del}>삭제</a>}
              </>
            )}
          </div>
        </header>
        <main className="pa2 bg-white br2 br--bottom">
          <pre className="ma0 pa2 ws-normal" dangerouslySetInnerHTML={{__html: content}}/>
        </main>
        <pre className="debug">{JSON.stringify(data, null, 2)}</pre>
        {showReporter && <BlockRequest data={R.pick(['hk', 'rk'], data)} onRequest={() => setShowReporter(false)}/>}
        {showWriter && <ReplyWriter postId={postId} commentId={hk} onCreate={onCreate}/>}
      </div>
    </li>
  )
}

type Props = {
  data: TComment
  onLike(id: string): void
  onCreate(): void
}
