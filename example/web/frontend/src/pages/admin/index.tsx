import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {BoardItem} from '../../components/board/BoardItem'
import {Comment} from '../../components/post/Comment'
import Link from 'next/link'

const AdminPage: NextPage<Props> = props => {
  const [reports, setReports] = useState([])
  // FIXME: Do not share $cursor
  const {data, error} = useQuery(gql`
    query ($cursor: String){
      aggReportsOfPost(cursor: $cursor) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
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
        }
        cursor
        firstResult
      }
      aggReportsOfComment(cursor: $cursor) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
            hk
            rk
            content
            postId
            userId
            createdAt
            updatedAt
            children
            likes
            user {
              id
              ip
              name
              pw
            }
            commentId
            deleted
          }
        }
        cursor
        firstResult

      }
    }
  `)

  useEffect(() => {
    setReports(data?.aggReportsOfPost?.items ?? [])
  }, [data])

  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
      {(data?.aggReportsOfPost?.items ?? []).map((rp, no) => {
        return (
          <Link key={rp.hk} href="/admin/reports/post/[hk]" as={`/admin/reports/post/${rp.hk}`}>
            <div className="flex flex-column pa2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                <span className="w4">{rp.agg.split('#')[1].toUpperCase()}</span>
                <span className="w3">신고수: {rp.reported}</span>
                <span className="ml-auto">신고 내용 보기 -></span>
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
      {(data?.aggReportsOfComment?.items ?? []).map((rp, no) => {
        return (
          <Link key={rp.hk} href="/admin/reports/comment/[hk]" as={`/admin/reports/comment/${rp.hk}`}>
            <div className="flex flex-column pa2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                <span className="w4">{rp.agg.split('#')[1].toUpperCase()}</span>
                <span className="w3">신고수: {rp.reported}</span>
                <span className="ml-auto">신고 내용 보기 -></span>
              </div>
              <div className="flex-auto">
                <Comment data={rp.data} onCreate={console.log} onLike={console.log} onReport={console.log}/>
              </div>
              <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default AdminPage

type Props = {}