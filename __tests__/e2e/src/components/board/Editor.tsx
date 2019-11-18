import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react'
import * as Q from 'quill'
import {LineSubmitButton} from './LineSubmitButton'
import * as R from 'ramda'
import {getUserName, isMember} from '../../lib/storage/user'
import {StorageContext} from '../../context/StorageContext'
import {useLazyQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const Editor: FunctionComponent<Props> = props => {
  const ref = useRef()
  const [editor, setEditor] = useState<Q.Quill>()
  const {user} = useContext(StorageContext)
  const [postMutation] = useMutation(gql`
    mutation ($data: PostMutationInput!, $user: NotMemberInput) {
      post(data: $data, user: $user) {
        hk
        rk
        title
        likes
        views
        children
        category
        createdAt
        content

        dCategory
        deleted
      }
    }
  `)
  const [getUploadUrlQuery, {data}] = useLazyQuery(gql`
    query ($key: String!) {
      uploadUrl(key: $key)
    }
  `)
  useEffect(() => {
    console.log('data', data)
  }, [data])

  const save = (e) => {
    const name = e.target.elements.name.value.trim()
    const pw = e.target.elements.pw.value
    const category = e.target.elements.category.value
    const title = e.target.elements.title.value.trim()
    const content = editor.getText()

    if (!member) {
      if (!name) {
        e.target.elements.name.focus()
        return alert('빈 이름')
      }
      if (!pw) {
        e.target.elements.pw.focus()
        return alert('빈 비밀번호')
      }
    }
    if (!title) {
      e.target.elements.title.focus()
      return alert('빈 제목')
    }
    const userData = member
      ? undefined
      : {name, pw}

    postMutation({
      variables: {
        data: {
          category,
          title,
          content,
        },
        user: userData,
      },
    })
      .catch(alert)
  }

  useEffect(() => {
    if (ref.current) {
      const quill = new Quill(ref.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [['link'], ['image']],
          },
        },
      })
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', function() {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.click()
        input.onchange = function(this: HTMLInputElement) {
          console.log(this)
          const fd = new FormData()
          const [file] = Array.from(this.files)
          console.log(this.files)
          fd.append('image', file)

          getUploadUrlQuery({
            variables: {
              key: file.name
            }
          })
        }
      })


      setEditor(quill)
    }
  }, [ref])
  const member = isMember(user)

  return (
    <form className="black-80 mv3" onSubmit={R.compose(save, R.tap(e => e.preventDefault()))}>
      <style jsx>
        {/* language=CSS */ `
            input[type="text"]:disabled, input[type="password"]:disabled {
                background: #dddddd;
            }
        `}
      </style>
      <h3>{getUserName()}</h3>
      <div className="flex justify-between">
        <div className="flex-auto mh2">
          <label htmlFor="name" className="f6 b db mb2">이름</label>
          <input
            id="name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            aria-describedby="name"
            disabled={member}
          />
        </div>
        <div className="flex-auto mh2">
          <label htmlFor="pw" className="f6 b db mb2">비밀번호</label>
          <input
            id="pw"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="password"
            aria-describedby="password"
            disabled={member}
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
                <option value="create_channel">채널등록요청</option>
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
