import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import * as R from 'ramda'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

export const MentionWriter: FunctionComponent<Props> = props => {
  const {postId, commentId, refUserId, onCreate} = props
  const [content, setContent] = useState('')
  const handleChange = useCallback(R.compose(setContent, R.path(['target', 'value'])), [commentId])
  const [commentMutation] = useMutation(gql`
    mutation ($data: ReplyMutationInput!, $user: NotMemberInput) {
      reply(data: $data, user: $user) {
        hk
      }
    }
  `)
  const saveComment = () => {
    // TODO: 비회원 댓글 지원
    // TODO: commentCreatedAt 서버에서 처리해야함
    commentMutation({
      variables: {
        data: {
          postId,
          commentId,
          content,
        },
      },
    })
      .then(onCreate)
      .catch(alert)
  }

  return (
    <div className="b--light-gray ba br2 pa3 bg-black-05">
      <textarea className="pa2 w-100 b--transparent" id="mention" rows={4} placeholder="댓글 내용" onChange={handleChange}>
       {refUserId}
      </textarea>
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
  refUserId: string

  onCreate(): void
}
