import React, {FunctionComponent, useRef, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {Replies, RepliesHandle} from './Replies'
import {ReplyWriter} from '../board/ReplyWriter'
import {api} from '../../pages/api/lib/api'

export const Comment: FunctionComponent<Props> = props => {
  const {data, onLike} = props
  const {hk, rk, postId, content, userId, createdAt, updatedAt, priority, children, likes, order} = data
  const [showReplies, setShowReplies] = useState(false)
  const [showWriter, setShowWriter] = useState(false)
  const ref = useRef<RepliesHandle>()

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
          <strong className="">{name}</strong>
          <div className="ml-auto">
            <span>
              <i className="mh1 pv1 far fa-clock black-60"/>{formatDistanceToNow(parseISO(createdAt), {locale})} 전
            </span>
            ﹒
            <span>아이피</span>
            ﹒
            <a className="pointer" onClick={() => onLike(hk)}>
              추천({likes})
            </a>
            ﹒
            <span>
            <del>비추천(0)</del>
          </span>
            ﹒
            <span>
          {showReplies
            ? <a className="pointer" onClick={() => setShowReplies(false)}>답글 감추기</a>
            : <a className="pointer" onClick={() => setShowReplies(true)}>답글({children}) 보기</a>
          }
          </span>
            ﹒
            <span>
            <a className="pointer" onClick={() => setShowWriter(!showWriter)}>답글 작성</a>
          </span>
          </div>
        </header>
        <main className="pa2 bg-white br2 br--bottom">
          <pre className="ma0 pa2" dangerouslySetInnerHTML={{__html: content}}/>
        </main>
        {showWriter && <ReplyWriter commentId={hk} onCreate={() => ref.current.getComments()}/>}
        {showReplies && <Replies ref={ref} commentId={hk}/>}
      </div>
    </li>
  )
}

type Props = {
  data: TComment
  onLike(id: string): void
}
