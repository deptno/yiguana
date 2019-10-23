import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from 'querystring'

export const Board: FunctionComponent<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const getPosts = useCallback(() => {
    const url = ['api/posts']

    if (nextToken) {
      url.push(qs.stringify({nextToken}))
    }

    fetch(url.join('?'))
      .then(res => res.json())
      .then(setResponse)
  }, [nextToken])

  useEffect(getPosts, [])


  return (
    <div className="">
      <ul className="pl0 flex-column justify-center items-center list mv0">
        <BoardItemHeader/>
        {items.map((item, i) => <BoardItem key={item.hk} item={item} no={i + 1}/>)}
        {items.length === 0 && (
          <li
            className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100">
            글이 없습니다.
          </li>
        )}
        <LineButton onClick={getPosts}>
          {
            nextToken
              ? '더 보기'
              : '처음으로'
          }
        </LineButton>
      </ul>
    </div>
  )
}

type Props = {}
