import React, {FunctionComponent, useContext, useEffect, useMemo, useState} from 'react'
import {MyComments} from '../post/MyComments'
import {useLazyQuery} from '@apollo/react-hooks'
import {LineButton} from './LineButton'
import gql from 'graphql-tag'
import {StorageContext} from '../../context/StorageContext'

export const UserReportedComments: FunctionComponent<Props> = props => {
  const [query, {data, refetch}] = useLazyQuery<Q, A>(gql`
    query ($cursor: String) {
      myReportedComments(cursor: $cursor) {
        items {
          hk
          rk
          content
          children
          likes
          createdAt
          updatedAt
          postId
          user {
            id
            name
            ip
            pw
          }
          userId
          status
        }
      }
    }
  `)
  const {user} = useContext(StorageContext)
  const {items = [], cursor} = data?.myReportedComments ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])
  const fetch = () => {
    query({variables: {cursor}})
  }

  useEffect(fetch, [cursor])
  useEffect(() => void (refetch && refetch()), [user])

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      <MyComments items={items}/>
      <LineButton onClick={fetch}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {}
type Q = { myReportedComments: { items: any[], cursor? } }
type A = { cursor? }
