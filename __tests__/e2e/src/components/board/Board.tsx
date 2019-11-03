import React, {FunctionComponent, useCallback, useEffect, useMemo} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'

export const Board: FunctionComponent<Props> = props => {
  const {items, token, nextToken, getter, category} = props
  const getCurrentPosts = useCallback(() => getter(token), [token, category])
  const getNextPosts = useCallback(() => getter(nextToken), [nextToken, category])
  const buttonText = useMemo(() => nextToken ? '더 보기' : '처음으로', [nextToken, category])

  useEffect(getNextPosts, [category])

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

type Props = {
  items: any[]
  token: string
  nextToken: string
  category?: string
  getter(token: string): void
}
