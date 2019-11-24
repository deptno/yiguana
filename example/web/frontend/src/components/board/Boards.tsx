import React, {FunctionComponent, useEffect, useMemo, useState} from 'react'
import {CategoryBoard} from './CategoryBoard'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {LineButton} from './LineButton'

export const Boards: FunctionComponent<Props> = props => {
  const [category, setCategory] = useState<string>('')
  const [query, {data}] = useLazyQuery<Q, A>(gql`
    query posts($category: Category, $cursor: String) {
      posts(category: $category, cursor: $cursor) {
        items {
          hk
          rk
          category
          title
          content
          children
          likes
          views
          createdAt
          cover
        }
      }
    }
  `)
  const {items = [], cursor} = data?.posts ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor, category])
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const fetch = () => {
    if (category) {
      return query({variables: {category, cursor}})
    }
    query()
  }

  useEffect(fetch, [category])

  return (
    <div className="flex flex-column">
      카테고리
      <select className="mb3" value={category} onChange={handleCategoryChange}>
        {boards.map(b => <option key={b.category} value={b.category}>{b.name}</option>)}
      </select>
      <div className="pl0 flex-column justify-center items-center list mv0">
        <CategoryBoard category={category} items={items}/>
        <LineButton onClick={fetch}>{buttonText}</LineButton>
      </div>
      <a href="/post" className="ml-auto link bg-white ba br2 mv2 pa2 black">
        글 작성
      </a>
    </div>
  )
}

const boards = [
  {category: '', name: '전체'},
  {category: 'news', name: '뉴스'},
  {category: 'create_channel', name: '채널 생성 요청'},
  {category: 'user', name: '유저'},
]

type Props = {}
type Q = { posts: { items: any[], cursor? } }
type A = { category?, cursor? }

