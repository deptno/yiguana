import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {BoardItem} from '../../components/board/BoardItem'
import {Comment} from '../../components/post/Comment'
import Link from 'next/link'
import {Reply} from '../../components/post/Reply'

const AdminPage: NextPage<Props> = props => {
  // FIXME: Do not share $cursor
  const [query, {data, error}] = useLazyQuery(gql`
    query ($cursor: String) {
      posts: aggReportsOfPost(cursor: $cursor) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
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

            status
          }
          status
          answer
          processed
        }
        cursor
        firstResult
      }
      comments: aggReportsOfComment(cursor: $cursor) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
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
            status
          }
          status
          answer
          processed
        }
        cursor
        firstResult
      }
      postsEnd: aggReportsOfPost(cursor: $cursor, end: true) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
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

            status
          }
          status
          answer
          processed
        }
        cursor
        firstResult
      }
      commentsEnd: aggReportsOfComment(cursor: $cursor, end: true) {
        items {
          hk
          rk
          agg
          reports
          reported
          data {
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
            status
          }
          status
          answer
          processed
        }
        cursor
        firstResult
      }
    }
  `)

  useEffect(() => query(), [])
  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <div className="pa3 flex-column">
      <div className="flex-l">
        <div className="flex-auto">
          신고받은 게시물들
          {(data?.posts?.items ?? []).map((rp, no) => {
            return (
              <Link key={rp.hk} href="/admin/reports/post/[hk]" as={`/admin/reports/post/${rp.hk}`}>
                <div className="flex flex-column pa2 ba">
                  <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                    <span className="w4">글</span>
                    <span className="w3">신고수: {rp.reported}/{rp.processed}</span>
                    <span className="ml-auto w4">{rp.status}</span>
                    <span className="w4 ws-normal">답변: {rp.answer}</span>
                    <span className="w4">신고 내용 보기 -></span>
                  </div>
                  <div className="flex-auto">
                    <BoardItem item={rp.data} no={no}/>
                  </div>
                  <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
                </div>
              </Link>
            )
          })}
          {(data?.comments?.items ?? []).map((rp, no) => {
            return (
              <Link key={rp.hk} href="/admin/reports/comment/[hk]" as={`/admin/reports/comment/${rp.hk}`}>
                <div className="flex flex-column pa2 ba">
                  <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                    <span className="w4">{rp.data.commentId ? '답글' : '댓글'}</span>
                    <span className="w3">신고수: {rp.reported}/{rp.processed}</span>
                    <span className="ml-auto w4">{rp.status}</span>
                    <span className="w4 ws-normal">답변: {rp.answer}</span>
                    <span className="ml-auto">신고 내용 보기 -></span>
                  </div>
                  <div className="flex-auto">
                    {rp.data.commentId
                      ? <Reply data={rp.data} onCreate={console.log} onLike={console.log} onDelete={console.log}/>
                      : <Comment data={rp.data} onCreate={console.log} onLike={console.log}/>
                    }
                  </div>
                  <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="flex-auto">
          처리한 게시물들
          {(data?.postsEnd?.items ?? []).map((rp, no) => {
            return (
              <Link key={rp.hk} href="/admin/reports/post/[hk]" as={`/admin/reports/post/${rp.hk}`}>
                <div className="flex flex-column pa2 ba">
                  <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                    <span className="w4">글</span>
                    <span className="w3">신고수: {rp.reported}/{rp.processed}</span>
                    <span className="ml-auto w4">{rp.status}</span>
                    <span className="w4 ws-normal">답변: {rp.answer}</span>
                    <span className="w4">신고 내용 보기 -></span>
                  </div>
                  <div className="flex-auto">
                    <BoardItem item={rp.data} no={no}/>
                  </div>
                  <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
                </div>
              </Link>
            )
          })}
          {(data?.commentsEnd?.items ?? []).map((rp, no) => {
            return (
              <Link key={rp.hk} href="/admin/reports/comment/[hk]" as={`/admin/reports/comment/${rp.hk}`}>
                <div className="flex flex-column pa2 ba">
                  <div className="lh-copy flex w-100 pointer mv0 pv0 lh-copy nowrap bg-gold pa2">
                    <span className="w4">{rp.data.commentId ? '답글' : '댓글'}</span>
                    <span className="w3">신고수: {rp.reported}/{rp.processed}</span>
                    <span className="ml-auto w4">{rp.status}</span>
                    <span className="w4 ws-normal">답변: {rp.answer}</span>
                    <span className="ml-auto">신고 내용 보기 -></span>
                  </div>
                  <div className="flex-auto">
                    {rp.data.commentId
                      ? <Reply data={rp.data} onCreate={console.log} onLike={console.log} onDelete={console.log}/>
                      : <Comment data={rp.data} onCreate={console.log} onLike={console.log}/>
                    }
                  </div>
                  <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
              {JSON.stringify(rp, null, 2)}
            </pre>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AdminPage

type Props = {}