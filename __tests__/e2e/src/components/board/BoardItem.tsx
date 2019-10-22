import Link from 'next/link'
import {FunctionComponent, useState} from 'react'
import {Post} from '../../../../../src/entity/post'
import {format, parseISO} from 'date-fns'
import * as R from 'ramda'

export const BoardItem: FunctionComponent<Props> = props => {
  const [expend, setExpend] = useState(false)
  const {item} = props
  return (
    <li
      className="lh-copy center flex flex-column items-center nowrap tc ph2 bl br bb b--black-05 hover-bg-light-pink"
      onClick={() => setExpend(!expend)}
    >
      <p className="flex w-100 pointer mv0 pv0 lh-copy ">
        <style jsx>
          {` span:nth-child(even) {background: #efefef} `}
        </style>
        <span className="w-20 dn db-ns">{R.head(item.category.split('#'))}</span>
        <span className="w-100 pl2 cut-text tl">{item.title}</span>
        <span className="w-10 dn db-ns tc">{item.userId}</span>
        <span className="w-10 dn db-ns">{format(parseISO(item.createdAt), 'MM/dd hh:mm')}</span>
        <span className="w-10 dn db-ns">{item.likes}</span>
        <span className="w-10">{item.views}</span>
        <span className="w-10">{item.children}</span>
      </p>
      {expend && (
        <p className="flex w-100 ph4">
          <Link href={item.contentUrl} prefetch={false}>
            <a className="link near-black">
              <pre className="tl">
                {JSON.stringify(item, null, 2)}
              </pre>
            </a>
          </Link>
        </p>
      )}
    </li>
  )
}
export const BoardMore: FunctionComponent<{}> = props => {
  return (
    <a className="link near-black">
      <li
        className="lh-copy center flex items-center flex tc pointer pa2 bl br bb b--black-05 nowrap bg-black-05 hover-bg-light-pink pointer">
          <span className="w-100 cut-text">
            더보기
          </span>
      </li>
    </a>
  )
}

type Props = {
  item: Post
}
