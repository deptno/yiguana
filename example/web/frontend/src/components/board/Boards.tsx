import React, {FunctionComponent, useEffect, useMemo, useState} from 'react'
import {CategoryBoard} from './CategoryBoard'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {LineButton} from './LineButton'
import Link from 'next/link'

export const Boards: FunctionComponent<Props> = props => {
  const [category, setCategory] = useState<string>('')
  const [query, {data, refetch}] = useLazyQuery<Q, A>(gql`
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
          userId
          user {
            name
            id
            pw
            ip
          }
        }
        cursor
        firstResult
      }
    }
  `)
  const {items = [], cursor} = data?.posts ?? {}
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const fetch = () => {
    if (category) {
      return query({variables: {category, cursor}})
    }
    query()
  }
  const [buttonText, more] = cursor
    ? ['더 보기', fetch]
    : ['새 글 확인', () => refetch()]

  useEffect(fetch, [category])

  return (
    <div className="flex flex-column">
      <select className="mb3 bg-black-05" value={category} onChange={handleCategoryChange}>
        {boards.map(b => <option key={b.category} value={b.category}>{b.name}</option>)}
      </select>
      <div className="pl0 flex-column justify-center items-center list mv0">
        <CategoryBoard category={category} items={items}/>
        <LineButton onClick={more}>{buttonText}</LineButton>
      </div>
      <Link href="/post">
        <a className="ml-auto link bg-white ba br2 mv2 pa2 black">
          글 작성
        </a>
      </Link>
    </div>
  )
}

const boards = [
  {category: '', name: '전체 카테고리'},
  {category: 'news', name: '뉴스'},
  {category: 'create_channel', name: '채널 생성 요청'},
  {category: 'user', name: '유저'},
]

type Props = {}
type Q = { posts: { items: any[], cursor? } }
type A = { category?, cursor? }

