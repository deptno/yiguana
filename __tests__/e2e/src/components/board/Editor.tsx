import React, {FunctionComponent, useEffect, useRef, useState} from 'react'
import Head from 'next/head'
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
    <div className="pv3">
      <div ref={ref}/>
      <LineButton onClick={save}>저장하기</LineButton>
    </div>
  )
}

type Props = {}
