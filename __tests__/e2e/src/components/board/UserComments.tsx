import React, {FunctionComponent, useEffect, useMemo, useState} from 'react'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {MyComments} from '../post/MyComments'
import {useLazyQuery} from '@apollo/react-hooks'
import {LineButton} from './LineButton'
import gql from 'graphql-tag'

export const UserComments: FunctionComponent<Props> = props => {
  const [query, {data}] = useLazyQuery<Q, A>(gql`
    query posts($cursor: String) {
      myComments(cursor: $cursor) {
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
        }
      }
    }
  `)
  const {items = [], cursor} = data?.myComments ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])
  const fetch = () => {
    query({variables: {cursor}})
  }

  useEffect(fetch, [cursor])

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      <MyComments items={items}/>
      <LineButton onClick={fetch}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {}
type Q = { myComments: { items: any[], cursor? } }
type A = { cursor? }
