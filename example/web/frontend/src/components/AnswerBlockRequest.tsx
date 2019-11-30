import React, {FunctionComponent} from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {YiguanaDocumentHash, Report} from '../../../../../lib'

export const AnswerBlockRequest: FunctionComponent<Props> = props => {
  const {data, reports, onRequest} = props
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
      console.log('result')
    }
  }

  return (
    <form className="b--light-gray ba br2 pa2 bg-light-red flex justify-between items-center" onSubmit={report}>
      <input
        className="mh2 pa2 w-100 ba b--black br2 bg-white"
        name="reason"
        placeholder="신고에 대한 답변"
      />
      <div className="self-end flex justify-end">
        <button className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue">
          블락
        </button>
        <button className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue">
          삭제
        </button>
        <button className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue">
          무고
        </button>
      </div>
    </form>

  )
}

type Props = {
  data: YiguanaDocumentHash
  reports: Report[]
  onRequest(e?): void
}