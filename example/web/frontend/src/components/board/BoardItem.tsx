import {FunctionComponent, useCallback} from 'react'
import {Post} from '../../../../../../src/entity/post'
import {format, parseISO} from 'date-fns'
import * as R from 'ramda'
import Link from 'next/link'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'

export const BoardItem: FunctionComponent<Props> = props => {
  const {item, no} = props
  const [deletePost] = useMutation(gql`
    mutation ($postId: String!) {
      deletePost(postId: $postId) {
        hk
      }
    }
  `)
  const del = useCallback((e) => {
    e.stopPropagation()
    deletePost({variables: {postId: item.hk}})
      .then(() => Router.push('/'))
      .catch(alert)
  }, [item])

  return (
    <Link href="/post/[hk]" as={`/post/${item.hk}`}>
      <div className="lh-copy center flex flex-column items-center nowrap tc ph2 pv1 bl br bb b--black-05">
        <div className="flex w-100 pointer mv0 pv0 lh-copy ">
          <span className="w3 dn db-ns">{no}</span>
          <span className="w-20 dn db-ns">{
            R.head(item.deleted
              ? item.dCategory.split('#')
              : item.category.split('#'))
          }</span>
          <span className="w-100 w-50-ns pl2 cut-text tl">
            {item.cover
              ? <i className="mr2 fas fa-photo-video"/>
              : <i className="mr2 far fa-newspaper"/>}
            {item.title}
          </span>
          <span className="w-10 dn db-ns tc">
            {item.userId
              ? <span><i className="far fa-user-circle bg-black white pa1 br2"/> {item.userId}</span>
              : <span><i className="far fa-question-circle bg-black-05 pa1 br2"/> 비회원</span>}
          </span>
          <span className="w3 dn db-ns">{item.likes}</span>
          <span className="w3 dn db-ns">{item.views}</span>
          <span className="w3">{item.children}</span>
          <span className="w4 dn db-ns">{format(parseISO(item.createdAt), 'MM/dd hh:mm')}</span>
          {props.onDelete && <span className="w-10 bg-black-05 hover-bg-black hover-yellow" onClick={del}>삭제</span>}
        </div>
      </div>
    </Link>
  )
}

type Props = {
  item: Post
  no: number
  onDelete?(): void
}
