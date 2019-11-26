import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {BoardItem} from '../../../../components/board/BoardItem'

const ReportsPage: NextPage<Props> = props => {
  const {query: {hk}} = useRouter()
  const [fetch, {data, error}] = useLazyQuery(gql`
    query ($hk: String!, $rk: String!) {
      post(hk: $hk) {
        hk
        rk
        title
        likes
        views
        children
        category
        createdAt
        userId
        cover

        dCategory
        deleted
      }
      reports(hk: $hk, rk: $rk) {
        items {
          hk
          userId
          content

        }
        firstResult
        cursor
      }
    }
  `)

  useEffect(() => {
    if (hk) {
      fetch({
        variables: {
          hk,
          rk: 'post',
        },
      })
    }
  }, [hk])

  console.log(hk, data, error)

  return (
    <div className="pa3 flex-column">
      <div className="flex-auto mv2 pa2 bg-gold">
        {data?.post && <BoardItem item={data?.post} no={0}/>}
      </div>
      신고받은 게시물들
      {data?.reports?.items.map((r, no) => {
        return (
          <Link key={`${r.hk}#${r.userId}`} href="/admin/reports/[hk]" as={`/admin/reports/${r.hk}`}>
            <div className="flex flex-column pt1 ph2 pb2 ba mv1">
              <div className="lh-copy flex pointer mv0 pv0 lh-copy nowrap items-center">
                <span className="bg-black-05 pa2 mr2"><i className="far fa-user-circle bg-black white pa1 br2"/> {r.userId}</span>
                <span className="w-100 ws-normal">신고내용: {r.content}</span>
              </div>
              <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(r, null, 2)}
            </pre>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default ReportsPage

type Props = {}