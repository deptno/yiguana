import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'

const ReportsPage: NextPage<Props> = props => {
  const {query: {hk}} = useRouter()
  const [fetch, {data, error}] = useLazyQuery(gql`
    query ($hk: String!, $rk: String!) {
      reports(hk: $hk, rk: $rk) {
        items {
          hk
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
      agg report
    </div>
  )
}
export default ReportsPage

type Props = {}