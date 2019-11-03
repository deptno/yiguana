import React, {FunctionComponent, useState} from 'react'
import {CategoryBoard} from './CategoryBoard'

export const Boards: FunctionComponent<Props> = props => {
  const [category, setCategory] = useState('')
  const handleCategoryChange = (e) => {
    console.log(e.target.value)
    setCategory(e.target.value)
  }
  const boards = [
    {category: '', name: '전체'},
    {category: 'news', name: '뉴스'},
    {category: 'create-channel', name: '채널 생성 요청'},
    {category: 'user', name: '유저'},
  ]
  return (
    <div className="">
      {boards.map(b => (
        <label className="w4" key={b.category}>
          <input
            className="mr1"
            type="radio"
            value={b.category}
            onChange={handleCategoryChange}
            checked={category === b.category}
          />
          <span>{b.name}</span>
        </label>
      ))}
      <CategoryBoard category={category} />
    </div>
  )
}

type Props = {
}
