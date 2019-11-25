import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {BoardItem} from '../../components/board/BoardItem'
import Link from 'next/link'

const AdminPage: NextPage<Props> = props => {
  const [reports, setReports] = useState([])
  const {data, error} = useQuery(gql`
    query ($entity: String!, $cursor: String){
      aggReports(entity: $entity, cursor: $cursor) {
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
    }
  `, {
    variables: {
      entity: 'post',
    },
  })

  useEffect(() => {
    setReports(data?.aggReports?.items ?? [])
  }, [data])

  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
      {reports.map((rp, no) => {
        return (
          <Link key={rp.hk} href="/admin/reports/[hk]" as={`/admin/reports/${rp.hk}`}>
            <div className="flex flex-column pt1 ph2 pb2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap justify-between">
                <span className="w3 dn db-ns">신고자: <i
                  className="far fa-user-circle bg-black white pa1 br2"/> {rp.rk?.split('#')[3]}</span>
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
          </Link>
        )
      })}
    </div>
  )
}
export default AdminPage

type Props = {}