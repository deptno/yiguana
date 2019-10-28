import React, {FunctionComponent, useCallback, useState} from 'react'
import * as R from 'ramda'

export const ReplyWriter: FunctionComponent<Props> = props => {
  const {commentId, onCreate} = props
  const [content, setContent] = useState('')
  const handleChange = useCallback(R.compose(setContent, R.path(['target', 'value'])), [commentId])
  const saveComment = () => {
    fetch(
      `/api/comment/${commentId}/reply`,
      {
        method: 'post',
        body: JSON.stringify({
          content,
        }),
      })
      .then(response => response.json())
      .then(onCreate)
  }

  return (
    <div className="b--light-gray ba br2 mv3">
      <header className="pa2 lh-copy">
        <span className="b">
          이름
        </span>
      </header>
      <textarea className="pa2 w-100 b--transparent" rows={4} placeholder="답글 내용" onChange={handleChange}/>
      <div className="self-end w-100 flex justify-end">
        <a className="link pointer db near-black f5 bg-hot-pink ph2 tc ml2 nowrap w-auto white" onClick={saveComment}>
          <i className="ph2 pv2 near-white far fa-paper-plane"/>
          <span className="near-white dn di-l">등록</span>
        </a>
      </div>
    </div>
  )
}

type Props = {
  commentId: string
  onCreate(): void
}