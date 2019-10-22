import React, {FunctionComponent} from 'react'
import {BoardItem, BoardMore} from './BoardItem'
import {Post} from '../../../../../src/entity/post'
import {BoardItemHeader} from './BoardItemHeader'

export const Board: FunctionComponent<Props> = props => {
  const {items} = props

  return (
    <div className="">
      <ul className="pl0 flex-column justify-center items-center list mv0">
        <BoardItemHeader/>
        {items.map(item => <BoardItem key={item.hk} item={item}/>)}
        {items.length === 0 &&
        <li className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100">
          글이 없습니다.
        </li>
        }
        <BoardMore/>
      </ul>
    </div>
  )
}

type Props = {
  items: Post[]
}
