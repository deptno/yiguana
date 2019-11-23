import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const AdminPage: NextPage<Props> = props => {
  const [reports, setReports] = useState([])
  const {data, error} = useQuery(gql`
    fragment A on Reportable {
      ... on Post {
        hk
        content: title
      }
      ... on Comment {
        hk
        content
      }
    }
    query ($entity: String!, $cursor: String){
      reports(entity: $entity, cursor: $cursor) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
            ...A
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
    setReports(data?.reports?.items ?? [])
    console.log(data?.reports?.items ?? [])
  }, [data])

  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
      {reports.map(x => {
        return (
          <div key={x.hk} className="flex justify-between">
            <span>{x.hk}</span>
            <span>{x.rk}</span>
            <span>{x.agg}</span>
            <span>{x.reports}</span>
            <span>{x.reported}</span>
            <span>{x.data.content}</span>
          </div>
        )
      })}
    </div>
  )
}
export default AdminPage

type Props = {}