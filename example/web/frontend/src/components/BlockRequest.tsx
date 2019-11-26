import React, {FunctionComponent} from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {YiguanaDocumentHashRange} from '../../../../../src/dynamodb'

export const BlockRequest: FunctionComponent<Props> = props => {
  const {data} = props
  const [reportMutation, {data: result}] = useMutation(gql`
    mutation ($data: DocumentInput!, $content: String!) {
      report(data: $data, content: $content) {
        hk
      }
    }
  `)
  const report = (e) => {
    e.preventDefault()

    const {value: content} = e.currentTarget.elements.namedItem('reason') as any

    if (data) {
      reportMutation({variables: {data, content}}).catch(alert)
    }
  }

  return (
    <form className="flex flex-column" onSubmit={report}>
      신고하기
      <textarea name="reason"/>
      <button className="pa2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue">
        <span className="ml2">신고</span>
      </button>
    </form>
  )
}

type Props = {
  data: YiguanaDocumentHashRange
}