import React, {FunctionComponent, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import locale from 'date-fns/locale/ko'
import {formatDistanceToNow, parseISO} from 'date-fns'
import {Post as TPost} from '../../../../../../src/entity/post'
import * as R from 'ramda'
import {StorageContext} from '../../context/StorageContext'
import {BlockRequest} from '../BlockRequest'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'

export const Post: FunctionComponent<Props> = props => {
  const {data, setPost} = props
  const {user} = useContext(StorageContext)
  const {hk, title, userId, createdAt, updatedAt, views, likes, content} = data ?? {}
  const lastModifiedAt = updatedAt || createdAt
  const datetime = lastModifiedAt && formatDistanceToNow(parseISO(lastModifiedAt), {locale})
  const editable = useMemo(() => {
    if (user) {
      if ('id' in user) {
        return user.id === userId
      }
    }
    return false
  }, [user, userId])
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
        cover
      }
    }
  `)
  const [deletePost] = useMutation(gql`
    mutation ($postId: String!) {
      deletePost(postId: $postId) {
        hk
      }
    }
  `)
  const del = useCallback((e) => {
    if (hk) {
      deletePost({variables: {postId: hk}})
        .then(() => Router.push('/'))
        .catch(alert)
    }
  }, [hk])
  const like = () => likeMutation({variables: {hk}}).catch(alert)
  useEffect(() => {
    if (liked) {
      setPost(liked.likePost)
    }
  }, [liked])

  return (
    <main className="b--light-gray bl bb br">
      <header className="ph3 pv2 flex b--hot-pink bt bw1 items-center">
        <h1 className="ma0 f3">
          {title}
        </h1>
        <span className="ml-auto">
          <i className="far fa-eye mh1"/> {views}
          .
          <i className="far fa-clock mh1"/> {datetime} 전
          .
          </span>
      </header>
      <div className="ph3 lh-copy flex bg-light-gray hover-bg-light-pink">
          <span>
           작성자: {user?.name}({userId ?? '비회원'})
          </span>
      </div>
      {editable && (
        <div className="pa2 lh-copy bg-black-30 white tr flex justify-end items-center">
          <a className="ph2 br2 bg-white black mh2 pointer" onClick={console.log}><i className="fas fa-pen"/> 수정하기</a>
          <a className="ph2 br2 bg-white black link pointer" onClick={del}><i className="far fa-trash-alt"/> 삭제하기</a>
        </div>
      )}
      <pre className="debug pa3 pre-wrap overflow-x-scroll f7 bg-black-10 ba b--dashed">
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre className="pa3 pre-wrap overflow-x-scroll f6" dangerouslySetInnerHTML={{__html: content}}/>
      <div className="justify-center mv3 lh-copy flex">
        <a
          className="pa2 br2 link near-black dib black ba b--black-10 black-20 mh2 nowrap pointer hover-bg-blue"
          onClick={() => setShowBr(!showBr)}
        >
          신고
        </a>
        <a className="pa2 br2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue" onClick={like}>
          <span>공감 {likes}</span>
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
