import React, {FunctionComponent, useContext, useEffect, useMemo, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Post as TPost} from '../../../../../src/entity/post'
import * as R from 'ramda'
import {StorageContext} from '../../context/StorageContext'
import {api} from '../../pages/api/lib/api'
import {BlockRequest} from '../BlockRequest'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const Post: FunctionComponent<Props> = props => {
  const {data, setPost} = props
  if (!data) {
    return null
  }
  const {user} = useContext(StorageContext)
  const {hk, rk, title, contentUrl, userId, createdAt, updatedAt, children, views, likes, order} = data
  const editable = useMemo(() => {
    if (user) {
      if ('id' in user) {
        return user.id === userId
      }
      return true
    }
    return true
  }, [user])
  const [showBr, setShowBr] = useState(false)

  const [likeMutation, {data: liked}] = useMutation(gql`
    mutation ($hk: String!) {
      likePost(hk: $hk) {
        category
        children
        content
        createdAt
        dCategory
        deleted
        hk
        likes
        rk
        title
        views
        userId
      }
    }
  `)
  const like = () => {
    likeMutation({variables: {hk}}).catch(console.error)
  }
  useEffect(() => {
    if (liked) {
      setPost(liked.likePost)
    }
  }, [liked])
  const report = () => {
    api(`/api/post/${hk}/report`, {method: 'post'})
      .then(R.tap(console.log))
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
           작성자: {user.name}({userId ?? '비회원'})
          </span>
      </div>
      {editable && (
        <div className="ph3 lh-copy bg-gray white tr flex flex-column">
          <span>수정하기(미구현)</span>
          <span>삭제하기(미구현)</span>
        </div>
      )}
      <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre className="pa3 pre-wrap overflow-x-scroll f6" dangerouslySetInnerHTML={{__html: data.content}}/>
      <div className="justify-center mv3 lh-copy flex">
        <a
          className="pa2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue"
          onClick={() => setShowBr(!showBr)}
        >
          <span className="ml2">신고</span>
        </a>
        <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue" onClick={like}>
          <span className="ml2">공감 {likes}</span>
        </a>
        <a className="pa2 link near-black dib white bg-hot-pink mh2 nowrap w-auto pointer hover-bg-blue">
          <span className="dn di-ns ml2">스크랩 (미구현)</span>
        </a>
      </div>
      {showBr && <BlockRequest data={R.pick(['hk', 'rk'], data)}/>}
    </main>
  )
}

type Props = {
  data: TPost
  setPost(post: TPost): void
}
