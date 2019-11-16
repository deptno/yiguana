import React, {FunctionComponent, useCallback, useState} from 'react'
import * as R from 'ramda'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

export const ReplyWriter: FunctionComponent<Props> = props => {
  const {postId, commentId, commentCreatedAt, onCreate} = props
  const [content, setContent] = useState('')
  const handleChange = useCallback(R.compose(setContent, R.path(['target', 'value'])), [commentId])
  const [commentMutation] = useMutation(gql`
    mutation ($data: CommentMutationInput!, $user: NotMemberInput) {
      comment(data: $data, user: $user) {
        hk
      }
    }
  `)
  const saveComment = () => {
    commentMutation({
      variables: {
        data: {
          postId,
          commentCreatedAt,
          content,
        }
      }
    })
      .then(onCreate)
      .catch(alert)
  }

  return (
    <div className="b--light-gray ba br2 pa3 bg-black-05">
      <textarea className="pa2 w-100 b--transparent" rows={4} placeholder="답글 내용" onChange={handleChange}/>
      <div className="self-end w-100 flex justify-end mt2">
        <a className="w-100 br1 link pointer db near-black f5 bg-hot-pink ph2 tc nowrap white" onClick={saveComment}>
          <span className="pv2 db near-white">등록</span>
        </a>
      </div>
    </div>
  )
}

type Props = {
  commentId: string
  postId: string
  commentCreatedAt: string

  onCreate(): void
}
