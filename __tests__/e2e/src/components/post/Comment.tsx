import React, {FunctionComponent, useContext, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {ReplyWriter} from '../board/ReplyWriter'
import {StorageContext} from '../../context/StorageContext'
import {Member} from '../../../../../src/entity/user'

export const Comment: FunctionComponent<Props> = props => {
  const {data, onLike, onCreate} = props
  const {hk, rk, postId, content, userId, createdAt, updatedAt = createdAt, children, likes, user} = data
  const {name, ip} = user
  const [showWriter, setShowWriter] = useState(false)
  const context = useContext(StorageContext)
  const isAuthor = (context.user as Member)?.id === userId

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
      <div className="flex-auto flex flex-column">
        <header className="pa2 flex lh-copy bg-near-white br2 br--top">
          <strong className="">{name} 님</strong>
          <div className="ml-auto">
            <span>
              <i className="mh1 pv1 far fa-clock black-60"/>{formatDistanceToNow(parseISO(updatedAt), {locale})} 전
            </span>
            ﹒
            <span>{ip}</span>
            ﹒
            <a className="pointer" onClick={() => onLike(hk)}>공감({likes})</a>
            ﹒
            <a className="pointer" onClick={() => setShowWriter(!showWriter)}>답글 작성</a>
            ﹒
            <span className="red">신고(미구현)</span>
            ﹒
            {isAuthor && <span className="red">삭제(미구현)</span>}
          </div>
        </header>
        <main className="pa2 bg-white br2 br--bottom">
          <pre className="ma0 pa2" dangerouslySetInnerHTML={{__html: content}}/>
        </main>
        <pre className="debug">{JSON.stringify(data, null, 2)}</pre>
        {showWriter && <ReplyWriter postId={postId} commentCreatedAt={createdAt} commentId={hk} onCreate={onCreate}/>}
      </div>
    </li>
  )
}

type Props = {
  data: TComment
  onLike(id: string): void
  onCreate(): void
}
