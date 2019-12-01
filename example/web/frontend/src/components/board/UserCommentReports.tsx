import React, {FunctionComponent, useContext, useEffect, useMemo} from 'react'
import {LineButton} from './LineButton'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {StorageContext} from '../../context/StorageContext'
import Link from 'next/link'
import {Reply} from '../post/Reply'
import {Comment} from '../post/Comment'

export const UserCommentReports: FunctionComponent<Props> = props => {
  const [query, {data, refetch}] = useLazyQuery<Q, A>(gql`
    query ($cursor: String) {
      myCommentReports(cursor: $cursor) {
        items {
          hk
          rk
          answer
          content
          byUser
          status
          user {
            name
            ip
            id
            pw
          }
          userId
          data {
            hk
            rk
            content
            children
            likes
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
        firstResult
        cursor
      }
    }
  `)
  const {user} = useContext(StorageContext)
  const {items = [], cursor} = data?.myCommentReports ?? {}
  const buttonText = useMemo(() => cursor ? '더 보기' : '처음으로', [cursor])
  const fetch = () => {
    query({variables: {cursor}})
  }

  useEffect(fetch, [])
  useEffect(() => void (refetch && refetch()), [user])

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      {items.map((rp, no) => {
        return (
          <Link key={rp.hk} href="/admin/reports/comment/[hk]" as={`/admin/reports/comment/${rp.hk}`}>
            <div className="flex flex-column pa2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                <span className="bg-black-05 pa2 mr2"><i
                  className="far fa-user-circle bg-black white pa1 br2"/> {rp.userId}</span>
                <span className="w-100 ws-normal">신고내용: {rp.content}</span>
                <span className="w4 ws-normal">상태: {rp.status}</span>
                <span className="w4 ws-normal">상태: {rp.answer}</span>
              </div>
              <div className="flex-auto">
                {rp.data.commentId
                  ? <Reply data={rp.data} onCreate={console.log} onLike={console.log} onDelete={console.log}/>
                  : <Comment data={rp.data} onCreate={console.log} onLike={console.log}/>
                }
              </div>
              <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
            </div>
          </Link>
        )
      })}
      <LineButton onClick={fetch}>{buttonText}</LineButton>
    </div>
  )
}

type Props = {}
type Q = { myCommentReports: { items: any[], cursor? } }
type A = { cursor? }
