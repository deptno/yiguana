import {FunctionComponent, useCallback, useState} from 'react'
import {Post} from '../../../../../src/entity/post'
import {format, parseISO} from 'date-fns'
import * as R from 'ramda'
import Link from 'next/link'
import {api} from '../../pages/api/lib/api'

export const BoardItem: FunctionComponent<Props> = props => {
  const {item, no} = props
  const del = useCallback((e) => {
    e.stopPropagation()

    api(`api/post/${item.hk}`, {method: 'delete'})
      .then(console.log)
      .then(props.onDelete)
      .catch(alert)
  }, [item])

  return (
    <Link href="/post/[hk]" as={`/post/${item.hk}`}>
      <div
        className="lh-copy center flex flex-column items-center nowrap tc ph2 bl br bb b--black-05"
      >
        <div className="flex w-100 pointer mv0 pv0 lh-copy ">
          <span className="w-10 dn db-ns">{no}</span>
          <span className="w-20 dn db-ns">{R.head(item.deleted? item.dCategory.split('#') : item.category.split('#'))}</span>
          <span className="w-100 pl2 cut-text tl">{item.title}</span>
          <span className="w-10 dn db-ns tc">{item.userId}</span>
          <span className="w-10 dn db-ns">{format(parseISO(item.createdAt), 'MM/dd hh:mm')}</span>
          <span className="w-10 dn db-ns">{item.likes}</span>
          <span className="w-10">{item.views}</span>
          <span className="w-10">{item.children}</span>
          <span className="w-10 bg-black-05 hover-bg-black hover-yellow" onClick={del}>삭제</span>
        </div>
      </div>
    </Link>
  )
}

type Props = {
  item: Post
  no: number
  onDelete(): void
}
