import React, {FunctionComponent, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {Replies} from './Replies'
import {CommentWriter} from '../board/CommentWriter'

export const Comment: FunctionComponent<Props> = props => {
  const {data} = props
  const {hk, rk, postId, content, userId, createdAt, updatedAt, priority, children, likes, order} = data
  const [showReplies, setShowReplies] = useState(true)

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
            <span>
            <i className="far fa-thumbs-up"/> {likes}
          </span>
            ﹒
            <span>
            <i className="far fa-thumbs-down"/> 비추천
          </span>
          </div>
        </header>
        <main className="pa2 bg-white br2 br--bottom">
          <pre className="ma0 pa2" dangerouslySetInnerHTML={{__html: content}}/>
        </main>
        <footer className="pa2 flex flex-column lh-copy bg-near-white br2">
          {showReplies
            ? (
              <>
                <Replies commentId={hk}/>
                <a className="pointer" onClick={() => setShowReplies(false)}>
                  <i className="fas fa-arrows-alt-v mr2"/> 답글 감추기
                </a>
              </>
            )
            : (
              <a className="pointer" onClick={() => setShowReplies(true)}>
                <i className="fas fa-arrows-alt-v mr2"/> 답글({children}) 보기
              </a>
            )
          }
        </footer>
      </div>
    </li>
  )
}

type Props = {
  data: TComment
}
