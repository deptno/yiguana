import React, {FunctionComponent, useContext, useEffect, useMemo} from 'react'
import {LineButton} from './LineButton'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {StorageContext} from '../../context/StorageContext'
import Link from 'next/link'
import {BoardItem} from './BoardItem'
import myPostReports from '../../../../../../graphql/query/myPostReports.graphql'

export const UserPostReports: FunctionComponent<Props> = props => {
  const [query, {data, refetch}] = useLazyQuery<Q, A>(gql`${myPostReports}`)
  const {user} = useContext(StorageContext)
  const {items = [], cursor} = data?.myPostReports ?? {}
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
          <Link key={rp.hk} href="/admin/reports/post/[hk]" as={`/admin/reports/post/${rp.hk}`}>
            <div className="flex flex-column pa2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                <span className="bg-black-05 pa2 mr2"><i
                  className="far fa-user-circle bg-black white pa1 br2"/> {rp.userId}</span>
                <span className="w-100 ws-normal">신고내용: {rp.content}</span>
                <span className="w4 ws-normal">상태: {rp.status}</span>
                <span className="w4 ws-normal">상태: {rp.answer}</span>
              </div>
              <div className="flex-auto">
                <BoardItem item={rp.data} no={no}/>
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
type Q = { myPostReports: { items: any[], cursor? } }
type A = { cursor? }
