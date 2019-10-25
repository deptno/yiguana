import React, {FunctionComponent, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Reply as TReply} from '../../../../../src/entity/reply'

export const Reply: FunctionComponent<Props> = props => {
  const {data} = props
  const {hk, rk, content, createdAt, likes, order} = data

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
      </div>
    </li>
  )
}

type Props = {
  parent?: boolean
  data: TReply
}
