import React, {FunctionComponent, useEffect, useMemo} from 'react'
import {LineButton} from './LineButton'
import {Board} from './Board'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UserReportedPosts: FunctionComponent<Props> = props => {
  const [query, {data}] = useLazyQuery<Q, A>(gql`
    query ($cursor: String) {
      myReportedPosts(cursor: $cursor) {
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
          deleted
          dCategory
        }
        firstResult
        cursor
      }
    }
  `)
  const {items = [], cursor} = data?.myReportedPosts ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])
  const fetch = () => {
    query({variables: {cursor}})
  }

  useEffect(fetch, [cursor])

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      <Board items={items}/>
      <LineButton onClick={fetch}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {}
type Q = { myReportedPosts: { items: any[], cursor? } }
type A = { cursor? }
