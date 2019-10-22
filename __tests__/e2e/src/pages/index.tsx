import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import * as R from 'ramda'
import {Post} from '../../../../src/entity/post'
import Head from 'next/head'

const IndexPage: NextPage<Props> = props => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch('api/posts')
      .then(res => res.json())
      .then(R.compose(setPosts, R.prop('items')))

  }, [])

  return (
    <div className="bg-black-10">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css"
        />
      </Head>
      <div className="pa3">
      <ul className="list pl0">
        {posts.map(p => (
          <li className="mv2 w-100 pa2 bg-white" key={p.hk}>
            <div>hk: {p.hk}</div>
            <div>rk: {p.rk}</div>
            <div>title: {p.title}</div>
            <div>order: {p.order}</div>
            <div>userId: {p.userId}</div>
            <div>createdAt: {p.createdAt}</div>
            <div>updatedAt: {p.updatedAt}</div>
            <div>deleted: {p.deleted}</div>
            <div>category: {p.category}</div>
            <div>contentUrl: {p.contentUrl}</div>
            <div>cover: {p.cover}</div>
            <div>views: {p.views}</div>
            <div>likes: {p.likes}</div>
            <div>children(comments): {p.children}</div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}
export default IndexPage

type Props = {}