import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import * as Q from 'quill'
import {LineSubmitButton} from './LineSubmitButton'
import * as R from 'ramda'
import {getUserName, isMember} from '../../lib/storage/user'

export const Editor: FunctionComponent<Props> = props => {
  const ref = useRef()
  const [editor, setEditor] = useState<Q.Quill>()
  const save = (e) => {
    const name = e.target.elements.name.value.trim()
    const pw = e.target.elements.pw.value
    const category = e.target.elements.category.value
    const title = e.target.elements.title.value.trim()
    const content = editor.getText()

    if (!name) {
      e.target.elements.name.focus()
      return alert('빈 이름')
    }
    if (!pw) {
      e.target.elements.pw.focus()
      return alert('빈 비밀번호')
    }
    if (!title) {
      e.target.elements.title.focus()
      return alert('빈 제목')
    }

    const body = JSON.stringify({
      data: {
        category,
        title,
        content,
      },
      user: {
        name,
        pw,
      },
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
    <form className="black-80 mv3" onSubmit={R.compose(save, R.tap(e => e.preventDefault()))}>

      <h3>{getUserName()}</h3>
      <div className="flex justify-between">
        <div className="flex-auto mh2">
          <label htmlFor="name" className="f6 b db mb2">이름</label>
          <input
            id="name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            aria-describedby="name"
            disabled={isMember()}
          />
        </div>
        <div className="flex-auto mh2">
          <label htmlFor="pw" className="f6 b db mb2">비밀번호</label>
          <input
            id="pw"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="password"
            aria-describedby="password"
            disabled={isMember()}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w4">
          <div className="flex flex-column items-stretch justify-between">
            <label htmlFor="title" className="f6 b db mb2">
              카테고리
            </label>
            <div className="pa2 mb2">
              <select name="category">
                <option value="create-channel">채널등록요청</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex-auto mh2">
          <label htmlFor="title" className="f6 b db mb2">제목</label>
          <input
            id="title"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            aria-describedby="title"
          />
        </div>
      </div>
      <div ref={ref}/>
      <LineSubmitButton>저장하기</LineSubmitButton>
    </form>
  )
}

type Props = {}
