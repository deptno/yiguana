import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import * as R from 'ramda'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

export const MentionWriter: FunctionComponent<Props> = props => {
  const {postId, commentId, refUserName, onCreate} = props
  const [content, setContent] = useState('')
  const handleChange = useCallback(R.compose(setContent, R.path(['target', 'value'])), [commentId])
  const [ref, setRef] = useState(refUserName)
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
          refUserName,
        },
      },
    })
      .then(onCreate)
      .catch(alert)
  }

  useEffect(() => {
    const listener = (e) => {
      if (content === '') {
        if (e.keyCode === 8) {
          setRef('')
        }
      }
    }
    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [content])

  return (
    <div className="b--light-gray ba br2 pa2 bg-black-05 flex justify-between items-center">
      {ref && <span className="bg-gray white br2 pa2 w3 lh-copy">@{refUserName}</span>}
      <input
        className="mh2 pa2 w-100 ba b--black br2 bg-white"
        id="mention"
        placeholder="댓글 내용"
        onChange={handleChange}
        value={content}
      />
      <div className="self-end flex justify-end">
        <a className="w-100 br2 link pointer db near-black f5 bg-hot-pink ph2 tc nowrap white" onClick={saveComment}>
          <span className="pv2 db near-white">등록</span>
        </a>
      </div>
    </div>
  )
}

type Props = {
  commentId: string
  postId: string
  refUserName: string

  onCreate(): void
}
