import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'

export const Board: FunctionComponent<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/posts']

    if (nextToken) {
      url.push(qs.stringify({nextToken}))
    }
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }
  const getCurrentPosts = useCallback(() => getPosts(token), [token])
  const getNextPosts = useCallback(() => getPosts(nextToken), [nextToken])
  const buttonText = useMemo(
    () => nextToken
      ? '더 보기'
      : '처음으로',
    [nextToken],
  )

  useEffect(getNextPosts, [])

  return (
    <div className="">
      <div className="pl0 flex-column justify-center items-center list mv0">
        <BoardItemHeader/>
        {items.map((item, i) => <BoardItem key={item.hk} item={item} no={i + 1} onDelete={getCurrentPosts}/>)}
        {items.length === 0 && (
          <div
            className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100"
          >
            글이 없습니다.
          </div>
        )}
        <LineButton onClick={getNextPosts}>{buttonText}</LineButton>
      </div>
    </div>
  )
}

type Props = {}
