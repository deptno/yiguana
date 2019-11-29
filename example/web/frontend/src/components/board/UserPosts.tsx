import React, {FunctionComponent, useContext, useEffect, useMemo} from 'react'
import {LineButton} from './LineButton'
import {Board} from './Board'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {StorageContext} from '../../context/StorageContext'

export const UserPosts: FunctionComponent<Props> = props => {
  const [query, {data, refetch}] = useLazyQuery<Q, A>(gql`
    query posts($cursor: String) {
      myPosts(cursor: $cursor) {
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
          user {
            name
            id
            ip
            pw
          }
          status
        }
      }
    }
  `)
  const {user} = useContext(StorageContext)
  const {items = [], cursor} = data?.myPosts ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])
  const fetch = () => {
    query({variables: {cursor}})
  }

  useEffect(fetch, [cursor])
  useEffect(() => void (refetch && refetch()), [user])

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      <Board items={items}/>
      <LineButton onClick={fetch}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {}
type Q = { myPosts: { items: any[], cursor? } }
type A = { cursor? }
