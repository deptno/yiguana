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
          <Link key={rp.hk} href="/admin/reports/post/[hk]" as={`/admin/reports/post/${rp.hk}`}>
            <div className="flex flex-column pa2 ba">
              <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                <span className="w3">{rp.agg.split('#')[1].toUpperCase()}</span>
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
    </div>
  )
}
export default AdminPage

type Props = {}