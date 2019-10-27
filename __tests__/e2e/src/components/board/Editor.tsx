import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import {LineButton} from './LineButton'
import * as Q from 'quill'

export const Editor: FunctionComponent<Props> = props => {
  const ref = useRef()
  const [editor, setEditor] = useState<Q.Quill>()
  const save = () => {
    const title = editor.getText()
    const body = JSON.stringify({
      title,
      content: 'user content',
      category: 'user',
    })
    fetch('api/post', {
      method: 'post',
      body,
    })
      .then(response => response.json())
      .then(console.log)
  }

  useEffect(() => {
    if (ref.current) {
      setEditor(new Quill(ref.current, {theme: 'snow'}))
    }
  }, [ref])

  return (
    <div className="mv3">
      <form className="black-80">
        <h3>비회원</h3>
        <div className="flex justify-between">
          <div className="w4">
            <div className="flex flex-column items-stretch justify-between">
              <label htmlFor="title" className="f6 b db mb2">
                카테고리
              </label>
              <div className="pa2 mb2">
                <select name="category">
                  <option value="news">채널등록요청</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-auto mh2">
            <label htmlFor="name" className="f6 b db mb2">이름</label>
            <input
              id="name"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              aria-describedby="name"
            />
          </div>
          <div className="flex-auto mh2">
            <label htmlFor="password" className="f6 b db mb2">비밀번호</label>
            <input
              id="password"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="password"
              aria-describedby="password"
            />
          </div>
        </div>

        <div className="flex-auto">
          <label htmlFor="title" className="f6 b db mb2">제목</label>
          <input
            id="title"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            aria-describedby="title"
          />
        </div>
      </form>

      <div ref={ref}/>
      <LineButton onClick={save}>저장하기</LineButton>
    </div>
  )
}

type Props = {}
