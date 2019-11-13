import React, {FunctionComponent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Comment} from './Comment'
import {Comment as TComment} from '../../../../../src/entity/comment'
import {Reply as TReply} from '../../../../../src/entity/reply'
import * as R from 'ramda'
import {CommentWriter} from '../board/CommentWriter'
import {api} from '../../pages/api/lib/api'
import {Reply} from './Reply'
import {formatDistanceToNow, parseISO} from 'date-fns'
import locale from 'date-fns/locale/ko'
import {LineButton} from '../board/LineButton'
import Link from 'next/link'

export const MyComments: FunctionComponent<Props> = props => {

  const {items, token, cursor, getter} = props
  const getNextItems = useCallback(() => getter(cursor), [cursor])
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])

  useEffect(getNextItems, [])

  return (
    <div className="mh2 mv3 flex flex-column">
      <ul className="list ph0">
        {items.map(commentOrReply => {
          const type = 'commentId' in commentOrReply
            ? '답글'
            : '댓글'
          const {createdAt, likes, content, user: {name, ip}, postId} = commentOrReply
          return (
            <li key={commentOrReply.hk} className="pl4 comment mv2 f6 flex">
              <div className="flex-auto flex flex-column ba">
                <div className="flex-auto flex justify-between">
                  <span className="">{type}</span>
                  <span className="">{name}</span>
                  <span>{formatDistanceToNow(parseISO(createdAt), {locale})} 전</span>
                  <span>{ip}</span>
                  <span className="pointer">공감({likes})</span>
                  <span>언급(미구현)</span>
                  <Link href="/post/[hk]" as={`/post/${postId}`}>
                    <a className="debug">글 보기 -></a>
                  </Link>
                </div>
                <pre className="ma0 pa2" dangerouslySetInnerHTML={{__html: content}}/>
                <pre className="debug">{JSON.stringify(commentOrReply, null, 2)}</pre>
              </div>
            </li>
          )
        })}
        {items.length === 0 && (
          <li
            className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100"
          >
            글이 없습니다.
          </li>
        )}
      </ul>
      <LineButton onClick={getNextItems}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {
  items: any[]
  token: string
  cursor: string
  category?: string
  getter(token: string): void
}
