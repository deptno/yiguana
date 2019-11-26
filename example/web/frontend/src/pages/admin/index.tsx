import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {BoardItem} from '../../components/board/BoardItem'

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
          <div key={rp.hk} className="flex flex-column pt1 ph2 pb2 ba">
            <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap justify-between">
              <span className="w3 dn db-ns">신고자: <i className="far fa-user-circle bg-black white pa1 br2"/> {rp.rk?.split('#')[3]}</span>
              <span className="w3 dn db-ns">{rp.agg}</span>
              <span className="w3 dn db-ns">{rp.reported}</span>
              <span className="w3 dn db-ns">{rp.data.content}</span>
            </div>
            <div className="flex-auto">
              <BoardItem item={rp.data} no={no} onDelete={console.log}/>
            </div>
            <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
          </div>
        )
      })}
    </div>
  )
}
export default AdminPage

type Props = {}