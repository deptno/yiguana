import Link from 'next/link'
import React, {FunctionComponent, useEffect, useState} from 'react'
import {Post} from '../../../../../src/entity/post'
import {LineButton} from './LineButton'
import {Editor} from './Editor'

export const BoardItemContent: FunctionComponent<Props> = props => {
  const {item, show} = props
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})

  useEffect(() => {
    if (show) {
      if (items.length < item.children) {
        fetch(`/api/post/${item.hk}/comments`, {method: 'delete'})
          .then(response => response.json())
          .then(setResponse)
      }
    }
  }, [show])

  if (show) {
    return (
      <div>
        <pre className="tl">
          {JSON.stringify(item, null, 2)}
        </pre>
        <Link href="/post/[hk]" as={`/post/${item.hk}`} prefetch={false} passHref>
          <a className="link near-black flex w-100 ph4">
            글 페이지로 이동
          </a>
        </Link>

        <div className="flex-column justify-center items-center list mv0">
          {items.map(c => <pre>{JSON.stringify(c, null, 2)}</pre>)}
          {items.length === 0 && (
            <div
              className="lh-copy center flex items-center flex tc pa2 bl br bb b--black-05 nowrap hover-bg-light-pink w-100"
            >
              댓글이 없습니다.
            </div>
          )}
        </div>
        <Editor/>
        <LineButton onClick={console.log}>hell</LineButton>
      </div>
    )
  }
  return null

}

type Props = {
  item: Post
  show?: boolean
}
