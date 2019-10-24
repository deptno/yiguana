import Link from 'next/link'
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {Post} from '../../../../../src/entity/post'
import {format, parseISO} from 'date-fns'
import * as R from 'ramda'
import {LineButton} from './LineButton'
import {Editor} from './Editor'

export const BoardItemContent: FunctionComponent<Props> = props => {
  const {item, show} = props
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})

  useEffect(() => {
    if (show) {
      if (items.length < item.children) {
        fetch(`api/post/${item.hk}/comments`, {method: 'delete'})
          .then(response => response.json())
          .then(console.table)
      }
    }
  }, [show])

  if (show) {
    return (
      <div>
        <Link href={item.contentUrl} prefetch={false}>
          <a className="link near-black flex w-100 ph4">
            <pre className="tl">
              {JSON.stringify(item, null, 2)}
            </pre>
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
