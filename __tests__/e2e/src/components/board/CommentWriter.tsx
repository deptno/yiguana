import React, {FunctionComponent, useCallback, useState} from 'react'
import * as R from 'ramda'
import {api} from '../../pages/api/lib/api'

export const CommentWriter: FunctionComponent<Props> = props => {
  const {postId, onCreate} = props
  const [content, setContent] = useState('')
  const handleChange = useCallback(R.compose(setContent, R.path(['target', 'value'])), [postId])
  const saveComment = () => {
    api(
      `/api/post/${postId}/comment`,
      {
        method: 'post',
        body: JSON.stringify({
          content,
        }),
      })
      .then(console.log)
      .then(onCreate)
      .catch(alert)
  }

  return (
    <div className="b--light-gray ba br2 mv3">
      <header className="pa2 lh-copy">
        <span className="b">
          이름
        </span>
      </header>
      <textarea className="pa2 w-100 b--transparent" rows={4} placeholder="댓글 내용" onChange={handleChange}/>
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
  postId
  onCreate(): void
}
