import React, {FunctionComponent, useCallback, useContext, useMemo, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Member, Reply as TReply} from '../../../../../../lib/entity'
import {StorageContext} from '../../context/StorageContext'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import cx from 'classnames'
import {BlockRequest} from '../BlockRequest'
import * as R from 'ramda'
import {MentionWriter} from '../board/MentionWriter'
import mutationDeletePost from '../../../../../../graphql/mutation/deletePost.graphql'

export const Reply: FunctionComponent<Props> = props => {
  const {data, onLike, onCreate, onDelete} = props
  const {hk, rk, postId, content, createdAt, likes, user, userId, status} = data
  const deleted = status?.startsWith('blocked') || status?.startsWith('deleted')
  const {ip, name} = user
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
  const [deleteComment] = useMutation(gql`${mutationDeletePost}`)
  const del = useCallback((e) => {
    e.preventDefalut()
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
          <strong className="">{name} 님</strong>
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
                <a className="pointer" onClick={() => setShowWriter(!showWriter)}>언급</a>
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
        {showWriter && <MentionWriter postId={postId} commentId={hk} refUserName={name} onCreate={onCreate}/>}
      </div>
    </div>
  )
}

type Props = {
  parent?: boolean
  data: TReply
  onLike(id: string): void
  onCreate(): void
  onDelete(): void
}
