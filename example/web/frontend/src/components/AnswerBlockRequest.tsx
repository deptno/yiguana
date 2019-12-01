import React, {FunctionComponent, useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as R from 'ramda'
import {EEntity} from '../../../../../lib/type'

export const AnswerBlockRequest: FunctionComponent<Props> = props => {
  const {data, entity} = props
  const [replyReport, {data: result}] = useMutation(gql`
    mutation ($hk: String!, $entity: EEntityType!, $answer: String!, $status: EEntityStatus) {
      replyReport(hk: $hk, entity: $entity, answer: $answer, status: $status) 
    }
  `)
  const [value, setValue] = useState('')
  const mutate = (variables) => {
    console.log({variables})
    replyReport({variables}).catch(alert)
  }
  const makeVariables = (status) => (answer) => ({
    hk: data.hk,
    answer: value,
    entity,
    status,
  })

  const block = R.compose(mutate, makeVariables('blockedBySystem'))
  const del = R.compose(mutate, makeVariables('deletedByAdmin'))
  const innocent = R.compose(mutate, makeVariables('innocent'))

  return (
    <div className="b--light-gray ba br2 pa2 bg-light-red flex justify-between items-center">
      <input
        className="mh2 pa2 w-100 ba b--black br2 bg-white"
        name="answer"
        placeholder="신고에 대한 답변"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className="self-end flex justify-end">
        <button
          className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue"
          type="button"
          onClick={block}
        >
          블락
        </button>
        <button
          className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue"
          type="button"
          onClick={del}
        >
          삭제
        </button>
        <button
          className="pa2 link near-black dib blue bg-white mh2 nowrap pointer hover-bg-blue"
          type="button"
          onClick={innocent}
        >
          무고
        </button>
      </div>
    </div>

  )
}

type Props = {
  data: {
    hk
  }
  entity: EEntity.Post|EEntity.Comment
}