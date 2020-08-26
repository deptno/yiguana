import React, {FunctionComponent} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'

export const Board: FunctionComponent<Props> = props => {
  const {items} = props
  const refresh = console.log

  return (
    <>
      <BoardItemHeader/>
      {items.map((item, i) => <BoardItem key={item.hk} item={item} no={i + 1} onDelete={refresh}/>)}
      {items.length === 0 && (
        <div
          className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100"
        >
          글이 없습니다.
        </div>
      )}
    </>
  )
}

type Props = {
  items: any[]
}
