import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import {LineButton} from './LineButton'
import * as Q from 'quill'

declare var Quill
export const Editor: FunctionComponent<Props> = props => {
  const ref = useRef()
  const [editor, setEditor] = useState<Q.Quill>()
  useEffect(() => {
    if (ref.current) {
      setEditor(new Quill(ref.current, {theme: 'snow'}))
    }
  }, [ref])
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

  return (
    <div className="">
      <Head>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"/>
      </Head>
      <div className="">
        <div ref={ref}/>
      </div>
      <LineButton onClick={save}>
        저장하기
      </LineButton>
    </div>
  )
}

type Props = {}
