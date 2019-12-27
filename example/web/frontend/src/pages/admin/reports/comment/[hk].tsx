import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Comment} from '../../../../components/post/Comment'
import {BoardItem} from '../../../../components/board/BoardItem'
import {Reply} from '../../../../components/post/Reply'
import {Post} from '../../../../components/post/Post'
import {AnswerBlockRequest} from '../../../../components/AnswerBlockRequest'
import {EEntity} from '../../../../../../../../lib/type'
import queryReportsOfComment from '../../../../../../../../graphql/query/reportsOfComment.graphql'

const ReportsCommentPage: NextPage<Props> = props => {
  const {query: {hk}} = useRouter()
  // FIXME: comment 를 개별로 가져올 수 없음
  const [fetch, {data, error}] = useLazyQuery(gql`${queryReportsOfComment}`)

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

  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
      <div className="flex-auto pa2 bg-gold">
        {data?.comment?.post && <BoardItem item={data.comment.post} no={0}/>}
      </div>
      <div className="flex-auto mv2 pa2 bg-light-yellow">
        {data?.comment?.comment &&
        <Comment data={data.comment.comment} onCreate={console.log} onLike={console.log} />}
        {data?.comment && (
          data?.comment.commentId
            ? (
              <li className="pl4 comment mv2 f6 flex">
                <div className="flex-auto flex flex-column">
                  <Reply data={data.comment} onCreate={console.log} onLike={console.log} onDelete={console.log}/>
                </div>
              </li>
            )
            : <Comment data={data.comment} onCreate={console.log} onLike={console.log} />
        )}
      </div>
      {data?.comment?.post && <Post data={data.comment.post}/>}
      <hr/>
      // TODO: reports 쿼리로 전체를 가져와야지 전체에 대해서 응답을 할 수 있다 아니면 두번 패치가 필요
      <AnswerBlockRequest data={{hk}} entity={EEntity.Comment}/>
      <hr/>
      {data?.reports?.items.map((r, no) => {
        return (
          <Link key={`${r.hk}#${r.userId}`} href="/admin/reports/[hk]" as={`/admin/reports/${r.hk}`}>
            <div className="flex flex-column pt1 ph2 pb2 ba mv1">
              <div className="lh-copy flex pointer mv0 pv0 lh-copy nowrap items-center">
                <span className="bg-black-05 pa2 mr2"><i
                  className="far fa-user-circle bg-black white pa1 br2"/> {r.userId}</span>
                <span className="w-100 ws-normal">신고내용: {r.content}</span>
                <span className="w4 ws-normal">상태: {r.status}</span>
                <span className="w4 ws-normal">상태: {r.answer}</span>
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