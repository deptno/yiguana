import React, {FunctionComponent, useContext, useMemo} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Post as TPost} from '../../../../../src/entity/post'
import * as R from 'ramda'
import {StorageContext} from '../../context/StorageContext'
import {api} from '../../pages/api/lib/api'

export const Post: FunctionComponent<Props> = props => {
  const {data, setPost} = props
  if (!data) {
    return null
  }
  const {user} = useContext(StorageContext)
  const {hk, rk, title, contentUrl, userId, createdAt, updatedAt, children, views, likes, order} = data
  const isAuthor = useMemo(() => {
    if (user) {
      if ('id' in user) {
        return user.id === userId
      }
    }
    return false
  }, [user])

  const like = () => {
    api(`/api/post/${hk}/like`, {method: 'post'})
      .then(setPost)
      .catch(alert)
  }

  return (
    <main className="b--light-gray bl bb br">
      <header className="ph3 pv2 flex b--hot-pink bt bw1 items-center">
        <h1 className="ma0 f3">
          {title}
        </h1>
        <span className="ml-auto">
          <i className="far fa-eye mh1"/> {views}
          .
          <i className="far fa-clock mh1"/> {formatDistanceToNow(parseISO(updatedAt || createdAt), {locale})} 전
          .
          </span>
      </header>
      <div className="ph3 lh-copy flex bg-light-gray hover-bg-light-pink">
          <span>
           작성자: {userId} (유저 이름 || 유저 아이디)
          </span>
      </div>
      <div className="ph3 lh-copy bg-gray white tr">
        작성자 메뉴 공간, 수정, 삭제 등 {isAuthor ? '작성자' : '권한없음'}
      </div>
      <pre className="pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre className="pa3 pre-wrap overflow-x-scroll f6">
        {data.content}
      </pre>
      <div className="justify-center mv3 lh-copy flex">
        <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue" onClick={like}>
          <i className="far fa-thumbs-up"/>
          <span className="ml2"> {likes}</span>
        </a>
        <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap w-auto pointer hover-bg-blue">
          <i className="far fa-bookmark"/>
          <span className="dn di-ns ml2">북마크</span>
        </a>
      </div>
    </main>
  )
}

type Props = {
  data: TPost
  setPost(post: TPost): void
}
