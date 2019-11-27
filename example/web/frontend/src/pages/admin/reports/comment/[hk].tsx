import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Comment} from '../../../../components/post/Comment'
import {BoardItem} from '../../../../components/board/BoardItem'
import {Reply} from '../../../../components/post/Reply'

const ReportsCommentPage: NextPage<Props> = props => {
  const {query: {hk}} = useRouter()
  // FIXME: comment 를 개별로 가져올 수 없음
  const [fetch, {data, error}] = useLazyQuery(gql`
    query ($hk: String!, $rk: String!) {
      comment(hk: $hk) {
        hk
        rk
        content
        postId
        userId
        createdAt
        updatedAt
        children
        likes
        user {
          id
          ip
          name
          pw
        }
        commentId
        deleted
        comment {
          hk
          rk
          content
          postId
          userId
          createdAt
          updatedAt
          children
          likes
          user {
            id
            ip
            name
            pw
          }
          commentId
          deleted
        }
        post {
          hk
          rk
          title
          likes
          views
          children
          category
          createdAt
          userId
          cover
          user {
            id
            ip
            name
            pw
          }
          
          dCategory
          deleted
        }
      }
      reports(hk: $hk, rk: $rk) {
        items {
          hk
          userId
          content
        }
        firstResult
        cursor
      }
    }
  `)

  useEffect(() => {
    if (hk) {
      fetch({
        variables: {
          hk,
          rk: 'comment',
        },
      })
    }
  }, [hk])

  console.log(hk, data, error)
  console.log(data?.comment?.commentId)

  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
      <div className="flex-auto pa2 bg-gold">
        {data?.comment?.post && <BoardItem item={data.comment.post} no={0}/>}
      </div>
      <div className="flex-auto mv2 pa2 bg-light-yellow">
        {data?.comment?.comment &&
        <Comment data={data.comment.comment} onCreate={console.log} onLike={console.log} onReport={console.log}/>}
        {data?.comment && (
          data?.comment.commentId
            ? (
              <li className="pl4 comment mv2 f6 flex">
                <div className="flex-auto flex flex-column">
                  <Reply data={data.comment} onCreate={console.log} onLike={console.log} onDelete={console.log}/>
                </div>
              </li>
            )
            : <Comment data={data.comment} onCreate={console.log} onLike={console.log} onReport={console.log}/>
        )}
      </div>
      {data?.reports?.items.map((r, no) => {
        return (
          <Link key={`${r.hk}#${r.userId}`} href="/admin/reports/[hk]" as={`/admin/reports/${r.hk}`}>
            <div className="flex flex-column pt1 ph2 pb2 ba mv1">
              <div className="lh-copy flex pointer mv0 pv0 lh-copy nowrap items-center">
                <span className="bg-black-05 pa2 mr2"><i
                  className="far fa-user-circle bg-black white pa1 br2"/> {r.userId}</span>
                <span className="w-100 ws-normal">신고내용: {r.content}</span>
              </div>
              <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(r, null, 2)}
            </pre>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default ReportsCommentPage

type Props = {}