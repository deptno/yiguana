import React, {useCallback, useEffect, useState} from 'react'
import {NextPage} from 'next'
import locale from 'date-fns/locale/ko'
import {extname} from 'path'
import Link from 'next/link'
import {formatDistanceToNow} from 'date-fns'
import {Post} from '../../../../../src/entity/post'
import {Comments} from '../../components/post/Comments'
import {useRouter} from 'next/router'
import * as R from 'ramda'
import {CommentWriter} from '../../components/board/CommentWriter'
import {LineLink} from '../../components/board/LineLink'

const PostPage: NextPage<Props> = props => {
  const {query} = useRouter()
  const postId = query.hk as string
  const [post, setPost] = useState<Post>()
  const getPost = useCallback(() => {
    if (postId) {
      fetch(`/api/post/${postId}`)
        .then(response => response.json())
        .then(R.tap(console.log))
        .then(setPost)
    }
  }, [postId])

  useEffect(getPost, [postId])

  return (
    <div className="pa3 flex-column">
      <main className="b--light-gray bl bb br">
        <header className="ph3 pv2 flex b--hot-pink bt bw1 items-center">
          <h1 className="ma0 f3">
            타이틀
          </h1>
          <span className="ml-auto">
            <i className="fas fa-glasses mh1"/> view
            <i className="far fa-clock mh1"/> {formatDistanceToNow(new Date(), {locale})} 전
          </span>
        </header>
        <div className="ph3 lh-copy flex bg-light-gray hover-bg-light-pink">
          <span>
           작성자: 작성자
          </span>
        </div>
        <div className="ph3 lh-copy bg-gray white tr">
          작성자 메뉴 공간, 수정, 삭제 등
        </div>
        <pre className="pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba">
          {JSON.stringify(post || {}, null, 2)}
        </pre>
        <div className="justify-center mv3 lh-copy flex">
          <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap" href="#">
            <i className="far fa-heart"/>
            <span className="dn di-ns ml2">추천 추천</span>
          </a>
          <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap w-auto" href="#">
            <i className="far fa-bookmark"/>
            <span className="dn di-ns ml2">북마크</span>
          </a>
        </div>
        <LineLink href="/">목록으로</LineLink>
      </main>
      <div className="comment-writer mv3 ph2 ph3-ns pv3 bg-white flex flex-column mt3 pv3 b--hot-pink bt bw1">
        <h2 className="ma0 f4">
          <i className="far fa-comment-dots"/> 댓글 ({R.o(R.defaultTo(0), R.prop('children'), post)})
        </h2>
        <CommentWriter postId={postId} onCreate={console.log}/>
      </div>
      <Comments postId={postId}/>
    </div>
  )
}
export default PostPage

type Props = {}
