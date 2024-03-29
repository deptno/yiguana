import React, {useEffect} from 'react'
import {NextPage} from 'next'
import {useLazyQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {BoardItem} from '../../../../components/board/BoardItem'
import {Post} from '../../../../components/post/Post'
import {AnswerBlockRequest} from '../../../../components/AnswerBlockRequest'
import {EEntity} from '../../../../../../../../lib/type'
import queryReportsOfPost from '../../../../../../../../graphql/query/reportsOfPost.graphql'

const ReportsPostPage: NextPage<Props> = props => {
  const {query: {hk}} = useRouter()
  const [fetch, {data, error}] = useLazyQuery(gql`${queryReportsOfPost}`)

  useEffect(() => {
    if (hk) {
      fetch({
        variables: {
          hk,
          rk: 'post',
        },
      })
    }
  }, [hk])

  return (
    <div className="pa3 flex-column">
      <div className="flex-auto mv2 pa2 bg-gold">
        {data?.post && <BoardItem item={data?.post} no={0}/>}
      </div>
      {data?.post && <Post data={data.post}/>}
      <hr/>
      // TODO: reports 쿼리로 전체를 가져와야지 전체에 대해서 응답을 할 수 있다 아니면 두번 패치가 필요
      <AnswerBlockRequest data={{hk}} entity={EEntity.Post}/>
      <hr/>
      신고 내용들
      {data?.reports?.items.map((r, no) => {
        return (
          <Link key={`${r.hk}#${r.userId}`} href="/admin/reports/[hk]" as={`/admin/reports/${r.hk}`}>
            <div className="flex flex-column pt1 ph2 pb2 ba mv1">
              <div className="lh-copy flex pointer mv0 pv0 lh-copy nowrap items-center">
                <span className="bg-black-05 pa2 mr2"><i className="far fa-user-circle bg-black white pa1 br2"/> {r.userId}</span>
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
export default ReportsPostPage

type Props = {}