import React, {FunctionComponent, useContext, useEffect, useRef, useState} from 'react'
import * as Q from 'quill'
import {LineSubmitButton} from './LineSubmitButton'
import * as R from 'ramda'
import {getUserName, isMember} from '../../lib/storage/user'
import {StorageContext} from '../../context/StorageContext'
import {useLazyQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import mutationPost from '../../../../../../graphql/mutation/post.graphql'
import queryUploadUrl from '../../../../../../graphql/query/uploadUrl.graphql'

export const Editor: FunctionComponent<Props> = props => {
  const ref = useRef()
  const [editor, setEditor] = useState<Q.Quill>()
  const [file, setFile] = useState<File>()
  const {user} = useContext(StorageContext)
  const [postMutation] = useMutation(gql`${mutationPost}`)
  const [getUploadUrlQuery, {data: preSigned}] = useLazyQuery(gql`${queryUploadUrl}`)

  useEffect(() => {
    if (preSigned) {
      const {fields, url} = JSON.parse(preSigned.uploadUrl)
      const formData = new FormData()
      const imageUrl = [url, fields.key].join('/')

      Object
        .entries(fields)
        .forEach(R.apply(formData.append.bind(formData)))

      formData.append('acl', 'public-read')
      formData.append('content-type', file.type)
      formData.append('file', file)

      fetch(url, {
        method: 'post',
        body: formData,
      })
        .then(response => {
          console.log(response.status)
          if (response.status < 400) {
            editor.insertEmbed(editor.getSelection().index, 'image', imageUrl)
            return
          }
          return response.text()
        })
        .then(message => {
          if (message) {
            const xml = new window.DOMParser().parseFromString(message, 'text/xml')
            alert(xml.all[2]?.innerHTML ?? xml)
          }
        })
    }
  }, [preSigned])
  useEffect(() => {
    if (file) {
      getUploadUrlQuery({
        variables: {
          key: file.name,
        },
      })
    }
  }, [file])

  const save = (e) => {
    const name = e.target.elements.name.value.trim()
    const pw = e.target.elements.pw.value
    const category = e.target.elements.category.value
    const title = e.target.elements.title.value.trim()
    const contents = editor.getContents().ops
    const content = editor.root.innerHTML

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
    if (contents.length === 0) {
      editor.focus()
      return alert('빈 내용')
    }

    const userData = member
      ? undefined
      : {name, pw}

    console.log(editor.getContents())
    console.log(editor.getText())
    console.log(editor.getLines())

    const [cover] = contents
      .map(c => c.insert)
      .map((insert = {}) => insert['image'])
      .filter(Boolean)

    postMutation({
      variables: {
        data: {
          category,
          title,
          content,
          cover
        },
        user: userData,
      },
    })
      .then(() => Router.push('/'))
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
      const toolbar = quill.getModule('toolbar')
      toolbar.addHandler('image', function () {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.click()
        input.onchange = function (this: HTMLInputElement) {
          if (this.files.length > 0) {
            setFile(this.files.item(0))
          }
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
            .ql-container {
              font-size: 16px;
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
      <div id="editor" ref={ref} />
      <LineSubmitButton>저장하기</LineSubmitButton>
      <style jsx>
        {/* language=css */ `
            #editor {
                height: 300px;
            }
        `}
      </style>
    </form>
  )
}

type Props = {}
